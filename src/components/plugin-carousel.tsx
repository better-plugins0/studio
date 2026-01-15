'use client';

import { plugins } from "@/lib/mock-data";
import { PluginCard } from "@/components/plugin-card";
import { cn } from "@/lib/utils";

export function PluginCarousel() {
  const allPlugins = [...plugins, ...plugins]; // Duplicate for seamless loop

  return (
    <section id="plugins">
       <div className="space-y-4 text-center mb-12">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Featured Plugins
        </h2>
        <p className="text-lg text-muted-foreground">
          Hand-picked plugins to level up your server experience.
        </p>
      </div>
      <div
        className="group relative w-full overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)" }}
      >
        <div className="flex w-max gap-4 group-hover:[animation-play-state:paused] scrolling-animation">
          {allPlugins.map((plugin, index) => (
            <PluginCard
              key={`${plugin.id}-${index}`}
              plugin={plugin}
              className="w-80 flex-shrink-0" // Fixed width for consistent sizing
            />
          ))}
        </div>
      </div>
    </section>
  );
}
