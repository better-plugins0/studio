
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import { plugins as mockPlugins } from "@/lib/mock-data";
import type { Plugin } from '@/lib/types';
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Server, History, Heart, Download, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingForm } from "@/components/rating-form";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const FALLBACK_ICON = 'https://picsum.photos/seed/plugin/256/256';

export default function PluginDetailPage() {
  const params = useParams();
  const { toast } = useToast();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const [plugin, setPlugin] = useState<Plugin | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(FALLBACK_ICON);
  const [activeTab, setActiveTab] = useState("overview");
  const changelogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      let pluginsData: Plugin[];
      try {
        const storedPlugins = localStorage.getItem('plugins-data');
        pluginsData = storedPlugins ? JSON.parse(storedPlugins) : mockPlugins;
        
        if (!storedPlugins) {
          localStorage.setItem('plugins-data', JSON.stringify(mockPlugins));
        }
      } catch (e) {
        pluginsData = mockPlugins;
      }
      
      const foundPlugin = pluginsData.find((p) => p.slug === slug);
      
      if (foundPlugin) {
        setPlugin(foundPlugin);
        setImgSrc(foundPlugin.iconUrl || FALLBACK_ICON);
        document.title = `${foundPlugin.name} - BetterPlugins Hub`;
        
        const likedPlugins = JSON.parse(localStorage.getItem('user-likes') || '[]');
        setIsLiked(likedPlugins.includes(foundPlugin.id));
      }
    }
    setLoading(false);
  }, [slug]);

  const handleLike = () => {
    if (!plugin) return;

    const likedPlugins = JSON.parse(localStorage.getItem('user-likes') || '[]');
    let newLikesCount = plugin.likes || 0;
    let newLikedState = !isLiked;

    if (newLikedState) {
      likedPlugins.push(plugin.id);
      newLikesCount += 1;
      toast({
        title: "Added to favorites",
        description: `You liked ${plugin.name}!`,
      });
    } else {
      const index = likedPlugins.indexOf(plugin.id);
      if (index > -1) likedPlugins.splice(index, 1);
      newLikesCount = Math.max(0, newLikesCount - 1);
    }

    setIsLiked(newLikedState);
    const updatedPlugin = { ...plugin, likes: newLikesCount };
    setPlugin(updatedPlugin);

    const storedPlugins = JSON.parse(localStorage.getItem('plugins-data') || '[]');
    const updatedPlugins = storedPlugins.map((p: Plugin) => 
      p.id === plugin.id ? updatedPlugin : p
    );
    
    localStorage.setItem('plugins-data', JSON.stringify(updatedPlugins));
    localStorage.setItem('user-likes', JSON.stringify(likedPlugins));
    
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('pluginsUpdated'));
  };

  const scrollToDownloads = () => {
    setActiveTab("changelog");
    setTimeout(() => {
      changelogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!plugin) {
    notFound();
  }

  return (
     <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
      <header className="mb-12 flex flex-col items-start gap-8 md:flex-row">
        <div className="relative group">
          <Image
            src={imgSrc}
            alt={`${plugin.name} icon`}
            width={128}
            height={128}
            className="h-32 w-32 shrink-0 rounded-xl border-4 border-card object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc(FALLBACK_ICON)}
            data-ai-hint="plugin icon"
            priority
          />
          <div className="absolute -inset-1 rounded-xl bg-primary/20 opacity-0 blur transition duration-500 group-hover:opacity-100" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">{plugin.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground">by {plugin.author}</p>
            </div>
            <div className="flex gap-2">
              <Button size="lg" onClick={scrollToDownloads} className="mt-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                <Download className="mr-2 h-5 w-5" /> Get Latest Version
              </Button>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-foreground/80 leading-relaxed">{plugin.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {plugin.minecraftVersions.map((version) => (
              <Badge key={version} variant="secondary" className="px-3 py-1"><Server className="mr-1.5 h-3.5 w-3.5" />{version}</Badge>
            ))}
            <Badge variant="outline" className="px-3 py-1 border-primary/20 text-primary">{plugin.category}</Badge>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-border/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Ratings</TabsTrigger>
              <TabsTrigger value="changelog">Changelog & Downloads</TabsTrigger>
            </TabsList>
            <div ref={changelogRef} className="prose prose-invert mt-6 max-w-none rounded-xl border border-primary/10 bg-card/30 backdrop-blur-sm p-8 shadow-xl">
              <TabsContent value="overview" className="mt-0">
                 <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: plugin.overview }} />
                 {plugin.gallery && plugin.gallery.length > 0 && (
                   <div className="mt-12">
                     <h3 className="font-headline text-2xl font-bold mb-6 text-primary">Gallery</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       {plugin.gallery.map((img, index) => (
                         <div key={index} className="overflow-hidden rounded-xl border border-primary/10 transition-all hover:border-primary/30">
                           <Image 
                            src={img.url} 
                            alt={`Gallery image ${index + 1}`} 
                            width={800} 
                            height={450} 
                            className="aspect-video object-cover transition-transform duration-700 hover:scale-110" 
                            data-ai-hint={img.hint} 
                           />
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
              </TabsContent>
              <TabsContent value="reviews" className="mt-0">
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-6 text-primary">Community Feedback</h3>
                  <RatingForm />
                  <div className="my-10 border-b border-border/50"></div>
                  <h3 className="font-headline text-xl font-bold mb-6">Recent Reviews</h3>
                  <div className="space-y-8">
                    <div className="border-b border-border/30 pb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">S</div>
                          <h4 className="font-semibold text-lg">Steve</h4>
                        </div>
                        <span className="text-yellow-400">★★★★★</span>
                      </div>
                      <p className="mt-4 text-foreground/70 leading-relaxed italic">"This plugin is amazing! It completely changed how I play on my server. A must-have for any modern Paper server."</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="changelog" className="mt-0">
                 <div className="space-y-12">
                   {plugin.versions.map((versionData, i) => {
                     const changelogEntry = plugin.changelog.find(c => c.version === versionData.gameVersion || c.version.includes(versionData.gameVersion));
                     
                     return (
                       <div key={i} className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary border-b border-primary/5 pb-12 last:border-0 last:pb-0">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                           <div>
                             <h4 className="font-headline font-bold text-2xl text-primary flex items-center gap-2">
                               Version {versionData.gameVersion}
                               {i === 0 && <Badge className="bg-primary/20 text-primary border-none text-[10px] uppercase">Latest</Badge>}
                             </h4>
                             <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                               <span className="flex items-center gap-1.5"><Server className="h-3.5 w-3.5" /> MC {versionData.gameVersion}</span>
                               <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {plugin.lastUpdated}</span>
                             </div>
                           </div>
                           <div className="flex flex-wrap gap-2">
                             {versionData.platforms.map((platform) => (
                               <Button key={platform.name} asChild size="sm" variant="outline" className="h-9 border-primary/20 hover:bg-primary/10 hover:border-primary/50 text-xs gap-2">
                                 <Link href={platform.downloadUrl}>
                                   <Download className="h-3.5 w-3.5" />
                                   Download for {platform.name}
                                 </Link>
                               </Button>
                             ))}
                           </div>
                         </div>
                         
                         {changelogEntry && (
                           <div className="mt-4">
                             <h5 className="text-sm font-bold text-foreground/90 mb-2">What's New:</h5>
                             <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                               {changelogEntry.changes.map((change, j) => (
                                 <li key={j} className="marker:text-primary/50">{change}</li>
                               ))}
                             </ul>
                           </div>
                         )}
                       </div>
                     );
                   })}
                 </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        <aside className="space-y-8">
           <Button 
            variant="outline" 
            size="lg" 
            className={cn(
              "w-full h-14 text-lg gap-3 transition-all duration-300 shadow-lg",
              isLiked 
                ? "border-primary bg-primary/10 text-primary hover:bg-primary/20 shadow-primary/20" 
                : "border-primary/20 bg-card/50 hover:border-primary/50 hover:bg-primary/5"
            )}
            onClick={handleLike}
          >
            <Heart className={cn("h-6 w-6 transition-transform active:scale-125", isLiked && "fill-primary")} />
            {isLiked ? "Saved to Favorites" : "Favorite this Plugin"}
          </Button>

           <Card className="border-primary/10 bg-card/30 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Plugin Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground flex items-center gap-2"><Download className="h-4 w-4" /> Downloads</span>
                <span className="font-mono font-bold">{plugin.downloads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-muted-foreground flex items-center gap-2"><Heart className="h-4 w-4" /> Likes</span>
                <span className="font-mono font-bold">{plugin.likes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Category</span>
                <Badge variant="outline" className="border-primary/30 text-primary">{plugin.category}</Badge>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
