import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { ArrowRight, MessageSquare } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
       <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-secondary"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-secondary to-primary"></div>
      </div>
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Logo className="mx-auto h-40 w-40 md:h-48 md:w-48" width={200} height={200} />
          <h1 className="mt-6 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            BETTERPLUGINS <span className="text-primary">HUB</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-balance">
            Download the Best Paper Minecraft Plugins
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
              <Link href="/plugins">
                Explore Plugins
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="transition-transform duration-300 hover:scale-105">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Join Discord
                <MessageSquare className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
