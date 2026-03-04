'use client';

import { useState, useEffect } from 'react';
import { plugins as mockPlugins } from "@/lib/mock-data";
import type { Plugin } from "@/lib/types";
import { PluginCard } from "@/components/plugin-card";

export function PluginCarousel() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);

  const loadPlugins = () => {
    const stored = localStorage.getItem('plugins-data');
    if (stored) {
      setPlugins(JSON.parse(stored));
    } else {
      setPlugins(mockPlugins);
    }
  };

  useEffect(() => {
    loadPlugins();

    const handleUpdate = () => loadPlugins();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('pluginsUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('pluginsUpdated', handleUpdate);
    };
  }, []);

  // Duplicate for seamless infinite loop
  const allPlugins = plugins.length > 0 ? [...plugins, ...plugins] : [];

  if (plugins.length === 0) return null;

  return (
    <section id="plugins">
       <div className="space-y-4 text-center mb-12 px-4">
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
        <div className="flex w-max gap-4 py-4 group-hover:[animation-play-state:paused] scrolling-animation">
          {allPlugins.map((plugin, index) => (
            <PluginCard
              key={`${plugin.id}-${index}`}
              plugin={plugin}
              className="w-80 flex-shrink-0" 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
