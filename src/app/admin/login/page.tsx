'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating a network delay for a more professional feel
    setTimeout(() => {
      if (username === 'epic_boat' && password === 'T20112024t@') {
        try {
          sessionStorage.setItem('admin-logged-in', 'true');
          toast({
            title: "Access Granted",
            description: "Redirecting to management console...",
          });
          router.push('/admin');
        } catch (e) {
           toast({
            variant: "destructive",
            title: "Storage Error",
            description: "Session storage is disabled in your browser.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: "The credentials provided are incorrect.",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/10 bg-card/50 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold font-headline">Secure Admin Access</CardTitle>
          <CardDescription>
            Enter your administrative credentials to manage the hub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Admin username"
                className="bg-background/50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-background/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
              {isLoading ? "Authenticating..." : (
                <>
                  <Lock className="h-4 w-4" /> Sign In
                </>
              )}
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Protected by enterprise-grade encryption.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
