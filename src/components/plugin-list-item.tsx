'use client';

import Link from "next/link";
import Image from "next/image";
import type { Plugin } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Heart, Tag, Clock, ChevronRight } from "lucide-react";
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
    <Card className="flex flex-col md:flex-row gap-5 p-5 border border-primary/10 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:bg-card/60 group relative overflow-hidden">
      <Link href={`/plugins/${plugin.slug}`} className="flex-shrink-0">
        <div className="relative">
          <Image
            src={plugin.iconUrl || 'https://picsum.photos/seed/placeholder/80/80'}
            alt={`${plugin.name} icon`}
            width={80}
            height={80}
            className="h-24 w-24 rounded-xl border border-primary/5 object-cover bg-white/5 transition-transform duration-500 group-hover:scale-105"
            data-ai-hint="plugin icon"
          />
          <div className="absolute -inset-1 rounded-xl bg-primary/20 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </Link>
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <Link href={`/plugins/${plugin.slug}`} className="hover:text-primary transition-colors inline-flex items-center gap-2 group/title">
              <h2 className="font-headline text-2xl font-bold tracking-tight">{plugin.name}</h2>
              <ChevronRight className="h-5 w-5 text-primary opacity-0 -translate-x-2 transition-all group-hover/title:opacity-100 group-hover/title:translate-x-0" />
            </Link>
            <p className="text-sm text-muted-foreground">by <span className="text-primary/70 font-semibold">{plugin.author}</span></p>
          </div>
          
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-primary shadow-sm group-hover:bg-primary/20 transition-all">
            <Heart className="h-4 w-4 fill-primary/30 group-hover:fill-primary transition-colors" />
            <span className="text-sm font-black font-mono">{formattedLikes}</span>
          </div>
        </div>
        
        <p className="mt-3 text-base text-foreground/80 leading-relaxed line-clamp-2 max-w-2xl">
          {plugin.description}
        </p>
        
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-6 text-sm border-t border-primary/5">
          <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-primary/90 transition-colors">
            <Download className="h-4 w-4" />
            <span className="font-mono font-bold text-foreground/90">{formattedDownloads}</span>
          </div>
          <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-primary/90 transition-colors">
            <Tag className="h-4 w-4" />
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-primary/30 text-primary/80 group-hover:border-primary/60">{plugin.category}</Badge>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground/50 ml-auto italic">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs">{plugin.lastUpdated}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}