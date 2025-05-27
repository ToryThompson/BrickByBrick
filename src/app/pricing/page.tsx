import Link from "next/link";
import Image from "next/image";

export default function Pricing() {
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

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center border-2 border-[#0055BF]">
            <h2 className="text-2xl font-bold mb-4 text-[#0055BF]">Small Sets</h2>
            <p className="text-[#1B1B1B] mb-6">(Under 500 pieces)</p>
            <p className="text-4xl font-bold mb-6 text-[#1B1B1B]">Starting at $30</p>
            <p className="text-[#1B1B1B] mb-6">Perfect for smaller models and quick builds.</p>
            <Link href="/contact" className="lego-yellow px-6 py-2 rounded-full font-semibold">Get Quote</Link>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center border-2 border-[#D01012]">
            <h2 className="text-2xl font-bold mb-4 text-[#D01012]">Medium Sets</h2>
            <p className="text-[#1B1B1B] mb-6">(500 - 1999 pieces)</p>
            <p className="text-4xl font-bold mb-6 text-[#1B1B1B]">Starting at $50</p>
            <p className="text-[#1B1B1B] mb-6">Great for most standard sized sets and collections.</p>
            <Link href="/contact" className="lego-red px-6 py-2 rounded-full font-semibold text-white">Get Quote</Link>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-8 text-center border-2 border-[#F7D117]">
            <h2 className="text-2xl font-bold mb-4 text-[#F7D117]">Large Sets</h2>
            <p className="text-[#1B1B1B] mb-6">(2000+ pieces)</p>
            <p className="text-4xl font-bold mb-6 text-[#1B1B1B]">Starting at $100</p>
            <p className="text-[#1B1B1B] mb-6">Ideal for complex models and enthusiast builds.</p>
            <Link href="/contact" className="lego-yellow px-6 py-2 rounded-full font-semibold">Get Quote</Link>
          </div>
        </div>

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