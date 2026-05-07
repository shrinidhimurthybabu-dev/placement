"use client";

import { useEffect, useState } from "react";

interface DataPoint {
  id: number;
  x: number;
  delay: number;
  duration: number;
  char: string;
}

export function DataStream() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  useEffect(() => {
    const chars = "01SELECT*FROMWHEREGROUPBYORDERINSERTINTODATA";
    const columns = 20;

    const points: DataPoint[] = Array.from({ length: columns * 3 }, (_, i) => ({
      id: i,
      x: (i % columns) * 5 + Math.random() * 2,
      delay: Math.random() * -15,
      duration: Math.random() * 10 + 15,
      char: chars[Math.floor(Math.random() * chars.length)],
    }));

    setDataPoints(points);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.03]">
      {dataPoints.map((point) => (
        <div
          key={point.id}
          className="absolute text-primary font-mono text-sm"
          style={{
            left: `${point.x}%`,
            animation: `data-fall ${point.duration}s linear infinite`,
            animationDelay: `${point.delay}s`,
          }}
        >
          {point.char}
        </div>
      ))}
    </div>
  );
}
