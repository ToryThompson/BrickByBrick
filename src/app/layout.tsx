"use client";

import { Inter } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import MobileMenu from "./components/MobileMenu";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-bricolage'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blocks, setBlocks] = useState([
    // First row
    { id: 1, x: 5, y: 15, color: "#0055BF", size: 3 },
    { id: 2, x: 15, y: 15, color: "#D01012", size: 4 },
    { id: 3, x: 25, y: 15, color: "#237841", size: 3 },
    { id: 4, x: 35, y: 15, color: "#F7D117", size: 4 },
    { id: 5, x: 45, y: 15, color: "#0055BF", size: 3 },
    { id: 6, x: 55, y: 15, color: "#D01012", size: 4 },
    { id: 7, x: 65, y: 15, color: "#237841", size: 3 },
    { id: 8, x: 75, y: 15, color: "#F7D117", size: 4 },
    { id: 9, x: 85, y: 15, color: "#0055BF", size: 3 },
    { id: 10, x: 95, y: 15, color: "#D01012", size: 4 },
    
    // Second row
    { id: 11, x: 10, y: 30, color: "#237841", size: 4 },
    { id: 12, x: 20, y: 30, color: "#F7D117", size: 3 },
    { id: 13, x: 30, y: 30, color: "#0055BF", size: 4 },
    { id: 14, x: 40, y: 30, color: "#D01012", size: 3 },
    { id: 15, x: 50, y: 30, color: "#237841", size: 4 },
    { id: 16, x: 60, y: 30, color: "#F7D117", size: 3 },
    { id: 17, x: 70, y: 30, color: "#0055BF", size: 4 },
    { id: 18, x: 80, y: 30, color: "#D01012", size: 3 },
    { id: 19, x: 90, y: 30, color: "#237841", size: 4 },
    
    // Third row
    { id: 20, x: 5, y: 45, color: "#F7D117", size: 3 },
    { id: 21, x: 15, y: 45, color: "#0055BF", size: 4 },
    { id: 22, x: 25, y: 45, color: "#D01012", size: 3 },
    { id: 23, x: 35, y: 45, color: "#237841", size: 4 },
    { id: 24, x: 45, y: 45, color: "#F7D117", size: 3 },
    { id: 25, x: 55, y: 45, color: "#0055BF", size: 4 },
    { id: 26, x: 65, y: 45, color: "#D01012", size: 3 },
    { id: 27, x: 75, y: 45, color: "#237841", size: 4 },
    { id: 28, x: 85, y: 45, color: "#F7D117", size: 3 },
    { id: 29, x: 95, y: 45, color: "#0055BF", size: 4 },
    
    // Fourth row
    { id: 30, x: 10, y: 60, color: "#D01012", size: 4 },
    { id: 31, x: 20, y: 60, color: "#237841", size: 3 },
    { id: 32, x: 30, y: 60, color: "#F7D117", size: 4 },
    { id: 33, x: 40, y: 60, color: "#0055BF", size: 3 },
    { id: 34, x: 50, y: 60, color: "#D01012", size: 4 },
    { id: 35, x: 60, y: 60, color: "#237841", size: 3 },
    { id: 36, x: 70, y: 60, color: "#F7D117", size: 4 },
    { id: 37, x: 80, y: 60, color: "#0055BF", size: 3 },
    { id: 38, x: 90, y: 60, color: "#D01012", size: 4 },
    
    // Fifth row
    { id: 39, x: 5, y: 75, color: "#237841", size: 3 },
    { id: 40, x: 15, y: 75, color: "#F7D117", size: 4 },
    { id: 41, x: 25, y: 75, color: "#0055BF", size: 3 },
    { id: 42, x: 35, y: 75, color: "#D01012", size: 4 },
    { id: 43, x: 45, y: 75, color: "#237841", size: 3 },
    { id: 44, x: 55, y: 75, color: "#F7D117", size: 4 },
    { id: 45, x: 65, y: 75, color: "#0055BF", size: 3 },
    { id: 46, x: 75, y: 75, color: "#D01012", size: 4 },
    { id: 47, x: 85, y: 75, color: "#237841", size: 3 },
    { id: 48, x: 95, y: 75, color: "#F7D117", size: 4 },
    
    // Sixth row
    { id: 49, x: 10, y: 90, color: "#0055BF", size: 4 },
    { id: 50, x: 20, y: 90, color: "#D01012", size: 3 },
    { id: 51, x: 30, y: 90, color: "#237841", size: 4 },
    { id: 52, x: 40, y: 90, color: "#F7D117", size: 3 },
    { id: 53, x: 50, y: 90, color: "#0055BF", size: 4 },
    { id: 54, x: 60, y: 90, color: "#D01012", size: 3 },
    { id: 55, x: 70, y: 90, color: "#237841", size: 4 },
    { id: 56, x: 80, y: 90, color: "#F7D117", size: 3 },
    { id: 57, x: 90, y: 90, color: "#0055BF", size: 4 },
  ]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const nav = e.currentTarget;
    const rect = nav.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });

    // Update block positions
    setBlocks(blocks.map(block => {
      const dx = block.x - x;
      const dy = block.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 20; // Reduced distance for more precise movement
      
      if (distance < maxDistance) {
        const angle = Math.atan2(dy, dx);
        const force = (maxDistance - distance) / maxDistance;
        const newX = block.x + Math.cos(angle) * force * 6; // Reduced movement for more controlled effect
        const newY = block.y + Math.sin(angle) * force * 6;
        
        // Keep blocks within bounds with more precise boundaries
        return {
          ...block,
          x: Math.max(2, Math.min(98, newX)),
          y: Math.max(2, Math.min(98, newY))
        };
      }
      return block;
    }));
  };

  return (
    <html lang="en">
      <body className={`${inter.className} ${bricolage.variable}`}>
        {/* Navigation */}
        <nav 
          className="relative bg-white shadow-lg sticky top-0 z-50 overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full">
              {blocks.map(block => (
                <div
                  key={block.id}
                  className="absolute rounded-sm shadow-sm transition-all duration-300 ease-out"
                  style={{
                    left: `${block.x}%`,
                    top: `${block.y}%`,
                    width: `${block.size * 4}px`,
                    height: `${block.size * 4}px`,
                    backgroundColor: `${block.color}35`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center group">
                {/* LEGO Brick Logo */}
                <div className="w-10 h-6 bg-[#0055BF] rounded-sm mr-3 relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-5 h-2 bg-white/90 rounded-sm"></div>
                  <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-5 h-2 bg-white/90 rounded-sm"></div>
                </div>
                <span className="text-2xl font-bold text-[#0055BF] font-brick group-hover:text-[#004494] transition-colors">
                  Brick by Brick
                </span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-4">
                <Link 
                  href="/" 
                  className="group relative flex items-center justify-center px-2 py-1 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
                >
                  {/* This div is the 'brick' on hover */}
                  <div className="relative z-10 px-3 py-2 rounded group-hover:bg-yellow-400 transition-colors duration-300">
                    <span className="text-[#0055BF] font-semibold group-hover:text-black transition-colors duration-300">Home</span>
                    {/* Studs - relative to the inner div */}
                    <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-yellow-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-yellow-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
                <Link 
                  href="/services" 
                  className="group relative flex items-center justify-center px-2 py-1 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
                >
                  {/* This div is the 'brick' on hover */}
                  <div className="relative z-10 px-3 py-2 rounded group-hover:bg-red-500 transition-colors duration-300">
                    <span className="text-[#0055BF] font-semibold group-hover:text-white transition-colors duration-300">Services</span>
                    {/* Studs - relative to the inner div */}
                    <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-red-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-red-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
                <Link 
                  href="/how-it-works" 
                  className="group relative flex items-center justify-center px-2 py-1 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
                >
                  {/* This div is the 'brick' on hover */}
                  <div className="relative z-10 px-3 py-2 rounded group-hover:bg-green-500 transition-colors duration-300">
                    <span className="text-[#0055BF] font-semibold group-hover:text-white transition-colors duration-300">How It Works</span>
                    {/* Studs - relative to the inner div */}
                    <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-green-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-green-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
                <Link 
                  href="/portfolio" 
                  className="group relative flex items-center justify-center px-2 py-1 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
                >
                  {/* This div is the 'brick' on hover */}
                  <div className="relative z-10 px-3 py-2 rounded group-hover:bg-blue-500 transition-colors duration-300">
                    <span className="text-[#0055BF] font-semibold group-hover:text-white transition-colors duration-300">Portfolio</span>
                    {/* Studs - relative to the inner div */}
                    <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-blue-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-blue-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
                <Link 
                  href="/pricing" 
                  className="group relative flex items-center justify-center px-2 py-1 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
                >
                  {/* This div is the 'brick' on hover */}
                  <div className="relative z-10 px-3 py-2 rounded group-hover:bg-yellow-400 transition-colors duration-300">
                    <span className="text-[#0055BF] font-semibold group-hover:text-black transition-colors duration-300">Pricing</span>
                    {/* Studs - relative to the inner div */}
                    <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-yellow-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-yellow-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
                <Link 
                  href="/contact" 
                  className="group relative flex items-center justify-center px-2 py-1 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
                >
                  {/* This div is the 'brick' on hover */}
                  <div className="relative z-10 px-3 py-2 rounded group-hover:bg-red-500 transition-colors duration-300">
                    <span className="text-[#0055BF] font-semibold group-hover:text-white transition-colors duration-300">Contact</span>
                    {/* Studs - relative to the inner div */}
                    <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-red-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-red-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </nav>

              {/* Mobile Menu */}
              <MobileMenu />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-4 font-brick">Brick by Brick</h3>
                <p className="text-gray-300">Professional LEGO set building services.</p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-4 font-brick">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/services" className="text-gray-300 hover:text-white">Services</Link></li>
                  <li><Link href="/how-it-works" className="text-gray-300 hover:text-white">How It Works</Link></li>
                  <li><Link href="/portfolio" className="text-gray-300 hover:text-white">Portfolio</Link></li>
                  <li><Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold mb-4 font-brick">Contact Us</h3>
                <p className="text-gray-300">Email: probrickbuilds@gmail.com</p>
                <p className="text-gray-300">Phone: (770) 383-5290</p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; {new Date().getFullYear()} Brick by Brick Toy Building. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
