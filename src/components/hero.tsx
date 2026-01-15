import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { ArrowRight, MessageSquare } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Logo
            width={300}
            height={300}
            className="mx-auto mb-8 h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64"
          />
          <h1 className="mt-6 font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            BETTER <span className="text-primary">PLUGINS HUB</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-balance">
            Download Best Minecraft Plugins
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
              <Link href="/plugins">
                Explore Plugins
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="transition-transform duration-300 hover:scale-105 bg-transparent hover:bg-primary/10">
              <Link href="/docs">
                Documentation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
