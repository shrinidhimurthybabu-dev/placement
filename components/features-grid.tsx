"use client";

import { 
  MessageSquare, 
  Database, 
  BarChart3, 
  Lightbulb, 
  Zap, 
  Shield,
  BrainCircuit,
  FileText
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Interface",
    description: "Ask questions in plain English. No SQL knowledge required. Our AI understands context and intent.",
    gradient: "from-primary/20 to-primary/5",
    iconGradient: "from-primary to-primary/60",
  },
  {
    icon: Database,
    title: "Intelligent SQL Generation",
    description: "Automatically translates your questions into optimized SQL queries, handling complex joins and aggregations.",
    gradient: "from-accent/20 to-accent/5",
    iconGradient: "from-accent to-accent/60",
  },
  {
    icon: BarChart3,
    title: "Dynamic Visualizations",
    description: "Get the right chart automatically—bar, line, pie, or scatter—based on your data and question type.",
    gradient: "from-chart-3/20 to-chart-3/5",
    iconGradient: "from-chart-3 to-chart-3/60",
  },
  {
    icon: Lightbulb,
    title: "Actionable Recommendations",
    description: "Receive data-driven suggestions and insights that help you make better business decisions.",
    gradient: "from-chart-5/20 to-chart-5/5",
    iconGradient: "from-chart-5 to-chart-5/60",
  },
  {
    icon: Zap,
    title: "Real-Time Responses",
    description: "Sub-second query execution with streaming responses. Get answers as fast as you can ask.",
    gradient: "from-primary/20 to-primary/5",
    iconGradient: "from-primary to-primary/60",
  },
  {
    icon: BrainCircuit,
    title: "Context-Aware Memory",
    description: "The AI remembers your conversation history, allowing follow-up questions and deeper exploration.",
    gradient: "from-chart-4/20 to-chart-4/5",
    iconGradient: "from-chart-4 to-chart-4/60",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Role-based access control, data encryption, and audit logs keep your data safe and compliant.",
    gradient: "from-accent/20 to-accent/5",
    iconGradient: "from-accent to-accent/60",
  },
  {
    icon: FileText,
    title: "Executive Summaries",
    description: "Automatically generate concise reports with key metrics, trends, and business implications.",
    gradient: "from-chart-3/20 to-chart-3/5",
    iconGradient: "from-chart-3 to-chart-3/60",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 px-6 relative">
      {/* Section background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">Powerful Features</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text-gradient">
              unlock your data
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features that transform how your team interacts with business data
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.iconGradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
