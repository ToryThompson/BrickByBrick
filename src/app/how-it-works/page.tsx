"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HowItWorks() {
  const [pieceCount, setPieceCount] = useState('');
  const [requestGluing, setRequestGluing] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const calculateEstimate = () => {
    const count = parseInt(pieceCount);
    if (isNaN(count) || count <= 0) {
      setEstimatedPrice(null);
      return;
    }

    let basePrice = 0;
    // Define base pricing based on piece count ranges
    if (count < 500) {
      basePrice = 30; // Small set pricing
    } else if (count >= 500 && count < 2000) {
      basePrice = 50; // Medium set pricing
    } else {
      basePrice = 100; // Large set pricing
    }

    let gluingCost = 0;
    if (requestGluing) {
      // $50 per 1000 pieces, rounded up to the nearest thousand
      gluingCost = Math.ceil(count / 1000) * 50;
    }

    setEstimatedPrice(basePrice + gluingCost);
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
          <h1 className="text-4xl font-bold text-center mb-2 text-[#0055BF] font-brick bg-white/80 backdrop-blur-sm px-8 py-4 rounded-lg shadow-lg [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">How It Works</h1>
          <div className="w-24 h-1 bg-[#D01012] rounded-full mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-center text-[#1B1B1B] mb-12">
            From request to delivery, we make building your LEGO dreams simple and enjoyable. Follow our step-by-step process below.
          </p>
        </div>

        {/* Pricing Calculator (Copied from Pricing page) */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16 max-w-md mx-auto relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#0055BF]">Get an Estimate</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="pieceCount" className="block text-sm font-medium text-[#1B1B1B] mb-2">Number of Pieces *</label>
              <input
                type="number"
                id="pieceCount"
                value={pieceCount}
                onChange={(e) => setPieceCount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                placeholder="e.g. 1500"
                min="1"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requestGluing"
                checked={requestGluing}
                onChange={(e) => setRequestGluing(e.target.checked)}
                className="h-4 w-4 text-[#0055BF] border-gray-300 rounded focus:ring-[#0055BF]"
              />
              <label htmlFor="requestGluing" className="ml-2 block text-sm font-medium text-[#1B1B1B]">
                Request Gluing (+ $50 per 1000 pieces)
              </label>
            </div>
            <button
              onClick={calculateEstimate}
              className="w-full bg-[#0055BF] text-white px-6 py-3 rounded-lg hover:bg-[#004494] transition-colors text-lg"
            >
              Calculate Estimate
            </button>
          </div>

          {estimatedPrice !== null && (
            <div className="mt-6 text-center text-2xl font-bold text-[#1B1B1B]">
              Estimated Price: ${estimatedPrice}
            </div>
          )}
        </div>

        {/* Main content area with side image */}
        <div className="flex flex-col md:flex-row gap-12 relative z-10">

          {/* Steps column */}
          <div className="md:w-2/3 max-w-4xl mx-auto space-y-16">
            {/* Step 1 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-2 border-[#0055BF]">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#0055BF] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4">1</div>
                  <h2 className="text-3xl font-bold font-brick text-[#0055BF] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">Submit Your Request</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[#1B1B1B] text-lg mb-6">
                      Getting started is easy! Fill out our simple request form with details about your LEGO set. 
                      Choose your preferred service (pickup, delivery, or on-site) and any extras like gluing or rush turnaround.
                    </p>
                    <ul className="space-y-3 text-[#1B1B1B]">
                      <li className="flex items-start">
                        <span className="text-[#0055BF] mr-2">✓</span>
                        <span>Set model number and name</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#0055BF] mr-2">✓</span>
                        <span>Preferred service type</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#0055BF] mr-2">✓</span>
                        <span>Additional services needed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#0055BF] mr-2">✓</span>
                        <span>Timeline requirements</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#F7D117]/10 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-[#0055BF]">What We Need:</h3>
                    <ul className="space-y-3 text-[#1B1B1B]">
                      <li>• Set instructions (if available)</li>
                      <li>• Any special display requirements</li>
                      <li>• Preferred contact method</li>
                      <li>• Any specific concerns or requests</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6">
                  <Link href="/contact" className="inline-block bg-[#0055BF] text-white px-6 py-3 rounded-lg hover:bg-[#004494] transition-colors">
                    Start Your Request
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-2 border-[#0055BF]">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#0055BF] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4">2</div>
                  <h2 className="text-3xl font-bold font-brick text-[#0055BF] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">We Reach Out to Confirm</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[#1B1B1B] text-lg mb-6">
                      Within 24 hours, we&apos;ll contact you to confirm your quote and timeline. We&apos;ll discuss pickup/delivery details 
                      and answer any questions you might have. Our goal is to make sure everything is perfectly clear before we begin.
                    </p>
                    <ul className="space-y-3 text-[#1B1B1B]">
                      <li className="flex items-start">
                        <span className="text-[#0055BF] mr-2">✓</span>
                        <span>Detailed quote and timeline</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#0055BF] mr-2">✓</span>
                        <span>Service confirmation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#0055BF] mr-2">✓</span>
                        <span>Pickup/delivery arrangements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#0055BF] mr-2">✓</span>
                        <span>Payment details</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#F7D117]/10 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-[#0055BF]">What to Expect:</h3>
                    <ul className="space-y-3 text-[#1B1B1B]">
                      <li>• Quick response time</li>
                      <li>• Clear communication</li>
                      <li>• Flexible scheduling</li>
                      <li>• Professional service</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-2 border-[#0055BF]">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#0055BF] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4">3</div>
                  <h2 className="text-3xl font-bold font-brick text-[#0055BF] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">We Build It</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[#1B1B1B] text-lg mb-6">
                      Your set is professionally assembled with care and attention to detail. Whether it&apos;s a small collectible 
                      or a massive display piece, we treat every build like a masterpiece.
                    </p>
                    <div className="space-y-4">
                      <div className="bg-[#F7D117]/10 p-4 rounded-lg">
                        <h3 className="font-bold mb-2 text-[#0055BF]">Our Building Process:</h3>
                        <ul className="space-y-2 text-[#1B1B1B]">
                          <li>✓ Careful sorting and organizing</li>
                          <li>✓ Precise instruction following</li>
                          <li>✓ Quality checking at each stage</li>
                          <li>✓ Secure assembly</li>
                          <li>✓ Final inspection</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-8">
                    <div className="bg-[#F7D117]/10 p-6 rounded-lg">
                      <h3 className="font-bold text-lg mb-4 text-[#0055BF]">Quality Guarantee:</h3>
                      <ul className="space-y-3 text-[#1B1B1B]">
                        <li>• Multiple quality checks</li>
                        <li>• Attention to detail</li>
                        <li>• Professional assembly</li>
                        <li>• Sturdy construction</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-2 border-[#0055BF]">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#0055BF] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4">4</div>
                  <h2 className="text-3xl font-bold font-brick text-[#0055BF] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">Delivery or Pickup</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[#1B1B1B] text-lg mb-6">
                      We coordinate a smooth handoff of your completed set. You have the flexibility to choose how your build is handled: either send your set to us for professional building and delivery, or opt for our on-site service where we come to your location! Choose from pickup at our location, local delivery, or on-site building (available by request).
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-[#F7D117]/10 p-4 rounded-lg">
                        <h3 className="font-bold mb-2 text-[#0055BF]">Pickup</h3>
                        <p className="text-[#1B1B1B]">Drop off and collect your set from our location at your convenience.</p>
                      </div>
                      <div className="bg-[#F7D117]/10 p-4 rounded-lg">
                        <h3 className="font-bold mb-2 text-[#0055BF]">Delivery</h3>
                        <p className="text-[#1B1B1B]">Send your set to us (or have a new set shipped directly), we'll build it, and then deliver the completed masterpiece back to your local address.</p>
                      </div>
                      <div className="bg-[#F7D117]/10 p-4 rounded-lg">
                        <h3 className="font-bold mb-2 text-[#0055BF]">On-site</h3>
                        <p className="text-[#1B1B1B]">We come to your location to build your set, perfect for events or convenience.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F7D117]/10 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-[#0055BF]">Delivery Options:</h3>
                    <ul className="space-y-3 text-[#1B1B1B]">
                      <li>• Safe packaging</li>
                      <li>• Careful handling</li>
                      <li>• Flexible scheduling</li>
                      <li>• Professional delivery</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 border-2 border-[#0055BF]">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-[#0055BF] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mr-4">5</div>
                  <h2 className="text-3xl font-bold font-brick text-[#0055BF] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">Enjoy Your Completed Set</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-[#1B1B1B] text-lg mb-6">
                      That&apos;s it! Your LEGO masterpiece is ready to display, gift, or enjoy. We&apos;re here for ongoing support 
                      with maintenance, repairs, or modifications.
                    </p>
                    <div className="bg-[#F7D117]/10 p-6 rounded-lg">
                      <h3 className="font-bold text-xl mb-4 text-[#0055BF]">After-Service Support</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-[#0055BF]">Maintenance Services:</h4>
                          <ul className="text-[#1B1B1B] space-y-2">
                            <li>• Regular cleaning</li>
                            <li>• Repairs and fixes</li>
                            <li>• Modifications</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-[#0055BF]">Display Solutions:</h4>
                          <ul className="text-[#1B1B1B] space-y-2">
                            <li>• Custom display cases</li>
                            <li>• Mounting options</li>
                            <li>• Lighting solutions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F7D117]/10 p-6 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-[#0055BF]">Customer Benefits:</h3>
                    <ul className="space-y-3 text-[#1B1B1B]">
                      <li>• Professional assembly</li>
                      <li>• Quality guarantee</li>
                      <li>• Ongoing support</li>
                      <li>• Satisfaction guaranteed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold mb-6 font-brick text-[#0055BF] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">Ready to Get Started?</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/contact" className="bg-[#0055BF] text-white px-8 py-4 rounded-lg hover:bg-[#004494] transition-colors text-lg">
                  Start Your Build
                </Link>
                <Link href="/pricing" className="bg-[#F7D117] text-[#1B1B1B] px-8 py-4 rounded-lg hover:bg-[#E6C615] transition-colors text-lg">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>

          {/* Image column (visible on medium screens and up) */}
          <div className="md:w-1/3 flex justify-center order-first md:order-last sticky top-28 self-start">
            <div className="flex flex-col items-center gap-6">
              <Image
                src="/images/backgrounds/ChatGPT Image May 26, 2025, 06_17_43 PM.png"
                alt="LEGO Builder Character"
                width={400}
                height={600}
                className="rounded-lg shadow-lg max-h-[80vh] object-contain"
              />
              <Link
                href="/contact"
                className="bg-[#F7D117] text-[#1B1B1B] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#E6C615] transition-colors shadow-lg hover:shadow-xl text-center"
              >
                Get Your Build Started!
              </Link>
            </div>
          </div>

        </div> {/* Close main content flex container */}
      </div>
    </div>
  );
} 