'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-in zoom-in duration-700 delay-200 fill-mode-both">
            <Logo
              width={300}
              height={300}
              className="mx-auto mb-8 h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]"
            />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-300 fill-mode-both">
            <Sparkles className="h-3 w-3" />
            Premium Minecraft Plugins
          </div>

          <h1 className="mt-2 font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            BETTER <span className="text-primary animate-pulse">PLUGINS HUB</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-balance max-w-2xl mx-auto">
            Discover, download, and enhance your Minecraft server with the best high-quality plugins for Paper, Spigot, and Bukkit. 
            <span className="block mt-2 font-semibold text-primary/80">A PREMIUM PLUGINS WEBSITE</span> built for performance, stability, and modern gameplay.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95">
              <Link href="/plugins">
                Explore Directory
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all hover:scale-105 active:scale-95">
              <Link href="https://discord.gg/F55ErnrPB9" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" />
                Join Community
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}