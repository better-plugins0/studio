import { plugins } from "@/lib/mock-data";
import { PluginCard } from "@/components/plugin-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Plugins - BetterPlugins Hub",
  description: "Explore a wide range of high-quality plugins for your Paper Minecraft server.",
};

export default function PluginsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          All Plugins
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover the perfect plugin to enhance your server.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {plugins.map((plugin) => (
          <PluginCard key={plugin.id} plugin={plugin} />
        ))}
      </div>
    </div>
  );
}
