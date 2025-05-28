"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
          <span className={`block w-6 h-0.5 bg-[#0055BF] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#0055BF] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#0055BF] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="px-4 py-6 space-y-4 border-t border-gray-100">
          <Link 
            href="/" 
            className="group relative flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg bg-[#0055BF] hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
            {/* Studs - relative to the button */}
            <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#004494] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#004494] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link 
            href="/services" 
            className="group relative flex items-center justify-center px-6 py-3 text-[#1B1B1B] font-semibold rounded-lg bg-[#F7D117] hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            onClick={() => setIsOpen(false)}
          >
            Services
            {/* Studs - relative to the button */}
            <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#E0B500] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#E0B500] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link 
            href="/how-it-works" 
            className="group relative flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg bg-[#D01012] hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            onClick={() => setIsOpen(false)}
          >
            How It Works
            {/* Studs - relative to the button */}
            <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#C00000] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#C00000] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link 
            href="/portfolio" 
            className="group relative flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg bg-[#237841] hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            onClick={() => setIsOpen(false)}
          >
            Portfolio
            {/* Studs - relative to the button */}
            <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#1a5a30] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#1a5a30] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link 
            href="/pricing" 
            className="group relative flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg bg-[#0055BF] hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            onClick={() => setIsOpen(false)}
          >
            Pricing
            {/* Studs - relative to the button */}
            <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#004494] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#004494] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link 
            href="/contact" 
            className="group relative flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg bg-[#D01012] hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
            {/* Studs - relative to the button */}
            <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#C00000] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#C00000] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      {/* Overlay when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 