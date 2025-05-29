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
    text: "Perfect for busy parents! They built my son's birthday gift and it was ready to display when he opened it.",
    rating: 5
  },
  {
    name: "Carlos T.",
    role: "Grandparent",
    text: "My grandkids loved their LEGO sets, and I loved not having to build them myself! Fast and friendly service.",
    rating: 5
  },
  {
    name: "Priya S.",
    role: "Busy Professional",
    text: "I never have time to build, but now my office has a beautiful LEGO display. Will use again!",
    rating: 5
  },
  {
    name: "Mike L.",
    role: "LEGO Enthusiast",
    text: "Attention to detail was incredible. They even sorted the extra pieces for me!",
    rating: 5
  },
  {
    name: "Ava K.",
    role: "Parent",
    text: "The team was so patient and communicative. My daughter was thrilled with her finished set.",
    rating: 5
  },
  {
    name: "Derek W.",
    role: "Corporate Client",
    text: "We ordered several sets for a company event. Everything was built perfectly and delivered on time.",
    rating: 5
  },
  {
    name: "Lily P.",
    role: "Birthday Planner",
    text: "The custom LEGO build was the highlight of our party. Thank you for making it so special!",
    rating: 5
  },
  {
    name: "Sam G.",
    role: "Repeat Customer",
    text: "I've used Brick by Brick three times now. Consistently excellent work and great communication.",
    rating: 5
  }
];

// Update the animation style
const style = `
@keyframes float {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100vh);
  }
}

@keyframes float-forever {
  0% { transform: translateY(0); }
  100% { transform: translateY(-120vh); }
}

@keyframes float-forever-fade {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    animation-timing-function: ease-in;
  }
  90% {
    opacity: 1;
    animation-timing-function: ease-out;
  }
  100% {
    transform: translateY(-120vh);
    opacity: 0;
  }
}
`;

