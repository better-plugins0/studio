import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { PluginCarousel } from "@/components/plugin-carousel";

export default function Home() {
  return (
    <div className="flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
      <Hero />
      <div className="w-full space-y-24 py-16">
        <PluginCarousel />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Features />
        </div>
      </div>
    </div>
  );
}
