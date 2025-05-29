"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";

interface LegoSet {
  set_num: string;
  name: string;
  year: number;
  theme_id: number;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
}

const serviceOptions = [
  { value: "assembly", label: "Expert Assembly" },
  { value: "on-site", label: "On-site Building" },
  { value: "display", label: "Display Solutions" },
  { value: "complicated", label: "It's Complicated - We Need to Talk About It" },
];

function ContactContent() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    setSize: '',
    message: '',
    gluing: false as boolean | 'permanent' | 'dissolvable',
    selectedSet: null as LegoSet | null,
    deliveryMethod: '',
    address: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LegoSet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form data with initialService from search params on mount
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      service: initialService,
    }));
  }, [initialService]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        setSize: '',
        message: '',
        gluing: false,
        selectedSet: null,
        deliveryMethod: '',
        address: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setError(null);
    
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/lego-search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to search LEGO sets');
      }
      
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching LEGO sets:', error);
      setError(error instanceof Error ? error.message : 'Failed to search LEGO sets');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetSelect = (set: LegoSet) => {
    setFormData(prev => ({
      ...prev,
      selectedSet: set,
      setSize: set.num_parts.toString()
    }));
    setSearchResults([]);
    setSearchQuery(set.name);
  };

  const [activeTab, setActiveTab] = useState('general');

  const faqItems = {
    general: [
      {
        question: "How long does it take to build a set?",
        answer: "Build times vary based on the size and complexity of the set. Small sets (under 500 pieces) typically take 1-2 days, medium sets (500-2000 pieces) take 2-4 days, and large sets (2000+ pieces) can take 4-7 days. We'll provide a specific timeline when you request a quote."
      },
      {
        question: "Do you provide the LEGO sets?",
        answer: "No, we don't provide the LEGO sets. You'll need to purchase the set you want built. We can help you find the set you're looking for and provide guidance on where to purchase it."
      },
      {
        question: "What happens if pieces are missing?",
        answer: "We carefully inventory all pieces before starting the build. If any pieces are missing, we'll notify you immediately and can order replacement parts for you. The cost of replacement parts will be added to your final bill."
      },
      {
        question: "What areas do you service?",
        answer: "We primarily service the Atlanta metropolitan area, including surrounding counties. For specific locations, please contact us to confirm service availability."
      }
    ],
    pricing: [
      {
        question: "How is pricing determined?",
        answer: "Pricing is based on several factors including piece count, set complexity, delivery method, and any additional services like gluing or display solutions."
      },
      {
        question: "What's included in the price?",
        answer: "The price includes professional assembly, quality control, and secure packaging. Additional services like gluing, custom display solutions, and delivery/shipping are priced separately. We'll provide a detailed quote that breaks down all costs."
      },
      {
        question: "Do you offer discounts for multiple sets?",
        answer: "Yes, we offer volume discounts for multiple sets. Contact us for specific pricing based on your needs."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, PayPal, and cash for local transactions."
      }
    ],
    services: [
      {
        question: "What gluing options do you offer?",
        answer: "We offer two gluing options: permanent glue for display pieces that won't be disassembled, and dissolvable glue that can be removed with warm water if you want to rebuild the set later. Both options use professional-grade glue that's safe for LEGO pieces."
      },
      {
        question: "How do you ensure quality?",
        answer: "We follow a strict quality control process: careful sorting, step-by-step building following official instructions, thorough inspection for missing pieces, and final quality check. We also take photos during the build process so you can see the progress."
      },
      {
        question: "How do you handle shipping?",
        answer: "We use professional packaging materials and techniques to ensure your built set arrives safely. Sets are carefully wrapped and secured in custom boxes. We provide tracking information and can arrange for special handling if needed."
      },
      {
        question: "Can you build custom LEGO creations?",
        answer: "Yes! We can help bring your custom LEGO ideas to life. This includes modifications to existing sets or completely original designs. Custom builds require additional planning and may have different pricing. Contact us to discuss your ideas."
      }
    ]
  };

  return (
    <main className="min-h-screen py-16 relative">
      <div className="fixed inset-0 z-0">
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
          <h1 className="text-4xl font-bold text-center mb-2 text-[#0055BF] font-brick bg-white/80 backdrop-blur-sm px-8 py-4 rounded-lg shadow-lg [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Contact & Support</h1>
          <div className="w-24 h-1 bg-[#D01012] rounded-full mb-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#0055BF] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-[#1B1B1B] mb-2 text-center">Phone</h3>
              <p className="text-[#1B1B1B] text-center">(770) 383-5290</p>
              <p className="text-gray-600 text-sm text-center mt-2">Available 24/7</p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#0055BF] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-[#1B1B1B] mb-2 text-center">Email</h3>
              <p className="text-[#1B1B1B] text-center">probrickbuilds@gmail.com</p>
              <p className="text-gray-600 text-sm text-center mt-2">Response within 24 hours</p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#0055BF] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-[#1B1B1B] mb-2 text-center">Location</h3>
              <p className="text-[#1B1B1B] text-center">Atlanta, GA</p>
              <p className="text-gray-600 text-sm text-center mt-2">Serving Metro Atlanta</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#0055BF] text-center">Frequently Asked Questions</h2>
            
            {/* FAQ Tabs */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'general'
                      ? 'bg-white text-[#0055BF] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'pricing'
                      ? 'bg-white text-[#0055BF] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Pricing
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'services'
                      ? 'bg-white text-[#0055BF] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Services
                </button>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="space-y-4">
              {faqItems[activeTab as keyof typeof faqItems].map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="font-semibold text-[#1B1B1B] mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#0055BF] text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#1B1B1B] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#1B1B1B] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#1B1B1B] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0055BF] text-white font-semibold text-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {/* Studs - relative to the button */}
                  <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#004494] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#004494] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="text-center text-green-600 mt-4">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-center text-red-600 mt-4">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Get a Quote CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#0055BF]">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">Get a custom quote for your LEGO building project</p>
            <Link 
              href="/get-a-quote" 
              className="group relative inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0055BF] text-white font-semibold text-lg hover:-translate-y-1 active:translate-y-0 transition-transform duration-300"
            >
              Get a Quote
              {/* Studs - relative to the button */}
              <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-4 h-2 bg-[#004494] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-4 h-2 bg-[#004494] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Contact() {
  return (
    <Suspense fallback={<div>Loading contact form...</div>}>
      <ContactContent />
    </Suspense>
  );
} 