// Add this right after the imports
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = style;
  document.head.appendChild(styleSheet);
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);

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

  // Testimonial slideshow
  useEffect(() => {
    const pageCount = Math.ceil(testimonials.length / 3);
    const timer = setInterval(() => {
      setCurrentTestimonialPage((prev) => (prev + 1) % pageCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[80vh] flex items-center overflow-hidden group">
        <div className="absolute inset-0 z-0 parallax-bg transition-transform duration-700 group-hover:scale-105">
          <Image
            src="/images/backgrounds/colored-toy-bricks-place-your-600nw-663866968.webp"
            alt="LEGO Bricks Background"
            fill
            className="object-cover transition-all duration-700 group-hover:brightness-110"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm transition-all duration-700 group-hover:bg-white/30"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2 text-center md:text-left transform transition-all duration-500 hover:scale-[1.02]">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-8 text-[#0055BF] font-brick [text-shadow:_4px_4px_8px_rgba(0,0,0,0.5)] transition-all duration-300 hover:text-[#0066E5] hover:[text-shadow:_6px_6px_12px_rgba(0,0,0,0.6)]">Brick by Brick</h1>
              <h2 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-8 text-[#0055BF] font-brick [text-shadow:_3px_3px_6px_rgba(0,0,0,0.4)] transition-all duration-300 hover:text-[#0066E5] hover:[text-shadow:_4px_4px_8px_rgba(0,0,0,0.5)]">Professional LEGO Set Building – Atlanta, GA</h2>
              <p className="text-xl md:text-3xl font-bold mb-6 md:mb-10 text-[#0055BF] hover:text-[#0066E5] transition-all duration-300 font-brick [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)] hover:[text-shadow:_3px_3px_6px_rgba(0,0,0,0.4)]">Too busy to build your LEGO set? <br/>Let us handle it for you!</p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
                <Link 
                  href="/how-it-works" 
                  className="group relative flex items-center justify-center px-6 py-3 rounded-lg bg-[#D01012] text-white font-semibold text-lg md:text-xl text-center hover:-translate-y-1 active:translate-y-0 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">How It Works</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#D01012] to-[#E52528] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Studs - relative to the button */}
                  <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#C00000] rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1"></div>
                  <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#C00000] rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1"></div>
                </Link>
                <Link 
                  href="/get-a-quote" 
                  className="group relative flex items-center justify-center px-6 py-3 rounded-lg bg-[#237841] text-white font-semibold text-lg md:text-xl text-center hover:-translate-y-1 active:translate-y-0 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">Get a Quote</span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#237841] to-[#2A8F4E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Studs - relative to the button */}
                  <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#1a5a30] rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1"></div>
                  <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#1a5a30] rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1"></div>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center w-full">
              <div className="relative w-[130%] max-w-[130%] aspect-[16/10] transform transition-all duration-500 hover:scale-[1.02]">
                {/* Slides Container */}
                <div className="absolute inset-0 w-full h-full z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === currentSlide 
                          ? 'opacity-100 scale-100 translate-x-0' 
                          : 'opacity-0 scale-95 translate-x-4'
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="rounded-lg shadow-2xl bg-white/90 backdrop-blur-sm object-cover transition-all duration-500 hover:brightness-110"
                        priority={index === 0}
                      />
                      <div className="absolute bottom-16 left-0 right-0 bg-black/50 text-white p-6 rounded-lg flex flex-col items-center text-center transform transition-all duration-500 hover:bg-black/60 hover:scale-[1.02]">
                        <h3 className="text-2xl font-bold mb-2 transition-all duration-300 hover:text-[#F7D117]">{slide.title}</h3>
                        <p className="text-lg transition-all duration-300 hover:text-white/90">{slide.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-white scale-125 shadow-lg shadow-white/50' 
                            : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="relative py-12 md:py-20 bg-gray-50 overflow-hidden">
        {/* Pastel Floating LEGO Blocks Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {Array.from({ length: 32 }).map((_, i) => {
            const colors = [
              'bg-[#D01012]/20',
              'bg-[#F7D117]/20',
              'bg-[#0055BF]/20',
              'bg-[#237841]/20'
            ];
            const size = Math.random() > 0.5 ? 'w-6 h-3' : 'w-4 h-2';
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = 120 + Math.random() * 120; // 2-4 minutes
            const delay = Math.random() * 60;
            return (
              <div
                key={i}
                className={`absolute rounded-md ${colors[i % 4]} ${size}`}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `float-forever-fade ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-[#0055BF] font-brick [text-shadow:_4px_4px_8px_rgba(0,0,0,0.5)] text-center">Perfect for:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="group relative bg-white rounded-lg p-6 md:p-8 shadow-lg hover:scale-105 transition-all duration-300 border-2 border-blue-200 hover:border-blue-400">
              <div className="absolute -top-2 left-1/4 -translate-x-1/2 w-4 h-2 bg-blue-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-2 left-3/4 -translate-x-1/2 w-4 h-2 bg-blue-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative w-12 h-6 bg-[#0055BF] rounded-sm mr-3 transform transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0066E5] to-[#0055BF] rounded-sm"></div>
                  <div className="absolute inset-y-0 -left-0.5 w-0.5 bg-[#004CAA] rounded-l-sm"></div>
                  <div className="absolute inset-y-0 -right-0.5 w-0.5 bg-[#004CAA] rounded-r-sm"></div>
                  <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#0066E5] rounded-sm shadow-inner"></div>
                  <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#0066E5] rounded-sm shadow-inner"></div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-blue-600 group-hover:text-blue-700 transition-colors">Adult Collectors</h3>
              <p className="text-sm md:text-base text-gray-600 text-center group-hover:text-gray-800 transition-colors">Perfect for collectors who want their sets professionally assembled and displayed.</p>
            </div>
            <div className="group relative bg-white rounded-lg p-6 md:p-8 shadow-lg hover:scale-105 transition-all duration-300 border-2 border-red-200 hover:border-red-400">
              <div className="absolute -top-2 left-1/4 -translate-x-1/2 w-4 h-2 bg-red-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-2 left-3/4 -translate-x-1/2 w-4 h-2 bg-red-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative w-12 h-6 bg-[#D01012] rounded-sm mr-3 transform transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#E52528] to-[#D01012] rounded-sm"></div>
                  <div className="absolute inset-y-0 -left-0.5 w-0.5 bg-[#A00A0A] rounded-l-sm"></div>
                  <div className="absolute inset-y-0 -right-0.5 w-0.5 bg-[#A00A0A] rounded-r-sm"></div>
                  <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#E52528] rounded-sm shadow-inner"></div>
                  <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#E52528] rounded-sm shadow-inner"></div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-red-600 group-hover:text-red-700 transition-colors">Store Displays</h3>
              <p className="text-sm md:text-base text-gray-600 text-center group-hover:text-gray-800 transition-colors">Eye-catching displays for retail stores and businesses.</p>
            </div>
            <div className="group relative bg-white rounded-lg p-6 md:p-8 shadow-lg hover:scale-105 transition-all duration-300 border-2 border-yellow-200 hover:border-yellow-400">
              <div className="absolute -top-2 left-1/4 -translate-x-1/2 w-4 h-2 bg-yellow-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-2 left-3/4 -translate-x-1/2 w-4 h-2 bg-yellow-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative w-12 h-6 bg-[#F7D117] rounded-sm mr-3 transform transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FFE066] to-[#F7D117] rounded-sm"></div>
                  <div className="absolute inset-y-0 -left-0.5 w-0.5 bg-[#C9A100] rounded-l-sm"></div>
                  <div className="absolute inset-y-0 -right-0.5 w-0.5 bg-[#C9A100] rounded-r-sm"></div>
                  <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#FFE066] rounded-sm shadow-inner"></div>
                  <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#FFE066] rounded-sm shadow-inner"></div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-yellow-600 group-hover:text-yellow-700 transition-colors">Gifts & Birthdays</h3>
              <p className="text-sm md:text-base text-gray-600 text-center group-hover:text-gray-800 transition-colors">Surprise your loved ones with professionally built LEGO sets.</p>
            </div>
            <div className="group relative bg-white rounded-lg p-6 md:p-8 shadow-lg hover:scale-105 transition-all duration-300 border-2 border-green-200 hover:border-green-400">
              <div className="absolute -top-2 left-1/4 -translate-x-1/2 w-4 h-2 bg-green-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-2 left-3/4 -translate-x-1/2 w-4 h-2 bg-green-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="relative w-12 h-6 bg-[#237841] rounded-sm mr-3 transform transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#2A8F4E] to-[#237841] rounded-sm"></div>
                  <div className="absolute inset-y-0 -left-0.5 w-0.5 bg-[#145C2A] rounded-l-sm"></div>
                  <div className="absolute inset-y-0 -right-0.5 w-0.5 bg-[#145C2A] rounded-r-sm"></div>
                  <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#2A8F4E] rounded-sm shadow-inner"></div>
                  <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#2A8F4E] rounded-sm shadow-inner"></div>
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-green-600 group-hover:text-green-700 transition-colors">Busy LEGO Lovers</h3>
              <p className="text-sm md:text-base text-gray-600 text-center group-hover:text-gray-800 transition-colors">For those who love LEGO but don't have time to build.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-[#0055BF] font-brick text-center">What Our Clients Say</h2>
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-xl shadow-lg bg-gray-50">
              <div
                className="transition-transform duration-700 flex"
                style={{ transform: `translateX(-${currentTestimonialPage * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, pageIdx) => (
                  <div key={pageIdx} className="min-w-full flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch">
                    {testimonials.slice(pageIdx * 3, pageIdx * 3 + 3).map((testimonial, idx) => (
                      <div key={idx} className="flex-1 bg-gray-50 rounded-xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-lg md:text-xl">★</span>
                          ))}
                        </div>
                        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 italic text-center">"{testimonial.text}"</p>
                        <div>
                          <p className="font-bold text-[#0055BF] text-center">{testimonial.name}</p>
                          <p className="text-gray-500 text-xs md:text-sm text-center">{testimonial.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Navigation dots */}
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonialPage(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${idx === currentTestimonialPage ? 'bg-[#0055BF]' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial page ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-red-600 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white font-brick">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/get-a-quote" 
              className="group relative flex items-center justify-center px-6 py-3 rounded-lg bg-[#F7D117] text-[#1B1B1B] font-semibold text-lg text-center hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            >
              Get a Quote
              {/* Studs - relative to the button */}
              <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#E0B500] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#E0B500] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/how-it-works" 
              className="group relative flex items-center justify-center px-6 py-3 rounded-lg bg-white text-[#D01012] font-semibold text-lg text-center hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            >
              Learn More
              {/* Studs - relative to the button */}
              <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#C00000] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#C00000] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* Add these keyframes to your existing style block */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
