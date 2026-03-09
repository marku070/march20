import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const SHAPES = ["✦", "♥", "✧", "⋆", "°"];
const COLORS = [
  "hsl(340 60% 72%)",
  "hsl(200 50% 85%)",
  "hsl(50 70% 85%)",
  "hsl(270 40% 88%)",
  "hsl(340 60% 88%)",
];

interface Particle {
  id: number;
  shape: string;
  color: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingElements = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      shape: SHAPES[i % SHAPES.length],
      color: COLORS[i % COLORS.length],
      x: Math.random() * 100,
      size: 10 + Math.random() * 16,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}%`,
            bottom: "-20px",
            fontSize: `${p.size}px`,
            color: p.color,
          }}
          animate={{
            y: [0, -window.innerHeight - 40],
            rotate: [0, 360],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.shape}
        </motion.span>
      ))}
    </div>
  );
};

export default FloatingElements;
