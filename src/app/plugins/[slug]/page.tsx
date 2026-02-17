import { getPluginBySlug, plugins } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Server, History } from "lucide-react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadDialog } from "@/components/download-dialog";
import { RatingForm } from "@/components/rating-form";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const plugin = getPluginBySlug(params.slug);

  if (!plugin) {
    return {
      title: "Plugin Not Found",
    };
  }

  return {
    title: `${plugin.name} - BetterPlugins Hub`,
    description: plugin.description,
  };
}

export async function generateStaticParams() {
  return plugins.map((plugin) => ({
    slug: plugin.slug,
  }));
}

export default function PluginDetailPage({ params }: { params: { slug:string } }) {
  const plugin = getPluginBySlug(params.slug);

  if (!plugin) {
    notFound();
  }

  // Get unique game versions for display
  const uniqueGameVersions = [...new Set(plugin.versions.map(v => v.gameVersion.split('.')[0] + '.' + v.gameVersion.split('.')[1]))];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 flex flex-col items-start gap-8 md:flex-row">
        <Image
          src={plugin.iconUrl}
          alt={`${plugin.name} icon`}
          width={128}
          height={128}
          className="h-32 w-32 shrink-0 rounded-xl border-4 border-card object-cover"
          data-ai-hint="plugin icon"
        />
        <div className="flex-1">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">{plugin.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">by {plugin.author}</p>
          <p className="mt-4 max-w-2xl text-foreground/80">{plugin.longDescription}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {plugin.minecraftVersions.map((version) => (
              <Badge key={version} variant="secondary"><Server className="mr-1 h-3 w-3" />{version}</Badge>
            ))}
            <Badge variant="outline">{plugin.category}</Badge>
          </div>
          <DownloadDialog plugin={plugin} />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Ratings</TabsTrigger>
              <TabsTrigger value="changelog">Changelog</TabsTrigger>
            </TabsList>
            <div className="prose prose-invert mt-6 max-w-none rounded-lg border bg-card p-6">
              <TabsContent value="overview">
                 <div dangerouslySetInnerHTML={{ __html: plugin.overview }} />
                 {plugin.gallery.length > 0 && (
                   <div className="mt-8">
                     <h3 className="font-headline text-xl font-bold mb-4">Gallery</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {plugin.gallery.map((img, index) => (
                         <Image key={index} src={img.url} alt={`Gallery image ${index + 1}`} width={800} height={450} className="rounded-lg object-cover" data-ai-hint={img.hint} />
                       ))}
                     </div>
                   </div>
                 )}
              </TabsContent>
              <TabsContent value="reviews">
                <div>
                  <h3 className="font-headline text-xl font-bold mb-4">Leave a Review</h3>
                  <RatingForm />
                  <div className="my-8 border-b border-border/50"></div>
                  <h3 className="font-headline text-xl font-bold mb-4">Player Reviews</h3>
                  <div className="space-y-6">
                    {/* Placeholder for reviews */}
                    <div className="border-b border-border/50 pb-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Steve</h4>
                        <span className="text-xs text-muted-foreground">★★★★★</span>
                      </div>
                      <p className="mt-2 text-sm text-foreground/80">This plugin is amazing! It completely changed how I play on my server. A must-have!</p>
                    </div>
                     <div className="border-b border-border/50 pb-4">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Alex</h4>
                        <span className="text-xs text-muted-foreground">★★★★☆</span>
                      </div>
                      <p className="mt-2 text-sm text-foreground/80">Great plugin, works as described. Had a small issue but the developer was very responsive on Discord.</p>
                    </div>
                     <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Creeper</h4>
                        <span className="text-xs text-muted-foreground">★★★★★</span>
                      </div>
                      <p className="mt-2 text-sm text-foreground/80">Sssssss-uperb!</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="changelog">
                 <div className="space-y-6">
                   {plugin.changelog.map((entry, i) => (
                     <div key={i}>
                       <h4 className="font-headline font-bold text-lg">Version {entry.version}</h4>
                       <ul className="mt-2 list-disc list-inside space-y-1">
                         {entry.changes.map((change, j) => <li key={j}>{change}</li>)}
                       </ul>
                     </div>
                   ))}
                 </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        <aside className="space-y-6">
           <Card>
            <CardHeader>
              <CardTitle>Plugin Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Downloads</span>
                <span>{plugin.downloads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{plugin.category}</span>
              </div>
               <div className="flex justify-between">
                <span className="text-muted-foreground">Author</span>
                <span>{plugin.author}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Versions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {plugin.versions.map((version) => (
                <div key={version.gameVersion} className="flex justify-between items-center text-sm">
                  <span className="font-medium text-foreground">{version.gameVersion}</span>
                  <div className="flex gap-1.5">
                    {version.platforms.map(platform => (
                      <Badge key={platform.name} variant="outline" className="text-xs">{platform.name}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
