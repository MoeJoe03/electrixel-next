                                                                                                                        "use client";
import React, { useEffect, useRef } from "react";

// Colors used for bubbles (module scope to avoid effect dependency warnings)
const BUBBLE_COLORS = ['#0d1b2a', '#1b263b', '#415a77', '#778da9', '#e0e1dd'];

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  opacity: number;
}

export default function FooterSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize bubbles
    const initialBubbles: Bubble[] = [];
    for (let i = 0; i < 15; i++) {
      initialBubbles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 100 + 50,
        color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }
    bubblesRef.current = initialBubbles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw bubbles
      bubblesRef.current = bubblesRef.current.map(bubble => {
        // Update position
        let newX = bubble.x + bubble.vx;
        let newY = bubble.y + bubble.vy;

        // Mouse interaction - attract bubbles to mouse
        const dx = mousePos.current.x - bubble.x;
        const dy = mousePos.current.y - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          newX += dx * force * 0.02;
          newY += dy * force * 0.02;
        }

        // Bounce off edges
        if (newX < 0 || newX > canvas.width) bubble.vx *= -1;
        if (newY < 0 || newY > canvas.height) bubble.vy *= -1;

        newX = Math.max(0, Math.min(canvas.width, newX));
        newY = Math.max(0, Math.min(canvas.height, newY));

        return { ...bubble, x: newX, y: newY };
      });

      // Draw bubbles and mesh connections
      bubblesRef.current.forEach(bubble => {
        // Draw bubble
        const gradient = ctx.createRadialGradient(
          bubble.x, bubble.y, 0,
          bubble.x, bubble.y, bubble.size
        );
        gradient.addColorStop(0, `${bubble.color}${Math.floor(bubble.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw mesh connections
        bubblesRef.current.forEach(otherBubble => {
          if (bubble.id !== otherBubble.id) {
            const dx = bubble.x - otherBubble.x;
            const dy = bubble.y - otherBubble.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
              const opacity = (200 - distance) / 200 * 0.3;
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(bubble.x, bubble.y);
              ctx.lineTo(otherBubble.x, otherBubble.y);
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []); // Remove dependencies to prevent infinite loop

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const newBubble: Bubble = {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        size: Math.random() * 80 + 40,
        color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.5 + 0.2,
      };

      bubblesRef.current = [...bubblesRef.current, newBubble];

      // Remove bubble after 5 seconds
      setTimeout(() => {
        bubblesRef.current = bubblesRef.current.filter(b => b.id !== newBubble.id);
      }, 5000);
    }
  };
  return (
    <footer 
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-[#0d1b2a] via-[#1b263b] to-[#415a77]"
    >
      {/* Interactive Bubble Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />

      {/* Footer Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#f1f1f1' }}>
            Let&apos;s Build Something Amazing
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90" style={{ color: '#f1f1f1' }}>
            Ready to take your digital presence to the next level? Get in touch and let&apos;s create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:contact@yoursite.com"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            >
              Get In Touch
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-transparent border border-white/30 rounded-full text-white hover:bg-white/10 transition-all duration-300"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <p className="text-sm opacity-70" style={{ color: '#f1f1f1' }}>
          © 2025 Your Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}