
"use client";
import React, { useEffect, useRef } from "react";

export default function ScrollingTextSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);
  const yellowLineRef = useRef<HTMLDivElement>(null);
  const purpleLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textElement = textRef.current;
    const columnsElement = columnsRef.current;
    const yellowLine = yellowLineRef.current;
    const purpleLine = purpleLineRef.current;
    
    if (!section || !textElement || !columnsElement || !yellowLine || !purpleLine) return;

    const lines = textElement.querySelectorAll('div');
    const allChars: HTMLSpanElement[] = [];
    
    lines.forEach((line, lineIndex) => {
      const text = line.textContent || "";
      const chars = text.split("").map((char, charIndex) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.transition = "all 0.3s ease";
        span.style.color = "#999999";
        span.dataset.index = (lineIndex * 100 + charIndex).toString();
        return span;
      });
      
      line.innerHTML = "";
      chars.forEach(char => {
        line.appendChild(char);
        allChars.push(char);
      });
    });

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      let scrollProgress = 0;
      
      if (sectionTop <= 0 && sectionTop > -sectionHeight) {
        scrollProgress = Math.abs(sectionTop) / sectionHeight;
      } else if (sectionTop > 0) {
        scrollProgress = 0;
      } else {
        scrollProgress = 1;
      }
      
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      
      allChars.forEach((char, index) => {
        const charProgress = (scrollProgress * allChars.length * 3 - index) / 5;
        
        char.style.textShadow = "none";
        char.style.transform = "scale(1)";
        
        if (charProgress <= 0) {
          char.style.color = "#999999";
        } else if (charProgress < 0.5) {
          char.style.color = "#cccccc";
        } else {
          char.style.color = "#ffffff";
        }
      });

      // Animate vertical lines when columns come into view
      const columnsRect = columnsElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const columnsProgress = Math.max(0, Math.min(1, (windowHeight - columnsRect.top) / windowHeight));
      
      if (columnsProgress > 0.01) {
        const lineProgress = Math.max(0, Math.min(1, (columnsProgress - 0.01) / 0.5));
        
        // Animate lines growing upward
        yellowLine.style.height = `${lineProgress * 100}%`;
        yellowLine.style.top = `${(1 - lineProgress) * 100}%`;
        yellowLine.style.opacity = `${lineProgress}`;
        
        purpleLine.style.height = `${lineProgress * 100}%`;
        purpleLine.style.top = `${(1 - lineProgress) * 100}%`;
        purpleLine.style.opacity = `${lineProgress}`;
      } else {
        yellowLine.style.height = '0%';
        yellowLine.style.top = '100%';
        yellowLine.style.opacity = '0';
        
        purpleLine.style.height = '0%';
        purpleLine.style.top = '100%';
        purpleLine.style.opacity = '0';
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black flex items-center justify-center py-20 overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-25"></div>
          <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
        </div>
        
      <div className="relative w-full max-w-5xl px-8" style={{ marginTop: '216px' }}>
        <div className="text-center">
          <div 
            ref={textRef}
            className="font-light text-center tracking-wide leading-tight"
            style={{ 
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif',
              fontSize: '38px'
            }}
          >
            <div className="mb-2">We know that developing a new project is</div>
            <div className="mb-2">a complex undertaking. Every day, we work</div>
            <div className="mb-2">on developments that are truly defined by</div>
            <div className="mb-2">quality and detail, with a focus on</div>
            <div className="mb-2">commitment to Client satisfaction and</div>
            <div>concept realization.</div>
          </div>
          
          <div className="justify-center select-none flex" style={{ marginTop: '96px', marginBottom: '64px' }}>
            <button 
              className="shadow-xl no-underline rounded-full text-white font-semibold border-none focus:outline-none transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #4a90e2 0%, #4a90e2 100%)',
                paddingTop: '24px',
                paddingBottom: '24px',
                paddingLeft: '48px',
                paddingRight: '48px',
                fontSize: '18px',
                fontWeight: '600',
                letterSpacing: '0.5px'
              }}
            >
              Book Now
            </button>
          </div>
          
          <div ref={columnsRef} className="w-screen flex justify-center mt-40 relative" style={{ marginBottom: '360px' }}>
            <div 
              ref={yellowLineRef}
              className="absolute w-px bg-gradient-to-b from-transparent via-[#4a90e2] to-transparent transition-all duration-500 ease-out" 
              style={{ left: 'calc(50% - 280px)', top: '100%', height: '0%', opacity: 0 }}
            ></div>
            <div 
              ref={purpleLineRef}
              className="absolute w-px bg-gradient-to-b from-transparent via-[#4a90e2] to-transparent transition-all duration-500 ease-out" 
              style={{ left: 'calc(50% + 280px)', top: '100%', height: '0%', opacity: 0 }}
            ></div>
            <div className="flex" style={{ width: '1600px', justifyContent: 'space-between', paddingLeft: '80px', paddingRight: '80px' }}>
              
              <div style={{ width: '480px' }}>
                <h3 className="font-extrabold mb-6 text-left" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif', color: '#fff', fontSize: '30px', lineHeight: '36px' }}>
                  Helping you understand your<br />business
                </h3>
                <div className="leading-relaxed text-left" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif', fontSize: '20px', color: '#ffffff', fontWeight: 400 }}>
                  No matter the industry or sector our first task<br />
                  is always to understand your offering better<br />
                  than you. By uncovering what makes your<br />
                  business exceptional, we craft a strategy that<br />
                  highlights your strengths and connects you<br />
                  with your audience and beyond.
                </div>
              </div>

              <div className="relative" style={{ width: '480px' }}>
                <h3 className="font-extrabold mb-6 text-left" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif', color: '#fff', fontSize: '30px', lineHeight: '36px' }}>
                  Don't worry,<br />we've got this
                </h3>
                <div className="leading-relaxed text-left" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif', fontSize: '20px', color: '#ffffff', fontWeight: 400 }}>
                  We take full ownership of your projects, so you<br />
                  can focus on what matters most. With our<br />
                  expertise delivering real results, you gain a<br />
                  competitive edge without the added hassle.
                </div>
              </div>

              <div style={{ width: '480px' }}>
                <h3 className="font-extrabold mb-6 text-left" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif', color: '#fff', fontSize: '30px', lineHeight: '36px' }}>
                  Stay ahead,<br />don't follow
                </h3>
                <div className="leading-relaxed text-left" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif', fontSize: '20px', color: '#ffffff', fontWeight: 400 }}>
                  Forget chasing competitors, you'll be too busy<br />
                  outpacing them. True market leaders thrive by<br />
                  embracing change, and we'll position you at the<br />
                  forefront with smart strategies that never<br />
                  compromise on quality.
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
