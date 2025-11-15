"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase";
import Link from "next/link";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginContent />
    </Suspense>
  );
}

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(errorParam === "unauthorized" ? "You don't have permission to access this area." : null);

  useEffect(() => {
    // Check if already logged in
    const checkAuth = async () => {
      try {
        const supabase = createBrowserClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error("Auth check error:", authError);
          setIsCheckingAuth(false);
          return;
        }
        
        if (user) {
          // Check if user is admin (by email or UID)
          const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'parrotlovers04@gmail.com').toLowerCase().trim();
          const adminUid = process.env.NEXT_PUBLIC_ADMIN_UID?.trim();
          
          const userEmail = (user.email || '').toLowerCase().trim();
          const userUid = user.id?.trim();
          
          const isAdmin = userEmail === adminEmail || (adminUid && userUid === adminUid);
          
          if (isAdmin) {
            // User is authenticated as admin, redirect
            const redirectParam = searchParams.get("redirect");
            const redirectTo = redirectParam === "/admin" ? "/admin/dashboard" : (redirectParam || "/admin/dashboard");
            setIsCheckingAuth(false);
            // Use window.location for a hard redirect to ensure cookies are properly set
            window.location.href = redirectTo;
            return;
          }
        }
        
        // No user or not admin - show login form
        setIsCheckingAuth(false);
      } catch (err) {
        console.error("Auth check error:", err);
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createBrowserClient();
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password");
        setIsLoading(false);
        return;
      }

      if (!data.user) {
        setError("Login failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // Check if user is admin (by email or UID)
      const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'parrotlovers04@gmail.com').toLowerCase().trim();
      const adminUid = process.env.NEXT_PUBLIC_ADMIN_UID?.trim();
      
      const userEmail = (data.user.email || '').toLowerCase().trim();
      const userUid = data.user.id?.trim();
      
      // Debug logging
      console.log("Admin check:", {
        adminEmail,
        adminUid,
        userEmail,
        userUid,
        emailMatch: userEmail === adminEmail,
        uidMatch: adminUid && userUid === adminUid
      });
      
      const isAdmin = userEmail === adminEmail || (adminUid && userUid === adminUid);
      
      if (!isAdmin) {
        // Sign out non-admin users
        await supabase.auth.signOut();
        setError(`You don't have permission to access the admin area. Expected: ${adminEmail || adminUid}, Got: ${userEmail || userUid}`);
        setIsLoading(false);
        return;
      }

      // Get session to ensure it's properly stored
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setError("Session not created. Please try again.");
        setIsLoading(false);
        return;
      }

      // Success - redirect to admin dashboard or the redirect URL
      setIsLoading(false);
      const redirectParam = searchParams.get("redirect");
      const redirectTo = redirectParam === "/admin" ? "/admin/dashboard" : (redirectParam || "/admin/dashboard");
      
      // Wait a moment for cookies to be set, then do a hard redirect
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 200);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 px-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to website
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

