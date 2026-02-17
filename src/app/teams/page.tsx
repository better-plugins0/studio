import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team - BetterPlugins Hub",
  description: "Meet the team behind BetterPlugins Hub.",
};

export default function TeamsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Our Team
        </h1>
        <p className="text-lg text-muted-foreground">
          The passionate developers behind BetterPlugins Hub.
        </p>
      </div>
      <div className="mt-12 text-center">
        <p>This page is under construction. Information about our team will be available soon!</p>
      </div>
    </div>
  );
}
