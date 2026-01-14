import { Hero } from "@/components/hero";
import { FeaturedPlugins } from "@/components/featured-plugins";
import { AIPluginSuggester } from "@/components/ai-plugin-suggester";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24 py-16">
        <FeaturedPlugins />
        <Separator />
        <AIPluginSuggester />
      </div>
    </div>
  );
}
