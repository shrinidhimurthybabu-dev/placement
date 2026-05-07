"use client";

import { useEffect, useRef, useState } from "react";

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create flowing aurora ribbons
      for (let i = 0; i < 5; i++) {
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );

        // Iridescent colors - pink, cyan, yellow shifting
        const hue1 = (time * 50 + i * 60) % 360;
        const hue2 = (time * 50 + i * 60 + 60) % 360;
        const hue3 = (time * 50 + i * 60 + 120) % 360;

        gradient.addColorStop(0, `hsla(${hue1}, 80%, 60%, 0.15)`);
        gradient.addColorStop(0.5, `hsla(${hue2}, 90%, 70%, 0.2)`);
        gradient.addColorStop(1, `hsla(${hue3}, 80%, 60%, 0.15)`);

        ctx.beginPath();
        ctx.moveTo(0, canvas.height * (0.3 + i * 0.15));

        // Create flowing wave
        for (let x = 0; x <= canvas.width; x += 10) {
          const y =
            canvas.height * (0.3 + i * 0.15) +
            Math.sin(x * 0.003 + time + i) * 100 * (1 + mousePos.y * 0.5) +
            Math.sin(x * 0.001 + time * 0.5) * 50;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Add floating orbs with iridescent glow
      for (let i = 0; i < 8; i++) {
        const x =
          canvas.width * (0.1 + (i % 4) * 0.25) +
          Math.sin(time + i) * 50 * mousePos.x;
        const y =
          canvas.height * (0.2 + Math.floor(i / 4) * 0.5) +
          Math.cos(time * 0.7 + i) * 40;
        const radius = 80 + Math.sin(time + i) * 30;

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const hue = (time * 30 + i * 45) % 360;
        orbGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.3)`);
        orbGradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 80%, 60%, 0.1)`);
        orbGradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = orbGradient;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [mousePos]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export function FlowingMesh() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Large holographic blob */}
      <div
        className="absolute w-[800px] h-[800px] -top-40 -left-40 animate-blob opacity-60"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,0,128,0.4) 0%, rgba(0,255,255,0.3) 25%, rgba(255,255,0,0.3) 50%, rgba(128,0,255,0.4) 75%, rgba(255,0,128,0.4) 100%)",
          filter: "blur(80px)",
          animation: "blob-morph 12s ease-in-out infinite, float-orb 20s ease-in-out infinite",
        }}
      />
      
      {/* Secondary flowing shape */}
      <div
        className="absolute w-[600px] h-[600px] top-1/3 right-0 translate-x-1/2"
        style={{
          background:
            "linear-gradient(225deg, rgba(0,255,200,0.5) 0%, rgba(255,100,200,0.4) 50%, rgba(100,200,255,0.5) 100%)",
          filter: "blur(100px)",
          animation: "blob-morph 15s ease-in-out infinite reverse, float-orb 25s ease-in-out infinite reverse",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        }}
      />

      {/* Bottom accent */}
      <div
        className="absolute w-[1000px] h-[400px] -bottom-20 left-1/2 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,50,150,0.3) 0%, rgba(50,255,200,0.3) 50%, rgba(255,200,50,0.3) 100%)",
          filter: "blur(120px)",
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
      />

      {/* Scan line effect */}
      <div
        className="absolute w-full h-[2px] left-0 opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
          animation: "scan-line 6s linear infinite",
        }}
      />
    </div>
  );
}

export function GridOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none opacity-30"
      style={{
        zIndex: 2,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    />
  );
}
