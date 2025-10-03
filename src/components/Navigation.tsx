/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

export default function Navigation() {
  const linkStyle = {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    letterSpacing: '0.025em',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    padding: '0 18px',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
    display: 'inline-block'
  };

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#4a90e2';
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#ffffff';
  };

  const blinkingDotStyle = {
    width: '8px',
    height: '8px',
    backgroundColor: '#22c55e',
    borderRadius: '50%',
    marginRight: '8px',
    animation: 'blink 2s infinite'
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
      `}</style>
      
      <nav 
        style={{
          position: 'fixed',
          zIndex: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '380px',
          height: '92px',
          top: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <a 
            href="#home" 
            style={linkStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            Home
          </a>
          <a 
            href="#services" 
            style={linkStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            Services
          </a>
          <a 
            href="#work" 
            style={linkStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            Work
          </a>
          <a 
            href="#about" 
            style={linkStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            About
          </a>
        </div>
      </nav>

      {/* Logo on the left */}
      <img
        src="/Electrixel_logo.png"
        alt="Electrixel Logo"
        style={{
          position: 'fixed',
          zIndex: 50,
          left: '4px',
          top: '-4px',
          height: '200px',
          width: 'auto',
          filter: 'brightness(0) invert(1)',
          cursor: 'pointer'
        }}
        onError={(e) => {
          // Fallback to text if image doesn't load
          e.currentTarget.style.display = 'none';
        }}
      />

      {/* Get in touch pill */}
      <div
        style={{
          position: 'fixed',
          zIndex: 50,
          right: '48px',
          top: '48px',
          backdropFilter: 'blur(16px)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        }}
      >
        <div style={blinkingDotStyle}></div>
        <span
          style={{
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '500',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
            letterSpacing: '0.025em'
          }}
        >
          Get in touch
        </span>
      </div>
    </>
  );
}