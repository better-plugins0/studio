'use client';

import Link from "next/link";
import Image from "next/image";
import type { Plugin } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Heart, Tag, Clock } from "lucide-react";

type PluginListItemProps = {
  plugin: Plugin;
};

export function PluginListItem({ plugin }: PluginListItemProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const formattedDownloads = formatNumber(plugin.downloads || 0);
  const formattedLikes = formatNumber(plugin.likes || 0);

  return (
    <Card className="flex gap-5 p-5 border border-primary/20 transition-all duration-300 hover:scale-[1.01] hover:border-primary/80 hover:shadow-lg hover:shadow-primary/30 hover:bg-card/60 group">
      <Link href={`/plugins/${plugin.slug}`} className="flex-shrink-0">
        <div className="relative">
          <Image
            src={plugin.iconUrl || 'https://picsum.photos/seed/placeholder/80/80'}
            alt={`${plugin.name} icon`}
            width={80}
            height={80}
            className="h-20 w-20 rounded-xl border border-primary/10 object-cover bg-white/5 transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="plugin icon"
          />
          <div className="absolute -inset-1 rounded-xl bg-primary/10 opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
        </div>
      </Link>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/plugins/${plugin.slug}`} className="hover:text-primary transition-colors">
            <h2 className="font-headline text-xl font-bold tracking-tight">{plugin.name}</h2>
          </Link>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1 uppercase tracking-tighter opacity-50">
            <Clock className="h-3 w-3" /> {plugin.lastUpdated}
          </span>
        </div>
        
        <p className="mt-1 text-sm text-foreground/70 leading-relaxed line-clamp-2 max-w-3xl">
          {plugin.description}
        </p>
        
        <div className="mt-3 flex flex-wrap items-center gap-5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Download className="h-4 w-4" />
            <span className="font-mono font-bold text-foreground/90">{formattedDownloads}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span className="font-mono font-bold text-foreground/90">{formattedLikes}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Tag className="h-4 w-4" />
            <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-[10px] font-bold uppercase tracking-widest px-2.5 h-5 flex items-center">
              {plugin.category}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
