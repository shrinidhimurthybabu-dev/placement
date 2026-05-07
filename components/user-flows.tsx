"use client";

import { MessageSquare, Cpu, LineChart, FileCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Ask in Plain English",
    description: "Type your question naturally. No special syntax or technical knowledge needed.",
    example: '"What were our top performing products last quarter?"',
    color: "primary",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Interprets & Queries",
    description: "Our AI understands context, generates optimized SQL, and executes against your data.",
    example: "Translates to: SELECT product_name, SUM(revenue)...",
    color: "accent",
  },
  {
    icon: LineChart,
    step: "03",
    title: "Visualize Results",
    description: "Results are automatically visualized with the most appropriate chart type.",
    example: "Bar chart showing top 10 products by revenue",
    color: "chart-3",
  },
  {
    icon: FileCheck,
    step: "04",
    title: "Get Recommendations",
    description: "Receive actionable insights and suggested follow-up questions to explore further.",
    example: '"Consider increasing inventory for Product X..."',
    color: "chart-4",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/30",
    text: "text-primary",
    glow: "shadow-primary/20",
  },
  accent: {
    bg: "bg-accent/10",
    border: "border-accent/30",
    text: "text-accent",
    glow: "shadow-accent/20",
  },
  "chart-3": {
    bg: "bg-chart-3/10",
    border: "border-chart-3/30",
    text: "text-chart-3",
    glow: "shadow-chart-3/20",
  },
  "chart-4": {
    bg: "bg-chart-4/10",
    border: "border-chart-4/30",
    text: "text-chart-4",
    glow: "shadow-chart-4/20",
  },
};

export function UserFlows() {
  return (
    <section className="py-24 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            From question to{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text-gradient">
              insight
            </span>{" "}
            in seconds
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A seamless workflow that makes data analysis feel like a conversation
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line with animated gradient */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-chart-4 opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-chart-4 animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const colors = colorMap[step.color];
              return (
                <div key={index} className="relative group">
                  {/* Arrow between cards on lg screens */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-24 -translate-y-1/2 z-20">
                      <ArrowRight className="w-5 h-5 text-muted-foreground/50" />
                    </div>
                  )}
                  
                  <div className={`bg-card/60 backdrop-blur-sm rounded-2xl p-6 border ${colors.border} h-full transition-all duration-500 group-hover:border-opacity-60 group-hover:shadow-xl ${colors.glow}`}>
                    {/* Step number background */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-foreground/5 select-none">
                      {step.step}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <span className={`text-3xl font-bold ${colors.text} opacity-30`}>{step.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground relative z-10">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 relative z-10">{step.description}</p>
                    <div className={`p-3 ${colors.bg} rounded-lg border ${colors.border} relative z-10`}>
                      <p className="text-xs font-mono text-muted-foreground">{step.example}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
