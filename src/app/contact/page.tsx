"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const serviceOptions = [
  { value: "assembly", label: "Expert Assembly" },
  { value: "pickup-delivery", label: "Local Pickup & Delivery" },
  { value: "on-site", label: "On-site Building" },
  { value: "display-prep", label: "Display Solutions" },
];

export default function Contact() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    setSize: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        setSize: '',
        message: '',
      });
    } catch {
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
          <h1 className="text-4xl font-bold text-center mb-2 text-[#0055BF] font-brick bg-white/80 backdrop-blur-sm px-8 py-4 rounded-lg shadow-lg [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Contact Us</h1>
          <div className="w-24 h-1 bg-[#D01012] rounded-full mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-center text-[#1B1B1B] mb-12">
            Ready to bring your LEGO dreams to life? Fill out the form below and we&apos;ll get back to you within 12 hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8">
            {submitStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#0055BF] mb-2">Thank You!</h2>
                <p className="text-[#1B1B1B] mb-6">We&apos;ve received your request and will contact you shortly.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="bg-[#0055BF] text-white px-6 py-3 rounded-lg hover:bg-[#004494] transition-colors"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1B1B1B] mb-2">
                      Your Name *
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
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                    <label htmlFor="service" className="block text-sm font-medium text-[#1B1B1B] mb-2">
                      Service Type *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="setSize" className="block text-sm font-medium text-[#1B1B1B] mb-2">
                    Set Size (if applicable)
                  </label>
                  <select
                    id="setSize"
                    name="setSize"
                    value={formData.setSize}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                  >
                    <option value="">Select set size</option>
                    <option value="small">Small (Under 500 pieces)</option>
                    <option value="medium">Medium (500-1999 pieces)</option>
                    <option value="large">Large (2000+ pieces)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1B1B1B] mb-2">
                    Additional Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                    placeholder="Tell us about your LEGO project..."
                  ></textarea>
                </div>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    There was an error submitting your request. Please try again.
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-[#0055BF] text-white px-8 py-4 rounded-lg hover:bg-[#004494] transition-colors text-lg min-w-[200px] ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Request'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-[#0055BF] mb-4">Other Ways to Reach Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 bg-[#0055BF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-[#1B1B1B] mb-2">Phone</h3>
                <p className="text-[#1B1B1B]">(555) 123-4567</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 bg-[#0055BF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-[#1B1B1B] mb-2">Email</h3>
                <p className="text-[#1B1B1B]">contact@legobuilders.com</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6">
                <div className="w-12 h-12 bg-[#0055BF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-[#1B1B1B] mb-2">Location</h3>
                <p className="text-[#1B1B1B]">Atlanta, GA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 