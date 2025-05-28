"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Slideshow images
const slides = [
  {
    image: "/images/backgrounds/ChatGPT Image May 26, 2025, 06_17_43 PM.png",
    title: "Professional Assembly",
    description: "Expert builders ensure perfect assembly every time"
  },
  {
    image: "/images/backgrounds/ChatGPT Image May 26, 2025, 07_20_30 PM.png",
    title: "We build for YOU!!!",
    description: "All of the best parts of LEGO are included in our builds!"
  },
  {
    image: "/images/backgrounds/ChatGPT Image May 26, 2025, 07_24_20 PM.png",
    title: "New or Old",
    description: "Just purchase the set and have us do the work!!"
  },
  {
    image: "/images/backgrounds/May 27, 2025, 10_54_04 AM.png",
    title: "Great for Gifts or the Holidays",
    description: ""
  }
];

// Testimonials
const testimonials = [
  {
    name: "Sarah M.",
    role: "LEGO Collector",
    text: "Amazing service! They built my Star Wars collection perfectly and even added custom lighting. Highly recommend!",
    rating: 5
  },
  {
    name: "John D.",
    role: "Store Owner",
    text: "Professional, timely, and the display they created for my store has been a huge hit with customers.",
    rating: 5
  },
  {
    name: "Emily R.",
    role: "Gift Giver",
    text: "Perfect for busy parents! They built my son&apos;s birthday gift and it was ready to display when he opened it.",
    rating: 5
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 parallax-bg">
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
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-8 text-[#0055BF] font-brick [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">Brick by Brick</h1>
              <h2 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-8 text-[#0055BF] font-brick [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Professional LEGO Set Building – Atlanta, GA</h2>
              <p className="text-xl md:text-3xl font-bold mb-6 md:mb-10 text-[#0055BF] font-brick [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Too busy to build your LEGO set? <br/>Let us handle it for you!</p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
                <Link 
                  href="/pricing" 
                  className="group relative flex items-center justify-center px-4 md:px-6 py-2 md:py-3 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
                >
                  {/* This div is the 'brick' on hover */}
                  <div className="relative z-10 px-4 md:px-6 py-2 md:py-2 rounded group-hover:bg-yellow-400 transition-colors duration-300">
                    <span className="relative z-10 font-semibold text-lg md:text-xl text-center text-black">See Pricing</span>
                    {/* Studs - relative to the inner div */}
                    <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-yellow-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-yellow-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
                <Link 
                  href="/contact" 
                  className="group relative flex items-center justify-center px-4 md:px-6 py-2 md:py-3 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
                >
                  {/* This div is the 'brick' on hover */}
                  <div className="relative z-10 px-4 md:px-6 py-2 md:py-2 rounded group-hover:bg-red-600 transition-colors duration-300">
                    <span className="relative z-10 font-semibold text-lg md:text-xl text-center text-white">Contact Us</span>
                    {/* Studs - relative to the inner div */}
                    <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-red-700 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-red-700 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>
              <div className="mt-6 md:mt-8 text-[#0055BF] text-xl md:text-2xl font-semibold [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">
                <span>Call or Text: </span>
                <a href="tel:7703835290" className="underline text-[#0055BF] hover:text-[#004494] transition-colors">770-383-5290</a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center w-full">
              <div className="relative w-[130%] max-w-[130%] aspect-[16/10]">
                {/* Slides are rendered below the SVG frame */}
                <div className="absolute inset-0 w-full h-full z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="rounded-lg shadow-2xl bg-white/90 backdrop-blur-sm object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute bottom-16 left-0 right-0 bg-black/50 text-white p-6 rounded-lg flex flex-col items-center text-center">
                        <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                        <p className="text-lg">{slide.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentSlide ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {/* LEGO Brick SVG Frame - overlays the slideshow */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-30"
                  viewBox="0 0 1000 562"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  {/* Top row bricks */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <rect
                      key={`top-${i}`}
                      x={i * 100 + 10}
                      y={0}
                      width={80}
                      height={40}
                      rx={8}
                      fill={["#D01012", "#F7D117", "#0055BF", "#237841"][i % 4]}
                      stroke="#222"
                      strokeWidth={3}
                    />
                  ))}
                  {/* Bottom row bricks */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <rect
                      key={`bottom-${i}`}
                      x={i * 100 + 10}
                      y={522}
                      width={80}
                      height={40}
                      rx={8}
                      fill={["#237841", "#0055BF", "#F7D117", "#D01012"][i % 4]}
                      stroke="#222"
                      strokeWidth={3}
                    />
                  ))}
                  {/* Left column bricks */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <rect
                      key={`left-${i}`}
                      x={0}
                      y={i * 140 + 50}
                      width={40}
                      height={80}
                      rx={8}
                      fill={["#0055BF", "#D01012", "#237841", "#F7D117"][i % 4]}
                      stroke="#222"
                      strokeWidth={3}
                    />
                  ))}
                  {/* Right column bricks */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <rect
                      key={`right-${i}`}
                      x={960}
                      y={i * 140 + 50}
                      width={40}
                      height={80}
                      rx={8}
                      fill={["#F7D117", "#237841", "#D01012", "#0055BF"][i % 4]}
                      stroke="#222"
                      strokeWidth={3}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="relative py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-red-600 font-brick text-center">Perfect for:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:scale-105 transition-transform border-2 border-blue-200">
              <div className="text-3xl md:text-4xl text-blue-500 mb-3 md:mb-4 text-center">👨‍💼</div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-blue-600">Adult Collectors</h3>
              <p className="text-sm md:text-base text-gray-600 text-center">Perfect for collectors who want their sets professionally assembled and displayed.</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:scale-105 transition-transform border-2 border-red-200">
              <div className="text-3xl md:text-4xl text-red-500 mb-3 md:mb-4 text-center">🏪</div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-red-600">Store Displays</h3>
              <p className="text-sm md:text-base text-gray-600 text-center">Eye-catching displays for retail stores and businesses.</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:scale-105 transition-transform border-2 border-yellow-200">
              <div className="text-3xl md:text-4xl text-yellow-500 mb-3 md:mb-4 text-center">🎁</div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-yellow-600">Gifts & Birthdays</h3>
              <p className="text-sm md:text-base text-gray-600 text-center">Surprise your loved ones with professionally built LEGO sets.</p>
            </div>
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg hover:scale-105 transition-transform border-2 border-green-200">
              <div className="text-3xl md:text-4xl text-green-500 mb-3 md:mb-4 text-center">⏰</div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-green-600">Busy LEGO Lovers</h3>
              <p className="text-sm md:text-base text-gray-600 text-center">For those who love LEGO but don't have time to build.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-[#0055BF] font-brick text-center">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg md:text-xl">★</span>
                  ))}
                </div>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-[#0055BF]">{testimonial.name}</p>
                  <p className="text-gray-500 text-xs md:text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-red-600 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white font-brick">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="group relative flex items-center justify-center px-4 py-2 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            >
              {/* This div is the 'brick' on hover */}
              <div className="relative z-10 px-4 py-2 rounded group-hover:bg-yellow-400 transition-colors duration-300">
                <span className="relative z-10 font-semibold text-lg text-black">Order Now</span>
                {/* Studs - relative to the inner div */}
                <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-yellow-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-yellow-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
            <Link 
              href="/how-it-works" 
              className="group relative flex items-center justify-center px-4 py-2 rounded-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            >
              {/* This div is the 'brick' on hover */}
              <div className="relative z-10 px-4 py-2 rounded group-hover:bg-white transition-colors duration-300">
                <span className="relative z-10 font-semibold text-lg text-red-600">Learn More</span>
                {/* Studs - relative to the inner div */}
                <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-gray-200 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-gray-200 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
