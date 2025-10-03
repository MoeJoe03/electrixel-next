"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  src: string;
};

const images = [
  'https://picsum.photos/seed/a/1080/1080',
  'https://picsum.photos/seed/b/1080/1080',
  'https://picsum.photos/seed/c/1080/1080',
  'https://picsum.photos/seed/d/1080/1080',
  'https://picsum.photos/seed/e/1080/1080',
];

export default function HeroSection() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function spawn(x: number, y: number) {
    const id = ++idRef.current;
    const src = images[Math.floor(Math.random() * images.length)];
    const p: Particle = { id, x, y, src };
    setParticles((s) => [...s, p]);

    // remove after animation
    setTimeout(() => {
      setParticles((s) => s.filter((t) => t.id !== id));
    }, 900);
  }

  // throttle spawns using rAF
  function handleMove(e: React.MouseEvent) {
    const now = performance.now();
    const throttle = 60; // ms between spawns
    if (now - lastRef.current < throttle) return;
    lastRef.current = now;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawn(x, y);
  }

  return (
    <section
      ref={(el: HTMLElement | null) => { heroRef.current = el; }}
      onMouseMove={handleMove}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-transparent"
    >
      {/* blank canvas - no initial content */}

      {/* render particles */}
      {particles.map((p) => (
          <motion.img
          key={p.id}
          src={p.src}
          alt="popup"
          initial={{ opacity: 0, scale: 0.25, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.25, 1.02, 0.6], y: [-6, -28, -54] }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            transform: 'translate(-50%, -50%)',
            width: 320,
            height: 320,
            maxWidth: '40vw',
            maxHeight: '40vw',
            objectFit: 'cover',
            pointerEvents: 'none',
            zIndex: 30,
            borderRadius: 12,
            filter: 'drop-shadow(0 12px 36px rgba(0,0,0,0.6))',
          }}
        />
      ))}

      {/* small helper: hint text that fades once mouse moves */}
      {/* centered hero headline (non-interactive so mouse events pass through) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-20 pointer-events-none px-6 w-full flex items-center justify-center"
      >
        <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="max-w-4xl text-center mx-auto">
            <h1 className="hero-title text-center">
              Building brands that
              <br />
              <span className="italic text-[#c7d2da]">resonate,</span> websites
              <br />
              that <span className="italic text-[#c7d2da]">convert.</span>
            </h1>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="text-center text-[#7b93a8] select-none">Move your mouse across the screen</div>
      </motion.div>
    </section>
  );
}
