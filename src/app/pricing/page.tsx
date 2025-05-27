'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// import PaymentForm from "@/components/PaymentForm"; // We might not need this if we're just doing estimates for now

export default function Pricing() {
  // const [selectedPlan, setSelectedPlan] = useState<{
  //   name: string;
  //   price: number;
  // } | null>(null);

  const [pieceCount, setPieceCount] = useState('');
  const [requestGluing, setRequestGluing] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [deliveryDistance, setDeliveryDistance] = useState('local'); // 'local', 'regional', 'national'

  // Calculate price based on piece count
  const calculatePrice = (pieces: number) => {
    if (pieces <= 200) return 20;
    if (pieces <= 500) return 35;
    if (pieces <= 1000) return 50;
    if (pieces <= 2000) return 75;
    if (pieces <= 3000) return 100;
    if (pieces <= 4000) return 150;
    if (pieces <= 5000) return 200;
    if (pieces <= 6000) return 250;
    if (pieces <= 7000) return 300;
    if (pieces <= 8000) return 350;
    if (pieces <= 9000) return 400;
    return 450;
  };

  // Calculate base delivery price based on piece count
  const calculateBaseDeliveryPrice = (pieces: number) => {
    if (pieces <= 200) return 10;
    if (pieces <= 500) return 15;
    if (pieces <= 1000) return 20;
    if (pieces <= 2000) return 25;
    if (pieces <= 3000) return 30;
    if (pieces <= 4000) return 35;
    if (pieces <= 5000) return 40;
    if (pieces <= 6000) return 45;
    if (pieces <= 7000) return 50;
    if (pieces <= 8000) return 55;
    if (pieces <= 9000) return 60;
    return 65;
  };

  // Calculate distance multiplier
  const getDistanceMultiplier = (distance: string) => {
    switch (distance) {
      case 'local':
        return 1; // Base price
      case 'regional':
        return 2; // Double the base price
      case 'national':
        return 3; // Triple the base price
      default:
        return 1;
    }
  };

  // Calculate final delivery price
  const calculateDeliveryPrice = (pieces: number) => {
    const basePrice = calculateBaseDeliveryPrice(pieces);
    const multiplier = getDistanceMultiplier(deliveryDistance);
    return basePrice * multiplier;
  };

  // Calculate gluing price based on piece count
  const calculateGluingPrice = (pieces: number) => {
    if (pieces <= 200) return 15;
    if (pieces <= 500) return 25;
    if (pieces <= 1000) return 35;
    if (pieces <= 2000) return 45;
    if (pieces <= 3000) return 55;
    if (pieces <= 4000) return 65;
    if (pieces <= 5000) return 75;
    if (pieces <= 6000) return 85;
    if (pieces <= 7000) return 95;
    if (pieces <= 8000) return 105;
    if (pieces <= 9000) return 115;
    return 125;
  };

  const calculateEstimate = () => {
    const count = parseInt(pieceCount);
    if (isNaN(count) || count <= 0) {
      setEstimatedPrice(null);
      return;
    }

    const basePrice = calculatePrice(count);
    const deliveryPrice = calculateDeliveryPrice(count);
    const gluingPrice = requestGluing ? calculateGluingPrice(count) : 0;

    setEstimatedPrice(basePrice + deliveryPrice + gluingPrice);
  };

  return (
    <main className="min-h-screen py-16 relative">
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
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-12 bg-[#0055BF] rounded-md mb-4 relative">
            <div className="absolute -top-2 left-1/4 -translate-x-1/2 w-8 h-4 bg-[#0055BF] rounded-md"></div>
            <div className="absolute -top-2 left-3/4 -translate-x-1/2 w-8 h-4 bg-[#0055BF] rounded-md"></div>
            <div className="absolute -top-1 left-1/4 -translate-x-1/2 w-6 h-2 bg-white/90 rounded-sm"></div>
            <div className="absolute -top-1 left-3/4 -translate-x-1/2 w-6 h-2 bg-white/90 rounded-sm"></div>
          </div>
          <h1 className="text-4xl font-bold text-center mb-2 text-[#0055BF] font-brick bg-white/80 backdrop-blur-sm px-8 py-4 rounded-lg shadow-lg [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Build Pricing Estimates</h1>
          <div className="w-24 h-1 bg-[#D01012] rounded-full mb-6"></div>
        </div>

        {/* Introduction to Pricing */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16">
          <p className="text-lg text-[#1B1B1B] mb-4 text-center">
            We believe in transparent pricing that reflects the care and expertise we put into every build. The calculator below provides a helpful estimate based on piece count, but the final price may vary depending on several factors.
          </p>
          <p className="text-lg text-[#1B1B1B] text-center">
            Our goal is to provide exceptional value and bring your LEGO dreams to life, brick by brick.
          </p>
        </div>

        {/* Pricing Calculator */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16 border-2 border-[#0055BF]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#0055BF]">Build Pricing Calculator</h2>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#0055BF]">Base Build Prices</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Small Sets</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>0-200 pieces: $20</li>
                  <li>201-500 pieces: $35</li>
                  <li>501-1000 pieces: $50</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Medium Sets</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>1001-2000 pieces: $75</li>
                  <li>2001-3000 pieces: $100</li>
                  <li>3001-4000 pieces: $150</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Large Sets</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>4001-5000 pieces: $200</li>
                  <li>5001-6000 pieces: $250</li>
                  <li>6001-7000 pieces: $300</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Extra Large Sets</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>7001-8000 pieces: $350</li>
                  <li>8001-9000 pieces: $400</li>
                  <li>9000+ pieces: $450</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#0055BF]">Delivery Options</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Local Delivery</h4>
                <p className="text-sm text-gray-600 mb-2">Within 25 miles</p>
                <ul className="space-y-2 text-gray-600">
                  <li>0-200 pieces: $10</li>
                  <li>201-500 pieces: $15</li>
                  <li>501-1000 pieces: $20</li>
                  <li>1001-2000 pieces: $25</li>
                  <li>2001+ pieces: $30-65</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Regional Delivery</h4>
                <p className="text-sm text-gray-600 mb-2">25-100 miles</p>
                <ul className="space-y-2 text-gray-600">
                  <li>0-200 pieces: $20</li>
                  <li>201-500 pieces: $30</li>
                  <li>501-1000 pieces: $40</li>
                  <li>1001-2000 pieces: $50</li>
                  <li>2001+ pieces: $60-130</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">National Delivery</h4>
                <p className="text-sm text-gray-600 mb-2">100+ miles</p>
                <ul className="space-y-2 text-gray-600">
                  <li>0-200 pieces: $30</li>
                  <li>201-500 pieces: $45</li>
                  <li>501-1000 pieces: $60</li>
                  <li>1001-2000 pieces: $75</li>
                  <li>2001+ pieces: $90-195</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#0055BF]">Gluing Service</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Gluing Service</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Secure and discreet gluing</li>
                  <li>✓ Ideal for permanent displays</li>
                  <li>✓ Adds durability for transport</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Display Solutions</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Custom display cases</li>
                  <li>✓ Integrated lighting options</li>
                  <li>✓ Dust prevention</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Price Calculator */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-[#0055BF]">Calculate Your Price</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="pieceCount" className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Pieces
                </label>
                <input
                  type="number"
                  id="pieceCount"
                  value={pieceCount}
                  onChange={(e) => setPieceCount(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                  placeholder="Enter piece count"
                />
              </div>
              <div>
                <label htmlFor="deliveryDistance" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Distance
                </label>
                <select
                  id="deliveryDistance"
                  value={deliveryDistance}
                  onChange={(e) => setDeliveryDistance(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                >
                  <option value="local">Local (within 25 miles)</option>
                  <option value="regional">Regional (25-100 miles)</option>
                  <option value="national">National (100+ miles)</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requestGluing"
                  checked={requestGluing}
                  onChange={(e) => setRequestGluing(e.target.checked)}
                  className="h-4 w-4 text-[#0055BF] border-gray-300 rounded focus:ring-[#0055BF]"
                />
                <label htmlFor="requestGluing" className="ml-2 block text-sm font-medium text-gray-700">
                  Include Gluing Service
                </label>
              </div>
              <button
                onClick={calculateEstimate}
                className="w-full bg-[#0055BF] text-white px-6 py-3 rounded-lg hover:bg-[#004494] transition-colors text-lg"
              >
                Calculate Total Price
              </button>
            </div>

            {estimatedPrice !== null && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2 text-[#0055BF]">Price Breakdown</h4>
                <div className="bg-white p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Base Build Price:</p>
                      <p className="text-gray-600">Delivery Fee ({deliveryDistance}):</p>
                      {requestGluing && <p className="text-gray-600">Gluing Service:</p>}
                      <p className="font-bold text-[#0055BF] mt-2">Total Price:</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${calculatePrice(parseInt(pieceCount))}</p>
                      <p className="font-semibold">${calculateDeliveryPrice(parseInt(pieceCount))}</p>
                      {requestGluing && <p className="font-semibold">${calculateGluingPrice(parseInt(pieceCount))}</p>}
                      <p className="font-bold text-[#0055BF] mt-2">${estimatedPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Factors Affecting Pricing */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16 border-2 border-[#D01012]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#D01012]">Factors Affecting Your Quote</h2>
          <p className="text-[#1B1B1B] mb-6 text-center">While piece count is a primary factor, other elements can influence the final cost:</p>
          <ul className="list-disc list-inside space-y-2 text-[#1B1B1B] max-w-2xl mx-auto">
            <li>**Set Complexity:** Intricate builds with many small or unique pieces may require more time and precision.</li>
            <li>**Set Condition:** If the set is used, disassembled incorrectly, or missing pieces, additional sorting and handling time may be needed.</li>
            <li>**Instruction Clarity:** Poorly printed or unclear instructions can increase build time.</li>
            <li>**Special Requests:** Customizations, modifications, or specific building techniques will be factored into the quote.</li>
            <li>**Timeline:** Rush orders requiring a faster turnaround time may incur an additional fee.</li>
          </ul>
        </div>

        {/* Original Pricing Cards (kept for reference/comparison) */}
        {/* You can choose to remove or keep these depending on your design preference */}
        {/* <>
            {/* Pricing Cards */}
            {/* <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center border-2 border-[#0055BF]">
                <h2 className="text-2xl font-bold mb-4 text-[#0055BF]">Small Sets</h2>
                <p className="text-[#1B1B1B] mb-6">(Under 500 pieces)</p>
                <p className="text-4xl font-bold mb-6 text-[#1B1B1B]">Starting at $30</p>
                <p className="text-[#1B1B1B] mb-6">Perfect for smaller models and quick builds.</p>
                <button
                  onClick={() => setSelectedPlan({ name: 'Small Set', price: 30 })}
                  className="lego-yellow px-6 py-2 rounded-full font-semibold"
                >
                  Select Plan
                </button>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center border-2 border-[#D01012]">
                <h2 className="text-2xl font-bold mb-4 text-[#D01012]">Medium Sets</h2>
                <p className="text-[#1B1B1B] mb-6">(500 - 1999 pieces)</p>
                <p className="text-4xl font-bold mb-6 text-[#1B1B1B]">Starting at $50</p>
                <p className="text-[#1B1B1B] mb-6">Great for most standard sized sets and collections.</p>
                <button
                  onClick={() => setSelectedPlan({ name: 'Medium Set', price: 50 })}
                  className="lego-red px-6 py-2 rounded-full font-semibold text-white"
                >
                  Select Plan
                </button>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center border-2 border-[#F7D117]">
                <h2 className="text-2xl font-bold mb-4 text-[#F7D117]">Large Sets</h2>
                <p className="text-[#1B1B1B] mb-6">(2000+ pieces)</p>
                <p className="text-4xl font-bold mb-6 text-[#1B1B1B]">Starting at $100</p>
                <p className="text-[#1B1B1B] mb-6">Ideal for complex models and enthusiast builds.</p>
                <button
                  onClick={() => setSelectedPlan({ name: 'Large Set', price: 100 })}
                  className="lego-yellow px-6 py-2 rounded-full font-semibold"
                >
                  Select Plan
                </button>
              </div>
            </div> */}

            {/* Additional Services */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16 border-2 border-[#0055BF]">
              <h2 className="text-3xl font-bold mb-6 text-center text-[#0055BF]">Additional Services</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#1B1B1B]">Gluing Service</h3>
                  <p className="text-[#1B1B1B] mb-4">Ensure your completed set stays together permanently with our professional gluing service. Perfect for display pieces in high-traffic areas or for transport.</p>
                  <ul className="space-y-2 text-[#1B1B1B]">
                    <li>✓ Secure and discreet gluing</li>
                    <li>✓ Ideal for permanent displays</li>
                    <li>✓ Adds durability for transport</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-[#1B1B1B]">Display Solutions</h3>
                  <p className="text-[#1B1B1B] mb-4">We offer a range of display solutions to showcase your built sets beautifully and keep them dust-free. From custom cases to lighting, we can help your collection shine.</p>
                  <ul className="space-y-2 text-[#1B1B1B]">
                    <li>✓ Custom display cases</li>
                    <li>✓ Integrated lighting options</li>
                    <li>✓ Dust prevention</li>
                  </ul>
                </div>
              </div>
            </div>
          {/* </>
        )} */}

        <div className="text-center">
          <p className="text-lg mb-6 text-[#1B1B1B] font-semibold">Ready to get your LEGO set built? Contact us for a custom quote!</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="lego-yellow px-8 py-3 rounded-full font-semibold text-lg">Request a Quote</Link>
            <Link href="/order" className="lego-blue px-8 py-3 rounded-full font-semibold text-lg text-white">Order Now</Link>
          </div>
        </div>
      </div>
    </main>
  );
} 