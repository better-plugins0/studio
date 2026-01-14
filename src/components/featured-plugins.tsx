import { plugins } from "@/lib/mock-data";
import { PluginCard } from "@/components/plugin-card";

export function FeaturedPlugins() {
  const featuredPlugins = plugins.slice(0, 4);

  return (
    <section id="plugins">
      <div className="space-y-4 text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Featured Plugins
        </h2>
        <p className="text-lg text-muted-foreground">
          Hand-picked plugins to level up your server experience.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredPlugins.map((plugin) => (
          <PluginCard key={plugin.id} plugin={plugin} />
        ))}
      </div>
    </section>
  );
}
