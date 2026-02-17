'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

type PluginFiltersProps = {
  availablePlatforms: string[];
  selectedPlatforms: string[];
  onPlatformChange: (platform: string) => void;
  availableVersions: string[];
  selectedVersions: string[];
  onVersionChange: (version: string) => void;
};

export function PluginFilters({
  availablePlatforms,
  selectedPlatforms,
  onPlatformChange,
  availableVersions,
  selectedVersions,
  onVersionChange
}: PluginFiltersProps) {
    const [versionSearch, setVersionSearch] = useState('');
    const [showAllVersions, setShowAllVersions] = useState(false);

    const filteredVersions = availableVersions.filter(v => v.toLowerCase().includes(versionSearch.toLowerCase()));
    const versionsToShow = showAllVersions ? filteredVersions : filteredVersions.slice(0, 5);

    return (
        <aside className="space-y-6">
            <Card>
                <CardHeader className="p-4">
                    <CardTitle className="text-base font-semibold">Game Version</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="relative mb-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search versions..."
                        className="pl-9 h-9"
                        value={versionSearch}
                        onChange={(e) => setVersionSearch(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 mt-4">
                        {versionsToShow.map(version => (
                            <div key={version} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`version-${version}`}
                                    checked={selectedVersions.includes(version)}
                                    onCheckedChange={() => onVersionChange(version)}
                                />
                                <Label htmlFor={`version-${version}`} className="text-sm font-normal cursor-pointer">{version}</Label>
                            </div>
                        ))}
                         {!showAllVersions && availableVersions.length > 5 && (
                             <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setShowAllVersions(true)}>Show all</Button>
                         )}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="p-4">
                    <CardTitle className="text-base font-semibold">Platform</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                        {availablePlatforms.map(platform => (
                             <div key={platform} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={platform.toLowerCase()} 
                                    checked={selectedPlatforms.includes(platform)}
                                    onCheckedChange={() => onPlatformChange(platform)}
                                />
                                <Label htmlFor={platform.toLowerCase()} className="text-sm font-normal cursor-pointer">{platform}</Label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </aside>
    )
}
