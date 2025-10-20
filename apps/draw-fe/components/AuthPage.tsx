"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// The only imports needed are your shared UI components and an icon.
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/Label"

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitting:", { email, password });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  // Dynamic text content
  const title = isSignin ? "Welcome Back" : "Create Your Account";
  const description = isSignin 
    ? "Enter your credentials to access your whiteboard."
    : "Start sketching your ideas in seconds.";
  
  const buttonText = isSignin ? "Sign In" : "Create Account";
  const linkText = isSignin
    ? "Don't have an account?"
    : "Already have an account?";
  const linkActionText = isSignin ? "Sign Up" : "Sign In";
  const linkHref = isSignin ? "/signup" : "/signin";

  return (
    // Container with background effects from the landing page
    <div className="relative min-h-screen w-screen flex justify-center items-center bg-background overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-radial from-background to-transparent opacity-40" />
      <div className="absolute -top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-1/4 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* The main "glass" card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-card/80 backdrop-blur-lg border border-border rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* The original form, but now beautifully styled */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-muted-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isLoading}
              // Classes to make the input match the landing page aesthetic
              className="py-3 bg-background/50 border-border focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-muted-foreground">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              disabled={isLoading}
              // Classes to make the input match the landing page aesthetic
              className="py-3 bg-background/50 border-border focus:border-primary"
            />
          </div>
          <Button type="submit" isLoading={isLoading} className="w-full group bg-gradient-hero text-lg py-3">
            {buttonText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        {/* Link to switch between Sign In / Sign Up */}
        <div className="text-center text-sm text-muted-foreground">
          {linkText}{" "}
          <Link href={linkHref} className="font-semibold text-primary hover:underline underline-offset-4">
            {linkActionText}
          </Link>
        </div>
      </div>
    </div>
  );
}