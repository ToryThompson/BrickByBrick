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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen py-16 relative">
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-12 bg-[#0055BF] rounded-md mb-4 relative">
            <div className="absolute -top-2 left-1/4 -translate-x-1/2 w-8 h-4 bg-[#0055BF] rounded-md"></div>
            <div className="absolute -top-2 left-3/4 -translate-x-1/2 w-8 h-4 bg-[#0055BF] rounded-md"></div>
            <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-6 h-2 bg-white/90 rounded-sm"></div>
            <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-6 h-2 bg-white/90 rounded-sm"></div>
          </div>
          <h1 className="text-4xl font-bold text-center mb-2 text-[#0055BF] font-brick bg-white/80 backdrop-blur-sm px-8 py-4 rounded-lg shadow-lg [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Our Portfolio</h1>
          <div className="w-24 h-1 bg-[#D01012] rounded-full mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-center text-[#1B1B1B] mb-12">
            Explore our collection of completed LEGO projects. From simple sets to complex displays, we bring creativity to life.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[#0055BF] text-white'
                  : 'bg-white/95 text-[#1B1B1B] hover:bg-[#0055BF] hover:text-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedProject(item.id)}
            >
              <div className="relative h-64 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0055BF] mb-2">{item.title}</h3>
                <p className="text-[#1B1B1B] mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-[#F7D117]/20 text-[#1B1B1B] px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#1B1B1B] opacity-75">{item.size}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-[#0055BF]">
                    {portfolioItems.find(item => item.id === selectedProject)?.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-[#1B1B1B] hover:text-[#0055BF] transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="relative h-96 bg-gray-200 rounded-lg mb-6">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-[#1B1B1B] text-lg">
                    {portfolioItems.find(item => item.id === selectedProject)?.description}
                  </p>
                  <div>
                    <h3 className="font-bold text-[#0055BF] mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolioItems.find(item => item.id === selectedProject)?.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-[#F7D117]/20 text-[#1B1B1B] px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0055BF] mb-2">Project Details</h3>
                    <p className="text-[#1B1B1B]">
                      Size: {portfolioItems.find(item => item.id === selectedProject)?.size}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Link
                      href="/contact"
                      className="bg-[#0055BF] text-white px-8 py-4 rounded-lg hover:bg-[#004494] transition-colors text-lg"
                    >
                      Request Similar Project
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-6 font-brick text-[#0055BF] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">Ready to Start Your Project?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-[#0055BF] text-white px-8 py-4 rounded-lg hover:bg-[#004494] transition-colors text-lg">
              Request a Quote
            </Link>
            <Link href="/services" className="bg-[#F7D117] text-[#1B1B1B] px-8 py-4 rounded-lg hover:bg-[#E6C615] transition-colors text-lg">
              View Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 