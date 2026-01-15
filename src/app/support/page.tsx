import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Support - BetterPlugins Hub",
  description: "Get help and support for our Minecraft plugins.",
};

export default function SupportPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
          Support Center
        </h1>
        <p className="text-lg text-muted-foreground">
          Need help? We're here for you.
        </p>
      </div>
      <div className="mt-12 text-center">
        <p className="mb-6">
          The best place to get real-time support is our Discord server. Join our community of developers and users for quick assistance.
        </p>
        <Button asChild size="lg">
          <Link href="https://discord.gg/F55ErnrPB9" target="_blank" rel="noopener noreferrer">
            <MessageSquare className="mr-2 h-5 w-5" />
            Join our Discord
          </Link>
        </Button>
      </div>
    </div>
  );
}
