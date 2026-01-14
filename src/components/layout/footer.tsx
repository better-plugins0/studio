import Link from "next/link";
import { Logo } from "@/components/icons/logo";
import { Github, Youtube, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Logo />
              <span className="font-headline text-2xl font-bold">BetterPlugins</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              The central hub for high-quality Paper Minecraft plugins to enhance your server.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="font-headline text-sm font-semibold uppercase tracking-wider">Navigation</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/plugins" className="text-sm text-muted-foreground hover:text-primary">Plugins</Link></li>
                <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-primary">Docs</Link></li>
                <li><Link href="/support" className="text-sm text-muted-foreground hover:text-primary">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-sm font-semibold uppercase tracking-wider">Community</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Discord</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">GitHub</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">YouTube</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-border/40 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BetterPlugins Hub. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary"><MessageSquare className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></a>
            <a href="#" className="text-muted-foreground hover:text-primary"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
