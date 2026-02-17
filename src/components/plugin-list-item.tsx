import Link from "next/link";
import Image from "next/image";
import type { Plugin } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Heart, Clock } from "lucide-react";

type PluginListItemProps = {
  plugin: Plugin;
};

export function PluginListItem({ plugin }: PluginListItemProps) {
  const platforms = plugin.versions.flatMap((v) => v.platforms.map((p) => p.name));
  const uniquePlatforms = [...new Set(platforms)];
  const allTags = [plugin.category, ...uniquePlatforms].slice(0, 4); 

  return (
    <Card className="flex flex-col md:flex-row gap-4 p-4 transition-colors hover:bg-card/60 border border-border">
      <Link href={`/plugins/${plugin.slug}`} className="flex-shrink-0">
        <Image
          src={plugin.iconUrl}
          alt={`${plugin.name} icon`}
          width={80}
          height={80}
          className="h-20 w-20 rounded-lg border object-cover bg-white/10"
          data-ai-hint="plugin icon"
        />
      </Link>
      <div className="flex-1">
        <Link href={`/plugins/${plugin.slug}`} className="hover:text-primary transition-colors">
          <h2 className="font-headline text-lg font-bold">{plugin.name}</h2>
        </Link>
        <p className="text-sm text-muted-foreground">by {plugin.author}</p>
        <p className="mt-1 text-sm text-foreground/80">{plugin.description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-start gap-2 md:gap-1 text-sm text-muted-foreground whitespace-nowrap pt-2 md:pt-0">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>{(plugin.downloads / 1_000_000).toFixed(2)}M</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span>{(plugin.likes / 1000).toFixed(1)}k</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{plugin.lastUpdated}</span>
        </div>
      </div>
    </Card>
  );
}
