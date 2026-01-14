import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - BetterPlugins Hub",
  description: "Find guides, tutorials, and API documentation for our plugins.",
};

export default function DocsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Documentation
        </h1>
        <p className="text-lg text-muted-foreground">
          Guides, tutorials, and API references are coming soon.
        </p>
      </div>
      <div className="mt-12 text-center">
        <p>This page is under construction. Check back later for detailed documentation on all our plugins!</p>
      </div>
    </div>
  );
}
