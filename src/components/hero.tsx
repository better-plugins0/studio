'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { ArrowRight, MessageSquare } from "lucide-react";

export function Hero() {
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
            Discover, download, and enhance your Minecraft server with the best high-quality plugins for Paper, Spigot, and Bukkit. A premium plugins website built for performance, stability, and modern gameplay.
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
        </div>
      </div>
    </section>
  );
}
