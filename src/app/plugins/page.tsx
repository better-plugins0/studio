import { plugins } from "@/lib/mock-data";
import type { Metadata } from "next";
import { PluginFilters } from "@/components/plugin-filters";
import { PluginListItem } from "@/components/plugin-list-item";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Browse Plugins - BetterPlugins Hub",
  description:
    "Explore a wide range of high-quality plugins for your Paper Minecraft server.",
};

export default function PluginsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <PluginFilters />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Sort controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search plugins..."
                className="pl-9 h-11 text-base"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="relevance">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by: Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="updated">Last Updated</SelectItem>
                  <SelectItem value="created">Date Created</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="20">
                <SelectTrigger className="w-full md:w-[100px]">
                  <SelectValue placeholder="View: 20" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Plugin List */}
          <div className="space-y-4">
            {plugins.map((plugin) => (
              <PluginListItem key={plugin.id} plugin={plugin} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-primary/20 text-primary border-primary"
            >
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <span className="text-muted-foreground">...</span>
            <Button variant="outline" size="sm">
              2599
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
