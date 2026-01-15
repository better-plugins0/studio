'use client';

import { useEffect, useState } from 'react';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Trash2, Edit2, Plus } from 'lucide-react';
import type { Plugin } from '@/lib/types';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAdmin, loading, logout } = useAuth();
  const { toast } = useToast();
  
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // Fetch plugins on mount
  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/admin/login');
      return;
    }

    if (user && isAdmin) {
      fetchPlugins();
    }
  }, [user, isAdmin, loading, router]);

  const fetchPlugins = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/plugins');
      if (!response.ok) throw new Error('Failed to fetch plugins');
      const data = await response.json();
      setPlugins(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load plugins',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlugin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const pluginData = {
      name: formData.get('name'),
      description: formData.get('description'),
      longDescription: formData.get('longDescription'),
      category: formData.get('category'),
      author: user?.username || 'Unknown',
      iconUrl: formData.get('iconUrl'),
    };

    try {
      const response = await fetch('/api/plugins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pluginData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create plugin');
      }

      toast({
        title: 'Success',
        description: 'Plugin created successfully',
      });

      fetchPlugins();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create plugin',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPlugin = async (pluginId: string, formData: FormData) => {
    setIsSubmitting(true);

    const updateData = {
      name: formData.get('name'),
      description: formData.get('description'),
      longDescription: formData.get('longDescription'),
      category: formData.get('category'),
      author: formData.get('author'),
      iconUrl: formData.get('iconUrl'),
    };

    try {
      const response = await fetch(`/api/plugins/${pluginId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error('Failed to update plugin');

      toast({
        title: 'Success',
        description: 'Plugin updated successfully',
      });

      fetchPlugins();
      setEditingId(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update plugin',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePlugin = async (pluginId: string) => {
    try {
      const response = await fetch(`/api/plugins/${pluginId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete plugin');

      toast({
        title: 'Success',
        description: 'Plugin deleted successfully',
      });

      fetchPlugins();
      setDeletingId(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete plugin',
      });
    }
  };

  const handleFileUpload = async (pluginId: string, file: File) => {
    if (!file.name.endsWith('.jar')) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Only JAR files are allowed',
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'File size exceeds 100MB limit',
      });
      return;
    }

    setUploadingId(pluginId);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('pluginId', pluginId);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload file');

      const data = await response.json();

      toast({
        title: 'Success',
        description: `File uploaded: ${data.name}`,
      });

      fetchPlugins();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload file',
      });
    } finally {
      setUploadingId(null);
    }
  };

  const handleLogout = async () => {
    try {
      logout();
      router.push('/admin/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to logout',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Welcome, {user?.username}. Manage your plugins below.
          </p>
        </div>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-3xl font-bold tracking-tight">
            Manage Plugins
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Plugin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Plugin</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddPlugin} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="longDescription" className="text-right">
                    Long Description
                  </Label>
                  <Textarea
                    id="longDescription"
                    name="longDescription"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <select
                    id="category"
                    name="category"
                    required
                    className="col-span-3 rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="Gameplay">Gameplay</option>
                    <option value="Admin">Admin</option>
                    <option value="Utility">Utility</option>
                    <option value="Economy">Economy</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="iconUrl" className="text-right">
                    Icon URL
                  </Label>
                  <Input
                    id="iconUrl"
                    name="iconUrl"
                    type="url"
                    className="col-span-3"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Add Plugin
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="mt-6 flex h-64 items-center justify-center rounded-lg border">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mt-6 rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plugin Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="max-w-xs">Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plugins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      No plugins yet. Create one to get started!
                    </TableCell>
                  </TableRow>
                ) : (
                  plugins.map((plugin) => (
                    <TableRow key={plugin.id}>
                      <TableCell className="font-medium">{plugin.name}</TableCell>
                      <TableCell className="font-mono text-xs">{plugin.slug}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {plugin.description}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Dialog open={editingId === plugin.id} onOpenChange={(open) => !open && setEditingId(null)}>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingId(plugin.id)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Edit Plugin: {plugin.name}</DialogTitle>
                            </DialogHeader>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                handleEditPlugin(plugin.id, formData);
                              }}
                              className="grid gap-4 py-4"
                            >
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="edit-name"
                                  name="name"
                                  defaultValue={plugin.name}
                                  required
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-description" className="text-right">
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-description"
                                  name="description"
                                  defaultValue={plugin.description}
                                  required
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-longDescription" className="text-right">
                                  Long Description
                                </Label>
                                <Textarea
                                  id="edit-longDescription"
                                  name="longDescription"
                                  defaultValue={plugin.longDescription}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-category" className="text-right">
                                  Category
                                </Label>
                                <select
                                  id="edit-category"
                                  name="category"
                                  defaultValue={plugin.category}
                                  required
                                  className="col-span-3 rounded-md border border-input bg-background px-3 py-2"
                                >
                                  <option value="Gameplay">Gameplay</option>
                                  <option value="Admin">Admin</option>
                                  <option value="Utility">Utility</option>
                                  <option value="Economy">Economy</option>
                                </select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-author" className="text-right">
                                  Author
                                </Label>
                                <Input
                                  id="edit-author"
                                  name="author"
                                  defaultValue={plugin.author}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-iconUrl" className="text-right">
                                  Icon URL
                                </Label>
                                <Input
                                  id="edit-iconUrl"
                                  name="iconUrl"
                                  type="url"
                                  defaultValue={plugin.iconUrl}
                                  className="col-span-3"
                                />
                              </div>
                              <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Save Changes
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              JAR
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Upload JAR File: {plugin.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex flex-col gap-2">
                                <Label htmlFor="jar-file">Select JAR File</Label>
                                <input
                                  id="jar-file"
                                  type="file"
                                  accept=".jar"
                                  onChange={(e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (file) {
                                      handleFileUpload(plugin.id, file);
                                    }
                                  }}
                                  disabled={uploadingId === plugin.id}
                                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {uploadingId === plugin.id && (
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Uploading...
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog open={deletingId === plugin.id} onOpenChange={(open) => !open && setDeletingId(null)}>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setDeletingId(plugin.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Plugin</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{plugin.name}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex gap-3">
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeletePlugin(plugin.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
