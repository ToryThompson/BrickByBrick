"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// Slideshow images
const slides = [
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
  },
  {
    image: "/images/backgrounds/Screenshot 2025-05-27 at 9.29.22 AM.png",
    title: "Placeholder Title 3",
    description: "Placeholder description 3"
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
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h1 className="text-7xl font-bold mb-8 text-[#0055BF] font-brick [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3)]">Brick by Brick</h1>
              <h2 className="text-4xl font-semibold mb-8 text-[#0055BF] font-brick [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Professional LEGO Set Building – Atlanta, GA</h2>
              <p className="text-3xl font-bold mb-10 text-[#0055BF] font-brick [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Too busy to build your LEGO set? <br/>Let us handle it for you!</p>
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <Link href="/pricing" className="bg-yellow-400 px-10 py-5 rounded-lg font-semibold text-xl text-center hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl">See Pricing</Link>
                <Link href="/contact" className="bg-red-600 px-10 py-5 rounded-lg font-semibold text-xl text-center hover:bg-red-500 transition-colors shadow-lg hover:shadow-xl">Contact Us</Link>
              </div>
              <div className="mt-8 text-[#0055BF] text-2xl font-semibold [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">
                <span>Call or Text: </span>
                <a href="tel:7703835290" className="underline text-[#0055BF] hover:text-[#004494] transition-colors">770-383-5290</a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div 
                className="relative w-full max-w-xl aspect-video"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
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
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-6 rounded-b-lg">
                      <h3 className="text-xl font-bold mb-1">{slide.title}</h3>
                      <p>{slide.description}</p>
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
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
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-red-600 font-brick text-center">Perfect for:</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-lg hover:scale-105 transition-transform border-2 border-blue-200">
              <div className="text-4xl text-blue-500 mb-4 text-center">👨‍💼</div>
              <h3 className="text-xl font-bold text-center mb-2 text-blue-600">Adult Collectors</h3>
              <p className="text-gray-600 text-center">Perfect for collectors who want their sets professionally assembled and displayed.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg hover:scale-105 transition-transform border-2 border-red-200">
              <div className="text-4xl text-red-500 mb-4 text-center">🏪</div>
              <h3 className="text-xl font-bold text-center mb-2 text-red-600">Store Displays</h3>
              <p className="text-gray-600 text-center">Eye-catching displays for retail stores and businesses.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg hover:scale-105 transition-transform border-2 border-yellow-200">
              <div className="text-4xl text-yellow-500 mb-4 text-center">🎁</div>
              <h3 className="text-xl font-bold text-center mb-2 text-yellow-600">Gifts & Birthdays</h3>
              <p className="text-gray-600 text-center">Surprise your loved ones with professionally built LEGO sets.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg hover:scale-105 transition-transform border-2 border-green-200">
              <div className="text-4xl text-green-500 mb-4 text-center">⏰</div>
              <h3 className="text-xl font-bold text-center mb-2 text-green-600">Busy LEGO Lovers</h3>
              <p className="text-gray-600 text-center">For those who love LEGO but don't have time to build.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-[#0055BF] font-brick text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-[#0055BF]">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-red-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white font-brick">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-yellow-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl">Order Now</Link>
            <Link href="/how-it-works" className="bg-white px-8 py-4 rounded-lg font-semibold text-lg text-red-600 hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">Learn More</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
