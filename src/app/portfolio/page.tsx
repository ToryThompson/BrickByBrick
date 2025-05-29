"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder data for portfolio items
const portfolioItems = [
  {
    id: 1,
    title: "Star Wars Collection",
    category: "display",
    description: "A stunning collection of Star Wars LEGO sets, perfectly assembled and displayed with custom lighting.",
    image: "/images/portfolio/placeholder-1.jpg",
    features: ["Custom lighting", "Display case", "Professional assembly"],
    size: "Large (2000+ pieces)"
  },
  {
    id: 2,
    title: "Modular Buildings",
    category: "assembly",
    description: "Complete set of modular buildings, carefully assembled and arranged to create a vibrant cityscape.",
    image: "/images/portfolio/placeholder-2.jpg",
    features: ["Full set assembly", "Custom arrangement", "Dust protection"],
    size: "Medium (500-1999 pieces)"
  },
  {
    id: 3,
    title: "Technic Supercar",
    category: "assembly",
    description: "Complex Technic supercar build with working features and custom display stand.",
    image: "/images/portfolio/placeholder-3.jpg",
    features: ["Working features", "Custom stand", "Professional assembly"],
    size: "Large (2000+ pieces)"
  },
  {
    id: 4,
    title: "Architecture Series",
    category: "display",
    description: "Collection of iconic architecture sets, displayed with custom lighting and information plaques.",
    image: "/images/portfolio/placeholder-4.jpg",
    features: ["Custom lighting", "Information plaques", "Professional assembly"],
    size: "Medium (500-1999 pieces)"
  },
  {
    id: 5,
    title: "Creator Expert Sets",
    category: "assembly",
    description: "Various Creator Expert sets assembled and displayed with custom arrangements.",
    image: "/images/portfolio/placeholder-5.jpg",
    features: ["Custom arrangement", "Display case", "Professional assembly"],
    size: "Large (2000+ pieces)"
  },
  {
    id: 6,
    title: "Custom MOC Display",
    category: "display",
    description: "Custom MOC (My Own Creation) display with unique design and custom lighting.",
    image: "/images/portfolio/placeholder-6.jpg",
    features: ["Custom design", "LED lighting", "Professional assembly"],
    size: "Extra Large (4000+ pieces)"
  }
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "assembly", label: "Assembly Projects" },
  { id: "display", label: "Display Solutions" }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen py-16 relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/backgrounds/colored-toy-bricks-place-your-600nw-663866968.webp"
          alt="LEGO Bricks Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* LEGO Brick Illustration - Yellow */}
        <div className="w-32 h-16 flex items-center justify-center mb-6">
          <div className="relative w-24 h-10 bg-[#F7D117] rounded-sm transform transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFE066] to-[#F7D117] rounded-sm"></div>
            <div className="absolute inset-y-0 -left-1 w-2 bg-[#C9A100] rounded-l-sm"></div>
            <div className="absolute inset-y-0 -right-1 w-2 bg-[#C9A100] rounded-r-sm"></div>
            <div className="absolute -top-2 left-1/4 -translate-x-1/2 w-8 h-4 bg-[#FFE066] rounded-sm shadow-inner"></div>
            <div className="absolute -top-2 left-3/4 -translate-x-1/2 w-8 h-4 bg-[#FFE066] rounded-sm shadow-inner"></div>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-[#0055BF] font-brick bg-white/80 backdrop-blur-sm px-8 py-4 rounded-lg shadow-lg mb-4 [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Coming Soon!</h1>
        <p className="text-2xl text-[#1B1B1B] mb-6 bg-white/70 px-6 py-3 rounded-lg shadow font-brick">We're building something awesome, one brick at a time.<br/>Check back soon to see our LEGO set builds and creative displays!</p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <Link href="/" className="inline-block bg-[#F7D117] text-[#1B1B1B] font-bold px-6 py-3 rounded-full shadow-lg text-lg font-brick hover:bg-[#FFE066] transition-colors duration-200">
            Keep on building!
          </Link>
          <div className="relative w-8 h-4 bg-[#237841] rounded-sm transform transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2A8F4E] to-[#237841] rounded-sm"></div>
            <div className="absolute inset-y-0 -left-0.5 w-1 bg-[#145C2A] rounded-l-sm"></div>
            <div className="absolute inset-y-0 -right-0.5 w-1 bg-[#145C2A] rounded-r-sm"></div>
            <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-2 h-1 bg-[#2A8F4E] rounded-sm shadow-inner"></div>
            <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-2 h-1 bg-[#2A8F4E] rounded-sm shadow-inner"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 