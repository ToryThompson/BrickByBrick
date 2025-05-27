"use client";
import React from 'react';
import Link from "next/link";
import { FaTruck, FaTools, FaHome, FaStar } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

const services = [
  {
    icon: <FaTools />,
    color: "lego-blue",
    border: "#0055BF",
    title: "Expert Assembly",
    short: "Professional assembly of official LEGO sets with attention to detail and quality.",
    long: (
      <div className="space-y-6">
        <p className="text-[#1B1B1B]">We treat every LEGO set as a masterpiece! Your set will be built by a passionate LEGO expert who follows the official instructions, checks for missing pieces, and ensures a sturdy, display-ready result.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#F7D117]/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#0055BF]">What&apos;s Included:</h3>
            <ul className="space-y-2 text-[#1B1B1B]">
              <li>✓ Careful sorting and inventory check</li>
              <li>✓ Step-by-step, instruction-accurate assembly</li>
              <li>✓ Final inspection for quality</li>
              <li>✓ Secure packaging</li>
            </ul>
          </div>
          <div className="bg-[#F7D117]/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#0055BF]">Set Size Options:</h3>
            <div className="space-y-2 text-[#1B1B1B]">
              <p>• Small Sets (Under 500 pcs)</p>
              <p>• Medium Sets (500-1999 pcs)</p>
              <p>• Large Sets (2000+ pcs)</p>
            </div>
          </div>
        </div>
      </div>
    ),
    slug: "assembly"
  },
  {
    icon: <FaTruck />,
    color: "lego-yellow",
    border: "#F7D117",
    title: "Local Pickup & Delivery",
    short: "Convenient pickup and delivery services for your LEGO sets in Atlanta, GA.",
    long: (
      <div className="space-y-6">
        <p className="text-[#1B1B1B]">No need to leave home! We&apos;ll pick up your LEGO set (boxed or loose) and deliver it back fully assembled. We coordinate a time that works for you and keep your set safe in transit.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#F7D117]/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#0055BF]">Service Features:</h3>
            <ul className="space-y-2 text-[#1B1B1B]">
              <li>✓ Flexible scheduling</li>
              <li>✓ Careful packaging</li>
              <li>✓ Safe transportation</li>
              <li>✓ Professional handling</li>
            </ul>
          </div>
          <div className="bg-[#F7D117]/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#0055BF]">Available For:</h3>
            <div className="space-y-2 text-[#1B1B1B]">
              <p>• Homes and apartments</p>
              <p>• Businesses and offices</p>
              <p>• Events and parties</p>
            </div>
          </div>
        </div>
      </div>
    ),
    slug: "pickup-delivery"
  },
  {
    icon: <FaHome />,
    color: "lego-green",
    border: "#237841",
    title: "On-site Building",
    short: "We can build your LEGO set at your location by request for special events or convenience.",
    long: (
      <div className="space-y-6">
        <p className="text-[#1B1B1B]">Want to watch the magic happen? We&apos;ll come to your location and build your set on-site—great for store displays, parties, or just for fun. We bring all the tools and keep the area tidy.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#F7D117]/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#0055BF]">Perfect For:</h3>
            <ul className="space-y-2 text-[#1B1B1B]">
              <li>✓ Store displays</li>
              <li>✓ Special events</li>
              <li>✓ Interactive parties</li>
              <li>✓ Corporate events</li>
            </ul>
          </div>
          <div className="bg-[#F7D117]/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#0055BF]">What We Bring:</h3>
            <div className="space-y-2 text-[#1B1B1B]">
              <p>• All necessary tools</p>
              <p>• Organization supplies</p>
              <p>• Cleaning materials</p>
            </div>
          </div>
        </div>
      </div>
    ),
    slug: "on-site"
  },
  {
    icon: <FaStar />,
    color: "lego-red",
    border: "#D01012",
    title: "Display Solutions",
    short: "Dust-free, glued (if desired), and ready for display—perfect for collectors and stores.",
    long: (
      <div className="space-y-6">
        <p className="text-[#1B1B1B]">Want your build to last? We offer dust-free cleaning and can glue your set (if requested) for extra durability. Ideal for permanent displays or high-traffic areas.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#F7D117]/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#0055BF]">Display Options:</h3>
            <ul className="space-y-2 text-[#1B1B1B]">
              <li>✓ Custom display cases</li>
              <li>✓ LED lighting systems</li>
              <li>✓ Rotating platforms</li>
              <li>✓ Wall mounting solutions</li>
            </ul>
          </div>
          <div className="bg-[#F7D117]/10 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#0055BF]">Features:</h3>
            <div className="space-y-2 text-[#1B1B1B]">
              <p>• Dust-proof materials</p>
              <p>• UV protection</p>
              <p>• Custom lighting</p>
            </div>
          </div>
        </div>
      </div>
    ),
    slug: "display-prep"
  },
];

export default function Services() {
  const [open, setOpen] = useState<string | null>(null);

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
          <h1 className="text-4xl font-bold text-center mb-2 text-[#0055BF] font-brick bg-white/80 backdrop-blur-sm px-8 py-4 rounded-lg shadow-lg [text-shadow:_1px_1px_3px_rgba(0,0,0,0.3)]">Our Services</h1>
          <div className="w-24 h-1 bg-[#D01012] rounded-full mb-6"></div>
          <p className="text-xl max-w-2xl mx-auto text-center text-[#1B1B1B] mb-12">
            Professional LEGO building services tailored to your needs. From small sets to massive displays, we bring your LEGO dreams to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col gap-4 hover:scale-[1.025] transition-transform border-2"
              style={{ borderColor: service.border }}
            >
              <div className={`${service.color} p-4 rounded-full text-3xl w-fit mx-auto mb-2`}>{service.icon}</div>
              <h2 className={`text-2xl font-bold mb-2 text-center [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]`} style={{ color: service.border }}>{service.title}</h2>
              <p className="text-[#1B1B1B] text-center mb-2">{service.short}</p>
              <button
                className="lego-yellow px-4 py-2 rounded-full font-semibold w-fit mx-auto mb-2 hover:bg-yellow-300 transition-colors"
                onClick={() => setOpen(open === service.slug ? null : service.slug)}
                aria-expanded={open === service.slug}
              >
                {open === service.slug ? "Hide Details" : "Learn More"}
              </button>
              {open === service.slug && (
                <div className="bg-[#F7D117]/20 p-4 rounded-lg text-[#1B1B1B] animate-fade-in mb-2">
                  {service.long}
                </div>
              )}
              <Link
                href={{ pathname: "/contact", query: { service: service.slug } }}
                className="lego-blue px-4 py-2 rounded-full font-semibold w-fit mx-auto text-white hover:bg-blue-700 transition-colors"
              >
                Request This Service
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-6 font-brick text-[#0055BF] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-[#0055BF] text-white px-8 py-4 rounded-lg hover:bg-[#004494] transition-colors text-lg">
              Request a Quote
            </Link>
            <Link href="/pricing" className="bg-[#F7D117] text-[#1B1B1B] px-8 py-4 rounded-lg hover:bg-[#E6C615] transition-colors text-lg">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 