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
import { Server, History, Heart, Download, Clock, ExternalLink, ShieldCheck, Star } from "lucide-react";
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

  const scrollToChangelog = () => {
    setActiveTab("changelog");
    setTimeout(() => {
      changelogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><p className="text-primary font-bold animate-pulse">Initializing Hub...</p></div>;
  if (!plugin) notFound();

  return (
     <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <header className="mb-12 flex flex-col items-start gap-8 md:flex-row bg-card/30 p-8 rounded-2xl border border-primary/10 backdrop-blur-md">
        <div className="relative group">
          <Image
            src={imgSrc}
            alt={`${plugin.name} icon`}
            width={160}
            height={160}
            className="h-40 w-40 shrink-0 rounded-2xl border-4 border-card/50 object-cover shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-primary/30"
            onError={() => setImgSrc(FALLBACK_ICON)}
            priority
          />
          <div className="absolute -inset-1 rounded-2xl bg-primary/20 opacity-0 blur-lg transition duration-500 group-hover:opacity-100" />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-primary/20 text-primary border-none text-[10px] uppercase font-bold tracking-widest"><ShieldCheck className="mr-1 h-3 w-3" /> Verified</Badge>
                <Badge variant="outline" className="border-primary/30 text-primary/80">{plugin.category}</Badge>
              </div>
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-6xl text-white">{plugin.name}</h1>
              <p className="mt-2 text-xl text-muted-foreground flex items-center gap-2">
                by <span className="text-primary font-bold">{plugin.author}</span>
              </p>
            </div>
            <Button size="lg" onClick={scrollToChangelog} className="h-16 px-10 text-xl font-bold rounded-xl shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
              <Download className="mr-3 h-6 w-6" /> Download Latest
            </Button>
          </div>
          <p className="mt-8 max-w-3xl text-lg text-foreground/80 leading-relaxed font-medium">{plugin.description}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-card/40 border border-primary/10 p-1 h-14 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Overview</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Community Reviews</TabsTrigger>
              <TabsTrigger value="changelog" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Changelog</TabsTrigger>
            </TabsList>
            
            <div ref={changelogRef} className="mt-8 rounded-2xl border border-primary/10 bg-card/30 backdrop-blur-md p-8 shadow-2xl overflow-hidden">
              <TabsContent value="overview" className="mt-0">
                 <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-lg prose-p:text-foreground/90" dangerouslySetInnerHTML={{ __html: plugin.overview }} />
                 {plugin.gallery && plugin.gallery.length > 0 && (
                   <div className="mt-16">
                     <h3 className="font-headline text-3xl font-bold mb-8 text-primary flex items-center gap-3">
                       <History className="h-7 w-7" /> Visual Showcase
                     </h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       {plugin.gallery.map((img, index) => (
                         <div key={index} className="group overflow-hidden rounded-2xl border border-primary/10 transition-all hover:border-primary/50 shadow-lg">
                           <Image 
                            src={img.url} 
                            alt={`Gallery image ${index + 1}`} 
                            width={800} 
                            height={450} 
                            className="aspect-video object-cover transition-transform duration-700 group-hover:scale-110" 
                           />
                         </div>
                       ))}
                     </div>
                   </div>
                 )}
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <div className="max-w-2xl">
                  <h3 className="font-headline text-3xl font-bold mb-8 text-primary">Your Feedback Matters</h3>
                  <RatingForm />
                  <div className="my-12 h-px bg-primary/10"></div>
                  <h3 className="font-headline text-2xl font-bold mb-8">Recent Community Reviews</h3>
                  <div className="space-y-8">
                    <div className="bg-card/20 p-6 rounded-xl border border-primary/5 relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">S</div>
                          <div>
                            <h4 className="font-bold text-lg">Steve_Master</h4>
                            <p className="text-xs text-muted-foreground">Verified User • 2 days ago</p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                        </div>
                      </div>
                      <p className="text-foreground/80 leading-relaxed italic">"Absolutely phenomenal plugin. The performance is rock solid on my Paper 1.21 server. BetterPlugins really lives up to its name!"</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="changelog" className="mt-0">
                 <div className="space-y-12">
                   {plugin.versions.map((versionData, i) => {
                     const changelogEntry = plugin.changelog.find(c => c.version === versionData.gameVersion || c.version.includes(versionData.gameVersion));
                     
                     return (
                       <div key={i} className="relative pl-10 before:absolute before:left-0 before:top-4 before:h-full before:w-px before:bg-primary/20 last:before:hidden pb-12 last:pb-0">
                         <div className="absolute left-[-4px] top-3 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                         
                         <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                           <div className="flex-1">
                             <div className="flex items-center gap-4 mb-3">
                               <h4 className="font-headline font-black text-3xl text-white">Version {versionData.gameVersion}</h4>
                               {i === 0 && <Badge className="bg-primary/20 text-primary border-none px-3 py-1 font-black text-[10px] uppercase tracking-widest">Recommended</Badge>}
                             </div>
                             
                             <div className="flex flex-wrap items-center gap-6 mb-6">
                               <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/40 border border-primary/10 text-xs font-bold text-primary">
                                 <Server className="h-4 w-4" /> Minecraft {versionData.gameVersion}
                               </div>
                               <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card/40 border border-primary/10 text-xs font-bold text-muted-foreground">
                                 <Clock className="h-4 w-4" /> Released {plugin.lastUpdated}
                               </div>
                             </div>

                             {changelogEntry && (
                               <div className="bg-card/20 p-6 rounded-xl border border-primary/5">
                                 <h5 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Update Highlights</h5>
                                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                   {changelogEntry.changes.map((change, j) => (
                                     <li key={j} className="flex items-start gap-3 text-sm text-foreground/80">
                                       <span className="h-1.5 w-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                                       {change}
                                     </li>
                                   ))}
                                 </ul>
                               </div>
                             )}
                           </div>
                           
                           <div className="flex flex-col gap-3 min-w-[200px]">
                             {versionData.platforms.map((platform) => (
                               <Button key={platform.name} asChild variant="secondary" className="h-12 w-full font-bold group bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-primary/20 transition-all">
                                 <Link href={platform.downloadUrl}>
                                   <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                                   For {platform.name}
                                 </Link>
                               </Button>
                             ))}
                           </div>
                         </div>
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
              "w-full h-16 text-xl font-black gap-4 transition-all duration-300 shadow-xl rounded-xl",
              isLiked 
                ? "border-primary bg-primary/20 text-primary hover:bg-primary/30 shadow-primary/20" 
                : "border-primary/20 bg-card/40 backdrop-blur-md hover:border-primary/60 hover:bg-primary/5"
            )}
            onClick={handleLike}
          >
            <Heart className={cn("h-7 w-7 transition-all duration-500", isLiked && "fill-primary scale-110")} />
            {isLiked ? "Saved to Favorites" : "Add to Favorites"}
          </Button>

           <Card className="border-primary/20 bg-card/40 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10 py-6">
              <CardTitle className="text-2xl font-black text-white flex items-center gap-3">
                <History className="h-6 w-6 text-primary" /> Metrics & Info
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-center group">
                <span className="text-muted-foreground flex items-center gap-3 font-bold group-hover:text-primary transition-colors"><Download className="h-5 w-5" /> Total Downloads</span>
                <span className="text-2xl font-black font-mono text-white">{plugin.downloads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-muted-foreground flex items-center gap-3 font-bold group-hover:text-primary transition-colors"><Heart className="h-5 w-5" /> Community Likes</span>
                <span className="text-2xl font-black font-mono text-white">{plugin.likes.toLocaleString()}</span>
              </div>
              <div className="h-px bg-primary/10"></div>
              <div className="flex justify-between items-center group">
                <span className="text-muted-foreground font-bold">Category</span>
                <Badge className="bg-primary/20 text-primary border-none px-4 py-1.5 font-bold uppercase tracking-widest">{plugin.category}</Badge>
              </div>
              <div className="flex justify-between items-center group">
                <span className="text-muted-foreground font-bold">Latest Update</span>
                <span className="text-sm font-bold text-foreground/80">{plugin.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center space-y-4">
             <h4 className="font-bold text-lg text-primary">Need Support?</h4>
             <p className="text-sm text-muted-foreground leading-relaxed">Join our Discord for real-time help, plugin tutorials, and to connect with other server owners.</p>
             <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10 font-bold" asChild>
               <Link href="https://discord.gg/F55ErnrPB9" target="_blank">Join Discord Server</Link>
             </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}