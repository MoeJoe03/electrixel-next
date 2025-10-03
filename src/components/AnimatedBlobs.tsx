"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBlobs() {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const blobs = [
    {
      id: 1,
      color: "#4286f4",
      size: 256, // w-64 = 256px
      delay: 0,
      duration: 25,
    },
    {
      id: 2,
      color: "#373B44",
      size: 192, // w-48 = 192px
      delay: 8,
      duration: 30,
    },
    {
      id: 3,
      color: "#6b8cce",
      size: 224, // w-56 = 224px
      delay: 16,
      duration: 28,
    },
    {
      id: 4,
      color: "#a2b6df",
      size: 160, // w-40 = 160px
      delay: 12,
      duration: 22,
    },
  ];

  const generatePath = (id: number) => {
    const seed = id * 1000;
    return Array.from({ length: 5 }, (_, i) => ({
      x: Math.sin((seed + i) * 0.5) * (dimensions.width * 0.4) + dimensions.width * 0.5,
      y: Math.cos((seed + i) * 0.7) * (dimensions.height * 0.4) + dimensions.height * 0.5,
    }));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {blobs.map((blob) => {
        const path = generatePath(blob.id);
        return (
          <motion.div
            key={blob.id}
            className="absolute rounded-full opacity-15 blur-2xl"
            style={{
              width: blob.size,
              height: blob.size,
              background: `radial-gradient(circle, ${blob.color} 0%, ${blob.color}80 40%, transparent 70%)`,
            }}
            animate={{
              x: path.map(p => p.x - blob.size / 2),
              y: path.map(p => p.y - blob.size / 2),
              scale: [1, 1.3, 0.7, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: blob.duration,
              delay: blob.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            initial={{
              x: path[0].x - blob.size / 2,
              y: path[0].y - blob.size / 2,
            }}
          />
        );
      })}
    </div>
  );
}