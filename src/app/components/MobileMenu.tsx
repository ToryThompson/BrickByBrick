"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100">
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 