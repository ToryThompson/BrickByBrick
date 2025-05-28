"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

interface Location {
  address: string;
  distance: number;
}

export default function HowItWorks() {
  const [pieceCount, setPieceCount] = useState('');
  const [requestGluing, setRequestGluing] = useState<'none' | 'permanent' | 'dissolvable'>('none');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState('local'); // 'local' or 'shipping' or 'pickup'
  const [miles, setMiles] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [distanceError, setDistanceError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LegoSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<LegoSet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);

  // Calculate price based on piece count
  const calculatePrice = (pieces: number) => {
    if (pieces <= 200) return 30;
    if (pieces <= 500) return 50;
    if (pieces <= 1000) return 100;
    if (pieces <= 2000) return 150;
    if (pieces <= 3000) return 200;
    if (pieces <= 4000) return 250;
    if (pieces <= 5000) return 300;
    if (pieces <= 6000) return 350;
    if (pieces <= 7000) return 400;
    if (pieces <= 8000) return 450;
    if (pieces <= 9000) return 500;
    return 550;
  };

  // Calculate gluing price based on piece count and type
  const calculateGluingPrice = (pieces: number, gluingType: 'permanent' | 'dissolvable') => {
    const basePrice = gluingType === 'permanent' ? 1.5 : 1; // 50% more for permanent gluing
    if (pieces <= 200) return Math.round(15 * basePrice);
    if (pieces <= 500) return Math.round(25 * basePrice);
    if (pieces <= 1000) return Math.round(35 * basePrice);
    if (pieces <= 2000) return Math.round(45 * basePrice);
    if (pieces <= 3000) return Math.round(55 * basePrice);
    if (pieces <= 4000) return Math.round(65 * basePrice);
    if (pieces <= 5000) return Math.round(75 * basePrice);
    if (pieces <= 6000) return Math.round(85 * basePrice);
    if (pieces <= 7000) return Math.round(95 * basePrice);
    if (pieces <= 8000) return Math.round(105 * basePrice);
    if (pieces <= 9000) return Math.round(115 * basePrice);
    return Math.round(125 * basePrice);
  };

  // Calculate local delivery price based on piece count and miles
  const calculateLocalDeliveryPrice = (pieces: number, distance: number) => {
    // Base delivery price based on piece count
    let basePrice = 0;
    if (pieces <= 200) basePrice = 10;
    else if (pieces <= 500) basePrice = 15;
    else if (pieces <= 1000) basePrice = 20;
    else if (pieces <= 2000) basePrice = 25;
    else if (pieces <= 3000) basePrice = 30;
    else if (pieces <= 4000) basePrice = 35;
    else if (pieces <= 5000) basePrice = 40;
    else if (pieces <= 6000) basePrice = 45;
    else if (pieces <= 7000) basePrice = 50;
    else if (pieces <= 8000) basePrice = 55;
    else if (pieces <= 9000) basePrice = 60;
    else basePrice = 65;

    // Add $1.50 per mile after the first 5 miles
    const milesCharge = Math.max(0, distance - 5) * 1.50;
    
    return basePrice + milesCharge;
  };

  // Calculate shipping price based on piece count
  const calculateShippingPrice = (pieces: number) => {
    if (pieces <= 200) return 25;
    if (pieces <= 500) return 35;
    if (pieces <= 1000) return 45;
    if (pieces <= 2000) return 65;
    if (pieces <= 3000) return 85;
    if (pieces <= 4000) return 105;
    if (pieces <= 5000) return 125;
    if (pieces <= 6000) return 145;
    if (pieces <= 7000) return 165;
    if (pieces <= 8000) return 185;
    if (pieces <= 9000) return 205;
    return 225;
  };

  // Calculate distance using Google Maps Distance Matrix API
  const calculateDistance = async () => {
    if (!userAddress) {
      setDistanceError('Please enter your address');
      return;
    }

    setIsCalculatingDistance(true);
    setDistanceError(null);
    setDeliveryCost(null);

    try {
      const response = await fetch(`/api/calculate-distance?address=${encodeURIComponent(userAddress)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate delivery cost');
      }

      setDeliveryCost(data.deliveryCost);
    } catch (error) {
      console.error('Error calculating delivery cost:', error);
      setDistanceError(error instanceof Error ? error.message : 'Failed to calculate delivery cost');
    } finally {
      setIsCalculatingDistance(false);
    }
  };

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
    if (requestGluing !== 'none') {
      // $50 per 1000 pieces, rounded up to the nearest thousand
      gluingCost = Math.ceil(count / 1000) * 50;
    }

    setEstimatedPrice(basePrice + gluingCost);
  };

  // Calculate total price including all services
  const calculateTotalPrice = (pieces: number) => {
    const basePrice = calculatePrice(pieces);
    let deliveryPrice = 0;
    
    if (deliveryMethod === 'shipping') {
      deliveryPrice = calculateShippingPrice(pieces);
    } else if (deliveryCost !== null) {
      deliveryPrice = deliveryCost;
    }
    
    const gluingPrice = requestGluing !== 'none' ? calculateGluingPrice(pieces, requestGluing) : 0;
    
    return {
      basePrice,
      deliveryPrice,
      gluingPrice,
      total: basePrice + deliveryPrice + gluingPrice
    };
  };

  // Handle search with API
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

  // Handle set selection
  const handleSetSelect = (set: LegoSet) => {
    setSelectedSet(set);
    setPieceCount(set.num_parts.toString());
    setSearchResults([]);
    setSearchQuery(set.name);
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
        <div className="flex flex-col items-center mb-2">
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

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-[#0055BF]">
            <div className="text-4xl mb-4 text-center">1️⃣</div>
            <h3 className="text-xl font-bold mb-4 text-center text-[#0055BF]">Choose Your Set</h3>
            <p className="text-gray-600">Start by telling us about the LEGO set you want built. You can provide the official set number or the name of the set. If you have any specific requests or modifications in mind, please include those details as well. This helps us understand your vision for the completed build.</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-[#0055BF]">
            <div className="text-4xl mb-4 text-center">2️⃣</div>
            <h3 className="text-xl font-bold mb-4 text-center text-[#0055BF]">We Build It</h3>
            <p className="text-gray-600">Our experienced builders will carefully and precisely assemble your LEGO set according to the official instructions or any custom requirements you provided. We handle all the sorting, building, and quality checks to ensure your set is perfect and ready for display or play.</p>
          </div>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border-2 border-[#0055BF]">
            <div className="text-4xl mb-4 text-center">3️⃣</div>
            <h3 className="text-xl font-bold mb-4 text-center text-[#0055BF]">Delivery</h3>
            <p className="text-gray-600">Once your LEGO set is expertly built and has passed our quality inspection, we will arrange for its delivery. You can choose from local delivery options or shipping, depending on your location. We ensure your completed masterpiece is packaged securely to arrive in perfect condition.</p>
          </div>
        </div>

        {/* Minifig Section - Hidden on Mobile */}
        <div className="hidden md:flex justify-center items-center mb-8">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-lg border-2 border-[#0055BF] max-w-2xl">
            <div className="flex flex-col items-center gap-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4 text-[#0055BF]">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">Let us bring your LEGO dreams to life. Contact us today!</p>
                <Link
                  href="/contact"
                  className="inline-block bg-[#0055BF] text-white px-8 py-3 rounded-lg hover:bg-[#004494] transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 border-2 border-[#0055BF]">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#0055BF]">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#0055BF]">How long does it take to build a set?</h3>
              <p className="text-gray-600">Build times vary based on the size and complexity of the set. Small sets (under 500 pieces) typically take 1-2 days, medium sets (500-2000 pieces) take 2-4 days, and large sets (2000+ pieces) can take 4-7 days. We'll provide a specific timeline when you request a quote.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#0055BF]">Do you provide the LEGO sets?</h3>
              <p className="text-gray-600">No, we don't provide the LEGO sets. You'll need to purchase the set you want built. We can help you find the set you're looking for and provide guidance on where to purchase it.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#0055BF]">What happens if pieces are missing?</h3>
              <p className="text-gray-600">We carefully inventory all pieces before starting the build. If any pieces are missing, we'll notify you immediately and can order replacement parts for you. The cost of replacement parts will be added to your final bill.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#0055BF]">What gluing options do you offer?</h3>
              <p className="text-gray-600">We offer two gluing options: permanent glue for display pieces that won't be disassembled, and dissolvable glue that can be removed with warm water if you want to rebuild the set later. Both options use professional-grade glue that's safe for LEGO pieces.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#0055BF]">How do you ensure quality?</h3>
              <p className="text-gray-600">We follow a strict quality control process: careful sorting, step-by-step building following official instructions, thorough inspection for missing pieces, and final quality check. We also take photos during the build process so you can see the progress.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#0055BF]">What's included in the price?</h3>
              <p className="text-gray-600">The price includes professional assembly, quality control, and secure packaging. Additional services like gluing, custom display solutions, and delivery/shipping are priced separately. We'll provide a detailed quote that breaks down all costs.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#0055BF]">How do you handle shipping?</h3>
              <p className="text-gray-600">We use professional packaging materials and techniques to ensure your built set arrives safely. Sets are carefully wrapped and secured in custom boxes. We provide tracking information and can arrange for special handling if needed.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#0055BF]">What comes in my package?</h3>
              <p className="text-gray-600">Your package includes:</p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Your fully assembled LEGO set</li>
                <li>Original instruction manual</li>
                <li>Any extra pieces that came with the set</li>
                <li>Care instructions for your built set</li>
                <li>Tracking information for your shipment</li>
              </ul>
              <p className="text-gray-600 mt-2">Note: The original box will only be included if specifically requested during your order.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-[#0055BF]">Can you build custom LEGO creations?</h3>
              <p className="text-gray-600">Yes! We can help bring your custom LEGO ideas to life. This includes modifications to existing sets or completely original designs. Custom builds require additional planning and may have different pricing. Contact us to discuss your ideas.</p>
            </div>
          </div>
        </div>

        {/* Price Calculator - Moved to bottom */}
        <div className="mt-16 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 border-2 border-[#0055BF]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#0055BF]">Get a Price Estimate</h2>
          
          {/* Search Input */}
          <div className="relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by set name or number (e.g., 'Star Destroyer' or '75252')"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
            />
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0055BF]"></div>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="mt-2 text-red-600 text-sm">
                {error}
              </div>
            )}
            
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                {searchResults.map((set) => (
                  <button
                    key={set.set_num}
                    onClick={() => handleSetSelect(set)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-4"
                  >
                    {set.set_img_url && (
                      <img
                        src={set.set_img_url}
                        alt={set.name}
                        className="w-16 h-16 object-contain bg-gray-50 rounded"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{set.name}</div>
                      <div className="text-sm text-gray-600">
                        Set #{set.set_num} • {set.num_parts} pieces • {set.year}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {searchQuery.length >= 2 && !isLoading && !error && searchResults.length === 0 && !selectedSet && (
              <div className="mt-2 text-gray-600 text-sm">
                No LEGO sets found. Try a different search term.
              </div>
            )}
          </div>

          {/* Selected Set Info */}
          {selectedSet && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                {selectedSet.set_img_url && (
                  <img
                    src={selectedSet.set_img_url}
                    alt={selectedSet.name}
                    className="w-32 h-32 object-contain bg-white rounded-lg shadow-sm"
                  />
                )}
                <div>
                  <h3 className="font-bold text-lg mb-2">{selectedSet.name}</h3>
                  <p className="text-gray-600">
                    Set #{selectedSet.set_num} • {selectedSet.num_parts} pieces • Released {selectedSet.year}
                  </p>
                  <a
                    href={selectedSet.set_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0055BF] hover:underline text-sm mt-2 inline-block"
                  >
                    View Set Details →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Manual Piece Count Input */}
          <div className="mb-6">
            <label htmlFor="pieceCount" className="block text-sm font-medium text-gray-700 mb-2">
              Or enter piece count manually:
            </label>
            <input
              type="number"
              id="pieceCount"
              value={pieceCount}
              onChange={(e) => setPieceCount(e.target.value)}
              placeholder="Enter number of pieces"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
            />
          </div>

          {/* Delivery Options */}
          <div className="mb-6">
            <label htmlFor="deliveryMethod" className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Method
            </label>
            <select
              id="deliveryMethod"
              value={deliveryMethod}
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent mb-4"
            >
              <option value="pickup">Pickup</option>
              <option value="local">Local Delivery</option>
              <option value="shipping">Shipping (USPS/UPS/FedEx)</option>
            </select>

            {deliveryMethod === 'local' && (
              <div className="mt-4">
                <div className="mb-4">
                  <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Address
                  </label>
                  <input
                    type="text"
                    id="userAddress"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    placeholder="Enter your full address"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                  />
                  {distanceError && (
                    <p className="mt-2 text-sm text-red-600">{distanceError}</p>
                  )}
                </div>
              </div>
            )}

            {deliveryMethod === 'pickup' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-[#0055BF]">Pickup Information</h4>
                <p className="text-gray-600 mb-4">
                  You can pick up your completed LEGO set from our location in McDonough, GA. We'll contact you when your set is ready for pickup.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• No additional delivery charges</li>
                  <li>• Flexible pickup times</li>
                  <li>• Safe and secure pickup location</li>
                  <li>• Quality check before pickup</li>
                </ul>
              </div>
            )}
          </div>

          {/* Gluing Option */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gluing Options</label>
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="radio"
                  id="noGluing"
                  checked={requestGluing === 'none'}
                  onChange={() => setRequestGluing('none')}
                  className="h-4 w-4 mt-1 text-[#0055BF] border-gray-300 focus:ring-[#0055BF]"
                />
                <label htmlFor="noGluing" className="ml-2 block">
                  <span className="text-sm font-medium text-gray-700">No Gluing</span>
                  <p className="text-sm text-gray-600">Keep your set unglued for future rebuilding or modifications.</p>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="radio"
                  id="permanentGluing"
                  checked={requestGluing === 'permanent'}
                  onChange={() => setRequestGluing('permanent')}
                  className="h-4 w-4 mt-1 text-[#0055BF] border-gray-300 focus:ring-[#0055BF]"
                />
                <label htmlFor="permanentGluing" className="ml-2 block">
                  <span className="text-sm font-medium text-gray-700">Permanent Gluing (+ $75 per 1000 pieces)</span>
                  <p className="text-sm text-gray-600">Perfect for display pieces that won't be disassembled. Uses professional-grade glue that's safe for LEGO pieces.</p>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="radio"
                  id="dissolvableGluing"
                  checked={requestGluing === 'dissolvable'}
                  onChange={() => setRequestGluing('dissolvable')}
                  className="h-4 w-4 mt-1 text-[#0055BF] border-gray-300 focus:ring-[#0055BF]"
                />
                <label htmlFor="dissolvableGluing" className="ml-2 block">
                  <span className="text-sm font-medium text-gray-700">Dissolvable Gluing (+ $50 per 1000 pieces)</span>
                  <p className="text-sm text-gray-600">Can be removed with warm water if you want to rebuild the set later. Great for temporary displays or sets you might want to modify.</p>
                </label>
              </div>
            </div>
          </div>

          {/* Calculate Price Button */}
          <div className="mb-6">
            <button
              onClick={calculateDistance}
              disabled={isCalculatingDistance || (deliveryMethod === 'local' && !userAddress)}
              className="w-full bg-[#0055BF] text-white px-6 py-3 rounded-lg hover:bg-[#004494] transition-colors disabled:opacity-50 text-lg"
            >
              {isCalculatingDistance ? 'Estimating...' : 'Estimate Total Price'}
            </button>
          </div>

          {/* Price Estimate */}
          {pieceCount && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-[#0055BF]">Price Estimate</h3>
              {selectedSet && (
                <div className="mb-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">Selected Set:</span> {selectedSet.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Piece Count:</span> {selectedSet.num_parts}
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Base Price:</span>
                  <span>${calculatePrice(parseInt(pieceCount))}</span>
                </p>
                {deliveryMethod === 'local' && (
                  <p className="flex justify-between">
                    <span>Delivery:</span>
                    <span>
                      {deliveryCost !== null ? (
                        `$${deliveryCost}`
                      ) : (
                        'Get estimate'
                      )}
                    </span>
                  </p>
                )}
                {deliveryMethod === 'shipping' && (
                  <p className="flex justify-between">
                    <span>Shipping:</span>
                    <span>Contact for quote</span>
                  </p>
                )}
                {requestGluing !== 'none' && (
                  <p className="flex justify-between">
                    <span>Gluing Service:</span>
                    <span>${calculateGluingPrice(parseInt(pieceCount), requestGluing as 'permanent' | 'dissolvable')}</span>
                  </p>
                )}
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <p className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>
                      {deliveryMethod === 'local' ? (
                        deliveryCost !== null ? (
                          `$${calculateTotalPrice(parseInt(pieceCount)).total}`
                        ) : (
                          'Get estimate'
                        )
                      ) : deliveryMethod === 'pickup' ? (
                        `$${calculatePrice(parseInt(pieceCount)) + (requestGluing !== 'none' ? calculateGluingPrice(parseInt(pieceCount), requestGluing as 'permanent' | 'dissolvable') : 0)}`
                      ) : (
                        'Contact for shipping quote'
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {deliveryMethod === 'shipping' && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-[#0055BF]">Shipping Information</h4>
              <p className="text-gray-600 mb-4">
                Shipping costs will be calculated and provided with your quote based on your location and the size of your set.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Professional packaging and handling</li>
                <li>• Insurance included</li>
                <li>• Tracking number provided</li>
                <li>• Standard delivery: 3-7 business days</li>
                <li>• Rush delivery available (1-2 business days)</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 