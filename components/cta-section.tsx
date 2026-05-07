"use client";

import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 border border-primary/30">
          {/* Animated background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-accent/20" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          {/* Animated orbs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/30 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent/25 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "-1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          
          {/* Floating particles */}
          <div className="absolute top-8 left-16 w-2 h-2 bg-primary rounded-full animate-float" />
          <div className="absolute top-20 right-20 w-3 h-3 bg-accent rounded-full animate-float" style={{ animationDelay: "-2s" }} />
          <div className="absolute bottom-16 left-1/4 w-2 h-2 bg-chart-3 rounded-full animate-float" style={{ animationDelay: "-4s" }} />
          <div className="absolute bottom-12 right-1/4 w-1.5 h-1.5 bg-primary rounded-full animate-float" style={{ animationDelay: "-3s" }} />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6 animate-shimmer">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">Start your free trial today</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground text-balance">
              Ready to chat with your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text-gradient">
                data?
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 text-pretty">
              Join thousands of teams who&apos;ve transformed how they make decisions.
              No credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 backdrop-blur-sm transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["14-day free trial", "No credit card", "Cancel anytime"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
