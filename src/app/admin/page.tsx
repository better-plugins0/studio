'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { plugins as mockPlugins } from '@/lib/mock-data';
import type { Plugin } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Download, 
  Heart, 
  Package, 
  MoreHorizontal, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  LayoutDashboard, 
  Settings,
  LogOut,
  Search
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPlugin, setEditingPlugin] = useState<Plugin | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setIsMounted(true);
    try {
      const loggedIn = sessionStorage.getItem('admin-logged-in') === 'true';
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        router.push('/admin/login');
      } else {
        const storedPlugins = sessionStorage.getItem('plugins');
        if (storedPlugins) {
          setPlugins(JSON.parse(storedPlugins));
        } else {
          setPlugins(mockPlugins);
        }
      }
    } catch (e) {
      router.push('/admin/login');
    }
  }, [router]);

  const stats = useMemo(() => {
    const totalDownloads = plugins.reduce((acc, p) => acc + p.downloads, 0);
    const totalLikes = plugins.reduce((acc, p) => acc + p.likes, 0);
    return {
      totalPlugins: plugins.length,
      totalDownloads: (totalDownloads / 1_000_000).toFixed(1) + 'M',
      totalLikes: (totalLikes / 1000).toFixed(1) + 'k'
    };
  }, [plugins]);

  const filteredPlugins = useMemo(() => {
    return plugins.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [plugins, searchQuery]);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('admin-logged-in');
    } catch (e) {
      console.error('Failed to logout');
    }
    router.push('/admin/login');
  };

  const handleEditPluginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingPlugin) return;

    const formData = new FormData(e.currentTarget);
    const updatedPlugins = plugins.map(p => {
      if (p.id === editingPlugin.id) {
        const newPlugin = JSON.parse(JSON.stringify(p));
        newPlugin.name = formData.get('name') as string;
        newPlugin.description = formData.get('description') as string;
        newPlugin.longDescription = formData.get('longDescription') as string;
        newPlugin.iconUrl = formData.get('iconUrl') as string;
        newPlugin.category = formData.get('category') as string;

        const downloadUrl = formData.get('downloadUrl') as string;
        if (newPlugin.versions.length > 0 && newPlugin.versions[0].platforms.length > 0) {
            newPlugin.versions[0].platforms[0].downloadUrl = downloadUrl;
        }
        return newPlugin;
      }
      return p;
    });

    setPlugins(updatedPlugins);
    try {
      sessionStorage.setItem('plugins', JSON.stringify(updatedPlugins));
      toast({
        title: "Plugin Updated",
        description: `"${formData.get('name')}" has been updated successfully.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Saving",
        description: "Could not save plugin changes.",
      });
    }
    setIsEditDialogOpen(false);
    setEditingPlugin(null);
  };
  
  const openEditDialog = (plugin: Plugin) => {
    setEditingPlugin(plugin);
    setIsEditDialogOpen(true);
  };

  const handleDeletePlugin = (id: string) => {
    if (confirm('Are you sure you want to delete this plugin? This action cannot be undone.')) {
      const updatedPlugins = plugins.filter(p => p.id !== id);
      setPlugins(updatedPlugins);
      sessionStorage.setItem('plugins', JSON.stringify(updatedPlugins));
      toast({
        title: "Plugin Deleted",
        description: "The plugin has been removed from the directory.",
      });
    }
  };

  if (!isMounted || !isLoggedIn) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="flex min-h-screen bg-background/50">
      {/* Sidebar (Visual Only) */}
      <aside className="hidden w-64 border-r bg-card/50 p-6 md:block">
        <div className="flex flex-col h-full">
          <div className="mb-8 flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold">Admin Panel</span>
          </div>
          <nav className="flex-1 space-y-2">
            <Button variant="secondary" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
              <Package className="h-4 w-4" /> Plugins
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground">
              <Settings className="h-4 w-4" /> Settings
            </Button>
          </nav>
          <Button onClick={handleLogout} variant="ghost" className="justify-start gap-2 text-destructive">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-headline text-3xl font-bold tracking-tight">Management Console</h1>
              <p className="text-muted-foreground">Welcome back, administrator.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleLogout} variant="outline" className="md:hidden">Logout</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4" /> Add New Plugin
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                   <DialogHeader>
                    <DialogTitle>Register New Plugin</DialogTitle>
                    <DialogDescription>Fill out the form below to add a new plugin to the repository.</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Feature coming soon with Firestore integration!'); }} className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-name">Name</Label>
                        <Input id="new-name" placeholder="BetterEconomy" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-category">Category</Label>
                        <Input id="new-category" placeholder="Economy" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-description">Short Description</Label>
                      <Input id="new-description" placeholder="A simple economy plugin..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-long">Long Overview</Label>
                      <Textarea id="new-long" className="min-h-[100px]" placeholder="Detailed description for the overview tab..." />
                    </div>
                    <DialogFooter>
                      <Button type="submit">Create Plugin Entry</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          {/* Stats Section */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                <Download className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDownloads}</div>
                <p className="text-xs text-muted-foreground">+12.5% from last month</p>
              </CardContent>
            </Card>
            <Card className="border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Plugins</CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPlugins}</div>
                <p className="text-xs text-muted-foreground">Across 3 platforms</p>
              </CardContent>
            </Card>
            <Card className="border-primary/10 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Community Likes</CardTitle>
                <Heart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalLikes}</div>
                <p className="text-xs text-muted-foreground">98% positive feedback</p>
              </CardContent>
            </Card>
          </div>

          {/* Plugin Management Table */}
          <Card className="border-primary/10 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Plugin Repository</CardTitle>
                <CardDescription>Manage your published plugins and their metadata.</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Filter plugins..." 
                  className="pl-9 h-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-primary/10 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Identity</TableHead>
                      <TableHead>Metrics</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Manage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlugins.map((plugin) => (
                      <TableRow key={plugin.id} className="hover:bg-primary/5 transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md bg-white/5 border border-primary/20 flex items-center justify-center">
                              <img src={plugin.iconUrl} alt="" className="h-8 w-8 object-contain" />
                            </div>
                            <div>
                              <div className="font-bold">{plugin.name}</div>
                              <div className="text-xs text-muted-foreground">v{plugin.changelog[0]?.version || '1.0.0'}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-xs">
                            <div className="flex items-center gap-1.5">
                              <Download className="h-3 w-3" /> {(plugin.downloads / 1_000_000).toFixed(1)}M
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Heart className="h-3 w-3" /> {(plugin.likes / 1000).toFixed(1)}k
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal text-primary border-primary/20">{plugin.category}</Badge>
                        </TableCell>
                        <TableCell>
                           <Badge className="bg-primary/20 text-primary border-none text-[10px] uppercase tracking-wider">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => router.push(`/plugins/${plugin.slug}`)}>
                                <ExternalLink className="mr-2 h-4 w-4" /> View Public
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditDialog(plugin)}>
                                <Edit3 className="mr-2 h-4 w-4" /> Edit Metadata
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDeletePlugin(plugin.id)} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Entry
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPlugins.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                          No plugins found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />
              Editing: {editingPlugin?.name}
            </DialogTitle>
          </DialogHeader>
          {editingPlugin && (
            <form onSubmit={handleEditPluginSubmit} className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Display Name</Label>
                  <Input id="edit-name" name="name" defaultValue={editingPlugin.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Input id="edit-category" name="category" defaultValue={editingPlugin.category} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Marketplace Description</Label>
                <Input id="edit-description" name="description" defaultValue={editingPlugin.description} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-long">Overview (HTML Supported)</Label>
                <Textarea id="edit-long" name="longDescription" defaultValue={editingPlugin.longDescription} className="min-h-[150px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-icon">Icon URL</Label>
                  <Input id="edit-icon" name="iconUrl" defaultValue={editingPlugin.iconUrl} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-dl">Primary Download URL</Label>
                  <Input id="edit-dl" name="downloadUrl" defaultValue={editingPlugin.versions[0]?.platforms[0]?.downloadUrl || '#'} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Publish Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
