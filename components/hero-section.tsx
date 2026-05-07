"use client";

import { ArrowRight, Sparkles, Database, LineChart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const typewriterPhrases = [
  "What was our revenue last quarter?",
  "Show me top performing products",
  "Which students got placed?",
  "Compare sales by region",
  "Find customers at risk of churning",
];

export function HeroSection() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = typewriterPhrases[currentPhrase];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < phrase.length) {
            setDisplayText(phrase.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length);
          }
        }
      },
      isDeleting ? 30 : 80
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      
      {/* Floating icons */}
      <div className="absolute top-1/4 left-[15%] animate-float opacity-20">
        <Database className="w-12 h-12 text-primary" style={{ animationDelay: "0s" }} />
      </div>
      <div className="absolute top-1/3 right-[15%] animate-float opacity-20" style={{ animationDelay: "-2s" }}>
        <LineChart className="w-16 h-16 text-accent" />
      </div>
      <div className="absolute bottom-1/3 left-[20%] animate-float opacity-20" style={{ animationDelay: "-4s" }}>
        <MessageSquare className="w-10 h-10 text-chart-4" />
      </div>
      
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute inset-[20%] bg-accent/15 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "-1s" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-primary/20 mb-8 animate-shimmer">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground/80">AI-Powered Business Intelligence</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="text-foreground">Chat with</span>
          <br />
          <span className="text-foreground">your </span>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text-gradient">
            data.
          </span>
        </h1>

        {/* Typewriter demo */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 animate-pulse-glow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-muted-foreground text-sm mb-1">Ask anything...</p>
                <p className="text-lg text-foreground">
                  {displayText}
                  <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Transform complex data into clear insights with natural language.
          Ask questions, get answers, make decisions—no SQL or technical expertise required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 text-lg rounded-xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            Watch Demo
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Natural Language Queries</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: "-0.5s" }} />
            <span>Auto-Generated SQL</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
            <div className="w-2 h-2 rounded-full bg-chart-3 animate-pulse" style={{ animationDelay: "-1s" }} />
            <span>Smart Visualizations</span>
          </div>
        </div>
      </div>
    </section>
  );
}
