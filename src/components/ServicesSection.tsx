/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from "react";

const services = [
  {
    title: "Website Creation",
    points: ["Websites", "Strategy", "Project management", "Optimised"],
    image: "https://picsum.photos/seed/website/1600/900",
  },
  {
    title: "Brand Identity",
    points: ["Logo Design", "Typography", "Color Systems", "Tone of Voice"],
    image: "https://picsum.photos/seed/branding/1600/900",
  },
  {
    title: "UX/UI Design",
    points: ["Wireframes", "Design Systems", "Prototypes"],
    image: "https://picsum.photos/seed/uxui/1600/900",
  },
  {
    title: "Development",
    points: ["Frontend", "Backend", "API Integrations", "DevOps"],
    image: "https://picsum.photos/seed/development/1600/900",
  },
  {
    title: "SEO & Analytics",
    points: ["SEO Audits", "Analytics", "A/B Testing"],
    image: "https://picsum.photos/seed/seo/1600/900",
  },
  {
    title: "Maintenance",
    points: ["Updates", "Security", "Backups", "Support"],
    image: "https://picsum.photos/seed/maintenance/1600/900",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = Array.from(sectionRef.current.querySelectorAll<HTMLElement>(".svc-card"));
    
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          const element = e.target as HTMLElement;
          if (e.isIntersecting) {
            // Remove the class first to reset animation, then add it back
            element.classList.remove("show");
            // Clear any inline styles to allow CSS animation to take over
            element.style.opacity = "";
            element.style.transform = "";
            // Use setTimeout to ensure class removal is processed before adding
            setTimeout(() => {
              element.classList.add("show");
            }, 10);
          }
        });
      },
      { root: null, threshold: 0.25 }
    );
    cards.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-28 md:py-36" aria-labelledby="services-heading">
      <div className="mx-auto w-full max-w-7xl pl-20 md:pl-32 pr-8 md:pr-16">
        <div className="services-container relative">
          <div className="pointer-events-none hidden md:block absolute top-0 bottom-0 left-[calc(33.333333%)] w-px bg-gradient-to-b from-transparent via-[#0d1b2a]/15 dark:via-white/15 to-transparent" />
          
          {/* Sticky Left Column */}
          <div className="services-sticky pr-8" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
            <h2 id="services-heading" className="font-bold tracking-tight mb-10" style={{ fontSize: '50px', color: '#f1f1f1' }}>Services</h2>
            <p className="leading-relaxed text-lg md:text-xl lg:text-2xl max-w-lg font-light" style={{ color: '#f1f1f1' }}>
              We offer big agency services at small agency prices. Focused on three core disciplines we use our expertise to help you uncover your business needs, create traction and accelerate growth.
            </p>
          </div>
          
          {/* Scrollable Right Column */}
          <div className="services-content mt-12 md:mt-0 pl-0 md:pl-6 lg:pl-10" style={{ transform: 'translateX(-48px)' }}>
            <div className="flex flex-col gap-[10vh] md:gap-[15vh]" style={{ paddingTop: '8vh' }}>
              {services.map((s) => (
                <article
                  key={s.title}
                  className="svc-card opacity-0 translate-y-20 scale-95 transition-[opacity,transform,box-shadow] duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform flex flex-col rounded-[48px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35),0_10px_20px_-5px_rgba(0,0,0,0.15),0_4px_8px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_35px_70px_-12px_rgba(0,0,0,0.4),0_15px_30px_-5px_rgba(0,0,0,0.2),0_8px_16px_-2px_rgba(0,0,0,0.1)] min-h-[90vh] justify-center cursor-pointer"
                  style={{ width: 'calc(100% + 77px)', marginLeft: '-29px', backgroundColor: '#212121' }}
                >
                  <div className="relative w-full h-[450px] md:h-[500px] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                      draggable={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_58%)] mix-blend-overlay" />
                  </div>
                  <div className="flex-1 relative flex flex-col px-8 md:px-12 lg:px-16 pt-24 md:pt-32 pb-8 md:pb-12 justify-center" style={{ fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
                    <div className="flex flex-col items-start max-w-none">
                      <ul className="space-y-3 md:space-y-4">
                        <li className="flex items-center mb-6 md:mb-8">
                          <span className="w-2 h-2 bg-transparent rounded-full mr-4 flex-shrink-0"></span>
                          <h3 className="text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem] font-medium tracking-tight leading-tight" style={{ color: '#f1f1f1' }}>
                            {s.title}
                          </h3>
                        </li>
                        {s.points.map((point, index) => (
                          <li key={index} className="flex items-center text-base md:text-lg lg:text-xl leading-relaxed" style={{ color: '#f1f1f1' }}>
                            <span className="w-2 h-2 rounded-full mr-4 flex-shrink-0" style={{ backgroundColor: '#f1f1f1' }}></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto flex justify-end">
                      <span aria-hidden="true" className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0d1b2a] dark:bg-white text-white dark:text-[#0d1b2a] shadow-lg shadow-[#0d1b2a]/40 hover:scale-105 transition-transform">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M8 7h9v9" />
                        </svg>
                      </span>
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-[#778da9]/10 mix-blend-overlay" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        section {
          position: relative;
          z-index: 1;
        }
        
        .svc-card.show { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
          animation: bounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-8px) scale(1.05);
          }
          75% {
            opacity: 0.9;
            transform: translateY(4px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @media (min-width: 768px) {
          .services-container {
            display: flex;
            gap: 5rem;
            align-items: flex-start;
            padding-left: 0;
          }
          
          .services-sticky {
            position: sticky;
            top: 80px;
            height: fit-content;
            flex: 0 0 45%;
            padding-left: 2rem;
          }
          
          .services-content {
            flex: 1;
          }
        }
      `}</style>
    </section>
  );
}
