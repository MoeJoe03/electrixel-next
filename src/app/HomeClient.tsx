"use client";
import dynamic from "next/dynamic";

// Ensure the Navigation component exists at the specified path or update the path accordingly
// Update the import path if Navigation is located elsewhere, e.g. "../components/Navbar"
// const Navigation = dynamic(() => import("../components/Navbar"), { ssr: false });

// If the file is missing, create it at ../components/Navigation.tsx or Navigation/index.tsx
const Navigation = dynamic(() => import("../components/Navigation"), { ssr: false });
const HeroSection = dynamic(() => import("../components/HeroSection"), { ssr: false });
const ScrollingTextSection = dynamic(() => import("../components/ScrollingTextSection"), { ssr: false });
const ServicesSection = dynamic(() => import("../components/ServicesSection"), { ssr: false });
const FooterSection = dynamic(() => import("../components/FooterSection"), { ssr: false });
// Our Work section removed

export default function HomeClient() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <ScrollingTextSection />
      <ServicesSection />
      <FooterSection />
    </>
  );
}
