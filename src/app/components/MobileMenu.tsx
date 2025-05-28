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
            className="block px-4 py-3 text-gray-600 hover:text-[#0055BF] hover:bg-gray-50 rounded-lg font-medium transition-all duration-300 active:scale-95 relative group"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative z-10">Home</span>
            <span className="absolute inset-0 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </Link>
          <Link 
            href="/services" 
            className="block px-4 py-3 text-gray-600 hover:text-[#0055BF] hover:bg-gray-50 rounded-lg font-medium transition-all duration-300 active:scale-95 relative group"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative z-10">Services</span>
            <span className="absolute inset-0 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </Link>
          <Link 
            href="/how-it-works" 
            className="block px-4 py-3 text-gray-600 hover:text-[#0055BF] hover:bg-gray-50 rounded-lg font-medium transition-all duration-300 active:scale-95 relative group"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative z-10">How It Works</span>
            <span className="absolute inset-0 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </Link>
          <Link 
            href="/portfolio" 
            className="block px-4 py-3 text-gray-600 hover:text-[#0055BF] hover:bg-gray-50 rounded-lg font-medium transition-all duration-300 active:scale-95 relative group"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative z-10">Portfolio</span>
            <span className="absolute inset-0 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </Link>
          <Link 
            href="/pricing" 
            className="block px-4 py-3 text-gray-600 hover:text-[#0055BF] hover:bg-gray-50 rounded-lg font-medium transition-all duration-300 active:scale-95 relative group"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative z-10">Pricing</span>
            <span className="absolute inset-0 bg-gray-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
          </Link>
          <Link 
            href="/contact" 
            className="block px-4 py-3 bg-[#0055BF] text-white rounded-lg font-medium hover:bg-[#004494] transition-all duration-300 text-center shadow-md hover:shadow-lg active:scale-95 relative group overflow-hidden"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative z-10">Contact Us</span>
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
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