"use client";

import { useState } from "react";
import { Send, User, Bot, BarChart3, Table2, Code, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["oklch(0.65 0.2 250)", "oklch(0.55 0.18 165)", "oklch(0.7 0.15 45)", "oklch(0.6 0.2 300)"];

const sampleQueries = [
  "What is the placement rate by gender?",
  "Show me average salary by MBA specialization",
  "Which degree type has the highest placement rate?",
  "Compare work experience impact on placements",
];

const demoResponses: Record<string, {
  summary: string;
  sql: string;
  chartType: "bar" | "pie";
  data: Array<{ name: string; value: number; count?: number }>;
  recommendation: string;
}> = {
  "What is the placement rate by gender?": {
    summary: "The analysis shows that male candidates have a slightly higher placement rate (69.5%) compared to female candidates (65.3%). Out of 215 total candidates, 148 males and 67 females were analyzed.",
    sql: `SELECT 
  gender,
  COUNT(*) as total,
  SUM(CASE WHEN status = 'Placed' THEN 1 ELSE 0 END) as placed,
  ROUND(AVG(CASE WHEN status = 'Placed' THEN 1.0 ELSE 0.0 END) * 100, 1) as placement_rate
FROM placements
GROUP BY gender;`,
    chartType: "pie",
    data: [
      { name: "Male Placed", value: 69.5 },
      { name: "Female Placed", value: 65.3 },
    ],
    recommendation: "Consider implementing targeted placement support programs for female candidates to close the 4.2% gap. Focus areas could include interview preparation workshops and industry networking events.",
  },
  "Show me average salary by MBA specialization": {
    summary: "Marketing & Finance (Mkt&Fin) specialization leads with an average salary of 287,416, while Marketing & HR (Mkt&HR) follows at 270,833. The difference of 16,583 suggests finance-focused roles command higher compensation.",
    sql: `SELECT 
  specialisation,
  ROUND(AVG(salary), 0) as avg_salary,
  COUNT(*) as count
FROM placements
WHERE status = 'Placed'
GROUP BY specialisation
ORDER BY avg_salary DESC;`,
    chartType: "bar",
    data: [
      { name: "Mkt&Fin", value: 287416, count: 76 },
      { name: "Mkt&HR", value: 270833, count: 72 },
    ],
    recommendation: "Finance specialization correlates with 6% higher salaries. Consider expanding finance curriculum and industry partnerships to maximize graduate earning potential.",
  },
  "Which degree type has the highest placement rate?": {
    summary: "Science & Technology degrees show the highest placement rate at 72.4%, followed by Commerce & Management at 67.8%. Other degree types lag significantly at 50%.",
    sql: `SELECT 
  degree_t as degree_type,
  COUNT(*) as total,
  ROUND(AVG(CASE WHEN status = 'Placed' THEN 1.0 ELSE 0.0 END) * 100, 1) as placement_rate
FROM placements
GROUP BY degree_t
ORDER BY placement_rate DESC;`,
    chartType: "bar",
    data: [
      { name: "Sci&Tech", value: 72.4, count: 58 },
      { name: "Comm&Mgmt", value: 67.8, count: 145 },
      { name: "Others", value: 50.0, count: 12 },
    ],
    recommendation: "Technical degrees show strong market demand. Consider strengthening STEM pathways and adding technical skill modules to non-technical programs.",
  },
  "Compare work experience impact on placements": {
    summary: "Candidates with prior work experience achieve a 76.1% placement rate compared to 64.5% for those without. Work experience also correlates with 15% higher average salaries.",
    sql: `SELECT 
  workex as has_experience,
  COUNT(*) as total,
  ROUND(AVG(CASE WHEN status = 'Placed' THEN 1.0 ELSE 0.0 END) * 100, 1) as placement_rate,
  ROUND(AVG(CASE WHEN status = 'Placed' THEN salary ELSE NULL END), 0) as avg_salary
FROM placements
GROUP BY workex;`,
    chartType: "bar",
    data: [
      { name: "With Experience", value: 76.1, count: 71 },
      { name: "Without Experience", value: 64.5, count: 144 },
    ],
    recommendation: "Work experience significantly boosts placement outcomes. Expand internship programs and corporate partnerships to provide more students with practical experience before graduation.",
  },
};

interface Message {
  role: "user" | "assistant";
  content: string;
  data?: typeof demoResponses[string];
}

export function InteractiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI data analyst. I'm connected to your placement dataset with 215 student records. Ask me anything about placement rates, salaries, or student performance!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"chart" | "table" | "sql">("chart");

  const handleSend = (query: string) => {
    if (!query.trim()) return;
    
    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    setTimeout(() => {
      const response = demoResponses[query] || demoResponses["What is the placement rate by gender?"];
      const assistantMessage: Message = {
        role: "assistant",
        content: response.summary,
        data: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const latestData = messages.filter((m) => m.data).slice(-1)[0]?.data;

  return (
    <section className="py-24 px-6 relative">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">Interactive Demo</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
            See it in{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-text-gradient">
              action
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Try our interactive demo with real placement data. Ask natural language questions and see instant insights.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
            
            <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-border bg-gradient-to-r from-secondary/50 to-secondary/30 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    DataMind AI Assistant
                  </h3>
                  <p className="text-sm text-muted-foreground">Connected to: placement_dataset.csv</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs text-accent">Live</span>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.role === "user" 
                          ? "bg-gradient-to-br from-primary to-primary/60" 
                          : "bg-gradient-to-br from-accent to-accent/60"
                      } shadow-lg`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] p-3 rounded-xl ${
                        message.role === "user"
                          ? "bg-gradient-to-br from-primary to-primary/80 text-white"
                          : "bg-secondary/80 backdrop-blur-sm text-secondary-foreground border border-border/50"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.data && (
                        <div className="mt-2 pt-2 border-t border-white/20">
                          <p className="text-xs opacity-90 font-medium flex items-start gap-1.5">
                            <Zap className="w-3 h-3 mt-0.5 shrink-0" />
                            {message.data.recommendation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-lg">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-secondary/80 backdrop-blur-sm p-3 rounded-xl border border-border/50">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Quick Queries */}
              <div className="p-3 border-t border-border bg-secondary/20">
                <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQueries.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(query)}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-primary/20 hover:border-primary/30 border border-border text-secondary-foreground transition-all duration-300"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Input */}
              <div className="p-4 border-t border-border bg-card/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Ask a question about your data..."
                    className="flex-1 px-4 py-2 rounded-xl bg-input/80 backdrop-blur-sm border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                  <Button 
                    onClick={() => handleSend(input)} 
                    size="icon" 
                    className="rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visualization Panel */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 via-primary/50 to-accent/50 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
            
            <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-border overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-border bg-gradient-to-r from-secondary/50 to-secondary/30 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Generated Output</h3>
                <div className="flex gap-1 bg-secondary/80 rounded-lg p-1 border border-border/50">
                  <button
                    onClick={() => setActiveTab("chart")}
                    className={`px-3 py-1 rounded-md text-sm flex items-center gap-1.5 transition-all duration-300 ${
                      activeTab === "chart" 
                        ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Chart
                  </button>
                  <button
                    onClick={() => setActiveTab("table")}
                    className={`px-3 py-1 rounded-md text-sm flex items-center gap-1.5 transition-all duration-300 ${
                      activeTab === "table" 
                        ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Table2 className="w-3.5 h-3.5" />
                    Data
                  </button>
                  <button
                    onClick={() => setActiveTab("sql")}
                    className={`px-3 py-1 rounded-md text-sm flex items-center gap-1.5 transition-all duration-300 ${
                      activeTab === "sql" 
                        ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-md" 
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    SQL
                  </button>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-auto">
                {latestData ? (
                  <>
                    {activeTab === "chart" && (
                      <div className="h-full flex flex-col">
                        <ResponsiveContainer width="100%" height="80%">
                          {latestData.chartType === "pie" ? (
                            <PieChart>
                              <Pie
                                data={latestData.data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}%`}
                              >
                                {latestData.data.map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{
                                  background: "oklch(0.17 0.008 260)",
                                  border: "1px solid oklch(0.28 0.01 260)",
                                  borderRadius: "12px",
                                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                                }}
                              />
                            </PieChart>
                          ) : (
                            <BarChart data={latestData.data}>
                              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.01 260)" />
                              <XAxis dataKey="name" stroke="oklch(0.65 0 0)" fontSize={12} />
                              <YAxis stroke="oklch(0.65 0 0)" fontSize={12} />
                              <Tooltip
                                contentStyle={{
                                  background: "oklch(0.17 0.008 260)",
                                  border: "1px solid oklch(0.28 0.01 260)",
                                  borderRadius: "12px",
                                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                                }}
                              />
                              <Bar dataKey="value" fill="oklch(0.65 0.2 250)" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          )}
                        </ResponsiveContainer>
                        <div className="mt-4 p-4 bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl border border-border/50">
                          <h4 className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Key Insight
                          </h4>
                          <p className="text-sm text-muted-foreground">{latestData.summary}</p>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === "table" && (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Value</th>
                              {latestData.data[0]?.count !== undefined && (
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Count</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {latestData.data.map((row, index) => (
                              <tr key={index} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                                <td className="py-3 px-4 text-sm text-foreground">{row.name}</td>
                                <td className="py-3 px-4 text-sm text-foreground font-mono">
                                  {row.value.toLocaleString()}{latestData.chartType === "pie" || row.value < 100 ? "%" : ""}
                                </td>
                                {row.count !== undefined && (
                                  <td className="py-3 px-4 text-sm text-muted-foreground">{row.count}</td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    
                    {activeTab === "sql" && (
                      <div className="h-full">
                        <div className="bg-secondary/50 rounded-xl p-4 overflow-x-auto border border-border/50">
                          <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                            {latestData.sql}
                          </pre>
                        </div>
                        <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-xl">
                          <p className="text-sm text-accent flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Query generated automatically from natural language input
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
                        <div className="relative w-20 h-20 bg-secondary/50 rounded-2xl flex items-center justify-center border border-border">
                          <BarChart3 className="w-8 h-8 text-muted-foreground" />
                        </div>
                      </div>
                      <p>Ask a question to see visualizations</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
