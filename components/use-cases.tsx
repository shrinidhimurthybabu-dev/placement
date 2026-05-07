"use client";

import { TrendingUp, Users, DollarSign, Package } from "lucide-react";

const useCases = [
  {
    icon: TrendingUp,
    title: "Sales & Revenue Analysis",
    queries: [
      "What were our total sales this month compared to last month?",
      "Which sales rep closed the most deals in Q4?",
      "Show me revenue trends over the past 12 months",
    ],
    color: "bg-chart-1",
  },
  {
    icon: Users,
    title: "HR & Workforce Insights",
    queries: [
      "What is our current employee turnover rate?",
      "Which departments have the most open positions?",
      "Compare hiring velocity across regions",
    ],
    color: "bg-chart-2",
  },
  {
    icon: DollarSign,
    title: "Financial Planning",
    queries: [
      "What are our top expense categories?",
      "Project next quarter revenue based on current trends",
      "Show budget vs actual spending by department",
    ],
    color: "bg-chart-3",
  },
  {
    icon: Package,
    title: "Operations & Inventory",
    queries: [
      "Which products are running low on stock?",
      "What is our average order fulfillment time?",
      "Identify supply chain bottlenecks",
    ],
    color: "bg-chart-4",
  },
];

export function UseCases() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Built for <span className="text-primary">every team</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From executives to analysts, everyone can explore data their way
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl ${useCase.color} flex items-center justify-center`}>
                  <useCase.icon className="w-6 h-6 text-background" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{useCase.title}</h3>
              </div>
              <div className="space-y-3">
                {useCase.queries.map((query, qIndex) => (
                  <div
                    key={qIndex}
                    className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg"
                  >
                    <span className="text-primary text-sm">→</span>
                    <p className="text-sm text-muted-foreground">&quot;{query}&quot;</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
