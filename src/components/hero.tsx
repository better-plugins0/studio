'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { ArrowRight, MessageSquare, Download, Hash } from "lucide-react";
import { plugins as mockPlugins } from "@/lib/mock-data";

export function Hero() {
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [totalPlugins, setTotalPlugins] = useState(0);

  const loadStats = () => {
    const stored = localStorage.getItem('plugins-data');
    const data = stored ? JSON.parse(stored) : mockPlugins;
    
    const downloads = data.reduce((acc: number, p: any) => acc + (p.downloads || 0), 0);
    setTotalDownloads(downloads);
    setTotalPlugins(data.length);
  };

  useEffect(() => {
    loadStats();
    
    const handleUpdate = () => loadStats();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('pluginsUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('pluginsUpdated', handleUpdate);
    };
  }, []);

  const formattedDownloads = (totalDownloads / 1_000_000).toFixed(1) + "M+";

  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-in zoom-in duration-700 delay-200 fill-mode-both">
            <Logo
              width={300}
              height={300}
              className="mx-auto mb-8 h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]"
            />
          </div>
          <h1 className="mt-6 font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            BETTER <span className="text-primary animate-pulse">PLUGINS HUB</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-balance">
            Download Best Minecraft Plugins
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="hover:scale-105">
              <Link href="/plugins">
                Explore Plugins
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="hover:scale-105 bg-transparent hover:bg-primary/5">
              <Link href="https://discord.gg/F55ErnrPB9" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" />
                Join our Discord
              </Link>
            </Button>
          </div>

          <div className="mt-16 inline-flex flex-wrap items-center justify-center gap-8 rounded-full border border-primary/20 bg-card/30 px-8 py-4 backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.1)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Download className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold leading-none text-foreground">{formattedDownloads}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Downloads</div>
              </div>
            </div>
            
            <div className="hidden h-8 w-px bg-primary/20 sm:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Hash className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold leading-none text-foreground">{totalPlugins}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Seeds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
