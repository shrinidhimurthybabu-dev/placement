"use client";

import { Database, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/50 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Database className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold text-foreground">DataMind</span>
            <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary">
              <Sparkles className="w-3 h-3" />
              AI
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {["Features", "Demo", "Use Cases", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 bg-secondary/50 rounded-lg scale-0 group-hover:scale-100 transition-transform origin-center" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hover:bg-secondary/50">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
