'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { plugins } from "@/lib/mock-data";
import { Search } from "lucide-react";
import React from "react";

export function PluginFilters() {
    // Get all unique game versions from all plugins
    const allGameVersions = plugins.flatMap(p => p.versions.map(v => v.gameVersion));
    const uniqueGameVersions = [...new Set(allGameVersions)].sort((a, b) => b.localeCompare(a, undefined, { numeric: true })).slice(0, 7);

    const allPlatforms = plugins.flatMap(p => p.versions.flatMap(v => v.platforms.map(p => p.name)));
    const uniquePlatforms = [...new Set(allPlatforms)];

    return (
        <aside className="space-y-6">
            <Card>
                <CardHeader className="p-4">
                    <CardTitle className="text-base font-semibold">Game version</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="relative mb-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        className="pl-9 h-9"
                      />
                    </div>
                    <div className="space-y-2 mt-4">
                        {uniqueGameVersions.map(version => (
                            <div key={version} className="flex items-center">
                                <p className="text-sm text-foreground/80">{version}</p>
                            </div>
                        ))}
                         <div className="flex items-center space-x-2 pt-2">
                            <Checkbox id="show-all-versions" />
                            <Label htmlFor="show-all-versions" className="text-sm font-normal">Show all versions</Label>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="p-4">
                    <CardTitle className="text-base font-semibold">Loader</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                        {uniquePlatforms.map(platform => (
                             <div key={platform} className="flex items-center space-x-2">
                                <Checkbox id={platform.toLowerCase()} />
                                <Label htmlFor={platform.toLowerCase()} className="text-sm font-normal">{platform}</Label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </aside>
    )
}
