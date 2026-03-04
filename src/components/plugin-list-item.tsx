'use client';

import Link from "next/link";
import Image from "next/image";
import type { Plugin } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Heart, Tag, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type PluginListItemProps = {
  plugin: Plugin;
};

export function PluginListItem({ plugin }: PluginListItemProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const formattedDownloads = formatNumber(plugin.downloads || 0);
  const formattedLikes = formatNumber(plugin.likes || 0);

  return (
    <Card className="flex gap-5 p-5 border border-primary/20 transition-all duration-300 hover:scale-[1.01] hover:border-primary/80 hover:shadow-lg hover:shadow-primary/30 hover:bg-card/60 group relative overflow-hidden">
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
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <Link href={`/plugins/${plugin.slug}`} className="hover:text-primary transition-colors">
              <h2 className="font-headline text-xl font-bold tracking-tight">{plugin.name}</h2>
            </Link>
            <p className="text-xs text-muted-foreground mt-0.5">by {plugin.author}</p>
          </div>
          
          <div className="flex items-center gap-1.5 bg-primary/5 border border-primary/20 rounded-full px-3 py-1 text-primary shadow-sm shadow-primary/10 group-hover:border-primary/40 transition-colors">
            <Heart className="h-3.5 w-3.5 fill-primary/20 group-hover:fill-primary transition-all" />
            <span className="text-xs font-bold font-mono">{formattedLikes}</span>
          </div>
        </div>
        
        <p className="mt-2 text-sm text-foreground/70 leading-relaxed line-clamp-2 max-w-2xl">
          {plugin.description}
        </p>
        
        <div className="mt-4 flex flex-wrap items-center gap-5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground/90 transition-colors">
            <Download className="h-4 w-4" />
            <span className="font-mono font-bold">{formattedDownloads}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground/90 transition-colors">
            <Tag className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wide">{plugin.category}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground/60 ml-auto">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-[10px] uppercase tracking-tighter">{plugin.lastUpdated}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
