'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
// import PaymentForm from "@/components/PaymentForm"; // We might not need this if we're just doing estimates for now

interface Location {
  address: string;
  distance: number;
}

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

export default function Pricing() {
  // const [selectedPlan, setSelectedPlan] = useState<{
  //   name: string;
  //   price: number;
  // } | null>(null);

  const [pieceCount, setPieceCount] = useState('');
  const [requestGluing, setRequestGluing] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [deliveryDistance, setDeliveryDistance] = useState('local'); // 'local', 'regional', 'national'
  const [userAddress, setUserAddress] = useState('');
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [distanceError, setDistanceError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LegoSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<LegoSet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [miles, setMiles] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('local');

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

  // Calculate local delivery price based on piece count and distance
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

  // Calculate total price including all services
  const calculateTotalPrice = (pieces: number) => {
    const basePrice = calculatePrice(pieces);
    let deliveryPrice = 0;
    
    if (deliveryMethod === 'shipping') {
      deliveryPrice = calculateShippingPrice(pieces);
    } else {
      deliveryPrice = calculateLocalDeliveryPrice(pieces, calculatedDistance || 0);
    }
    
    const gluingPrice = requestGluing ? calculateGluingPrice(pieces) : 0;
    
    return {
      basePrice,
      deliveryPrice,
      gluingPrice,
      total: basePrice + deliveryPrice + gluingPrice
    };
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

  // Calculate distance using Google Maps Distance Matrix API
  const calculateDistance = async () => {
    if (!userAddress) {
      setDistanceError('Please enter your address');
      return;
    }

    setIsCalculatingDistance(true);
    setDistanceError(null);

    try {
      const response = await fetch(`/api/calculate-distance?address=${encodeURIComponent(userAddress)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate distance');
      }

      setCalculatedDistance(data.distance);
      setMiles(data.distance.toString());
    } catch (error) {
      console.error('Error calculating distance:', error);
      setDistanceError(error instanceof Error ? error.message : 'Failed to calculate distance');
    } finally {
      setIsCalculatingDistance(false);
    }
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
            This calculator provides an estimate based on piece count and delivery options. Final pricing may vary based on set complexity, special requirements, and other factors.
          </p>
          <p className="text-lg text-[#1B1B1B] text-center">
            For a precise quote tailored to your specific needs, please contact us directly.
          </p>
        </div>

        {/* LEGO Set Search and Price Calculator */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-16 border-2 border-[#0055BF]">
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
            {searchQuery.length >= 2 && !isLoading && !error && searchResults.length === 0 && (
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
              <option value="local">Local Delivery</option>
              <option value="shipping">Shipping (USPS/UPS/FedEx)</option>
            </select>

            {deliveryMethod === 'local' && (
              <div className="mt-4">
                <div className="mb-4">
                  <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Address
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="userAddress"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                      placeholder="Enter your full address"
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0055BF] focus:border-transparent"
                    />
                    <button
                      onClick={calculateDistance}
                      disabled={isCalculatingDistance}
                      className="bg-[#0055BF] text-white px-4 py-2 rounded-lg hover:bg-[#004494] transition-colors disabled:opacity-50"
                    >
                      {isCalculatingDistance ? 'Calculating...' : 'Calculate Distance'}
                    </button>
                  </div>
                  {distanceError && (
                    <p className="mt-2 text-sm text-red-600">{distanceError}</p>
                  )}
                  {calculatedDistance && (
                    <p className="mt-2 text-sm text-gray-600">
                      Calculated distance: {calculatedDistance} miles
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-600">
                    *First 5 miles included in base price. Additional miles charged at $1.50 per mile.
                  </p>
                </div>
              </div>
            )}

            {deliveryMethod === 'shipping' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-[#0055BF]">Shipping Information</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Professional packaging and handling</li>
                  <li>• Insurance included</li>
                  <li>• Tracking number provided</li>
                  <li>• Estimated delivery time: 3-7 business days</li>
                </ul>
              </div>
            )}
          </div>

          {/* Gluing Service Option */}
          <div className="mb-6">
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
          </div>

          {/* Calculate Button */}
          <div className="mb-6">
            <button
              onClick={calculateEstimate}
              className="w-full bg-[#0055BF] text-white px-6 py-3 rounded-lg hover:bg-[#004494] transition-colors text-lg"
            >
              Calculate Estimated Price
            </button>
          </div>

          {/* Price Estimate */}
          {estimatedPrice !== null && (
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#0055BF] mb-4">Estimated Price Breakdown</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-600">Estimated Build Price:</p>
                    <p className="text-gray-600">
                      {deliveryMethod === 'shipping' ? 'Estimated Shipping Fee:' : 'Estimated Delivery Fee:'}
                    </p>
                    {requestGluing && <p className="text-gray-600">Estimated Gluing Service:</p>}
                    <p className="font-bold text-[#0055BF] mt-2">Estimated Total Price:</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${calculatePrice(parseInt(pieceCount))}</p>
                    <p className="font-semibold">
                      ${deliveryMethod === 'shipping' 
                        ? calculateShippingPrice(parseInt(pieceCount))
                        : calculateLocalDeliveryPrice(parseInt(pieceCount), calculatedDistance || 0)}
                    </p>
                    {requestGluing && <p className="font-semibold">${calculateGluingPrice(parseInt(pieceCount))}</p>}
                    <p className="font-bold text-[#0055BF] mt-2">${calculateTotalPrice(parseInt(pieceCount)).total}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                *This is an estimate. Final price may vary based on set complexity and additional services. Contact us for a precise quote.
              </p>

              {/* Next Steps */}
              <div className="bg-white rounded-lg p-6 border-2 border-[#0055BF]">
                <h4 className="text-lg font-bold text-[#0055BF] mb-4">Next Steps</h4>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="text-left">
                    <h5 className="font-semibold mb-2">1. Contact Us</h5>
                    <p className="text-gray-600">Send us your set details and requirements for a precise quote.</p>
                  </div>
                  <div className="text-left">
                    <h5 className="font-semibold mb-2">2. Schedule Pickup/Delivery</h5>
                    <p className="text-gray-600">Arrange a convenient time for us to collect your set or discuss shipping options.</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link href="/contact" className="bg-[#0055BF] text-white px-8 py-3 rounded-lg hover:bg-[#004494] transition-colors text-lg">
                    Get a Precise Quote
                  </Link>
                </div>
              </div>
            </div>
          )}
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
          <div className="flex justify-center">
            <Link href="/contact" className="lego-yellow px-8 py-3 rounded-full font-semibold text-lg">Request a Quote</Link>
          </div>
        </div>
      </div>
    </main>
  );
} 