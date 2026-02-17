import Link from "next/link";
import Image from "next/image";
import type { Plugin } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Server } from "lucide-react";

type PluginCardProps = {
  plugin: Plugin;
  className?: string;
};

export function PluginCard({ plugin, className }: PluginCardProps) {
  return (
    <Card className={cn("flex flex-col overflow-hidden border border-primary/20 transition-all duration-300 hover:scale-105 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/30", className)}>
      <CardHeader className="flex-row items-start gap-4 p-4">
        <Image
          src={plugin.iconUrl}
          alt={`${plugin.name} icon`}
          width={64}
          height={64}
          className="h-16 w-16 rounded-lg border object-cover"
          data-ai-hint="plugin icon"
        />
        <div className="flex-1">
          <CardTitle className="font-headline text-lg leading-tight">
            <Link href={`/plugins/${plugin.slug}`} className="hover:text-primary transition-colors">
              {plugin.name}
            </Link>
          </CardTitle>
          <p className="text-sm text-muted-foreground">by {plugin.author}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <CardDescription>{plugin.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-4">
        <div className="flex w-full flex-wrap gap-2">
          {plugin.minecraftVersions.slice(0, 2).map((version) => (
            <Badge key={version} variant="secondary" className="bg-muted text-muted-foreground">
              <Server className="mr-1 h-3 w-3" />
              {version}
            </Badge>
          ))}
          <Badge variant="outline">{plugin.category}</Badge>
        </div>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/plugins/${plugin.slug}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
