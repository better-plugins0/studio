"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/icons/logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/plugins", label: "Plugins" },
  { href: "/docs", label: "Docs" },
  { href: "/support", label: "Support" },
  { href: "https://discord.gg/F55ErnrPB9", label: "Discord", external: true },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderLink = (link: typeof navLinks[0], isMobile = false) => {
    const isActive = !link.external && pathname === link.href;
    return (
      <Link
        key={link.href}
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        className={cn(
          "relative text-sm font-medium transition-colors hover:text-primary",
          isActive ? "text-primary" : "text-foreground/80",
          isMobile && "py-2 text-lg"
        )}
        onClick={() => isMobile && setMobileMenuOpen(false)}
      >
        {link.label}
        {isActive && !isMobile && (
          <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-primary transition-all"></span>
        )}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo width={40} height={40}/>
          <span className="font-headline text-xl font-bold">BetterPlugins</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => renderLink(link))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <Logo width={40} height={40}/>
                    <span className="font-headline text-xl font-bold">BetterPlugins</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="mt-8 flex flex-col items-center gap-6">
                  {navLinks.map((link) => renderLink(link, true))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
