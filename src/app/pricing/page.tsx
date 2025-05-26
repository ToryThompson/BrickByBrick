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
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Basic Build Service */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border-2 border-[#0055BF] hover:border-[#D01012] transition-all">
            <h2 className="text-2xl font-bold text-[#0055BF] mb-4 font-brick [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">Basic Build Service</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#F7D117] bg-opacity-10 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">Under 500 Pcs</h3>
                <p className="text-[#D01012] font-bold text-xl">$25–$50</p>
                <p className="text-[#1B1B1B] mt-2">Perfect for small sets and quick builds</p>
              </div>
              <div className="p-4 bg-[#F7D117] bg-opacity-10 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">500–1999 Pcs</h3>
                <p className="text-[#D01012] font-bold text-xl">$50–$100</p>
                <p className="text-[#1B1B1B] mt-2">Ideal for medium-sized sets</p>
              </div>
              <div className="p-4 bg-[#F7D117] bg-opacity-10 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">2000–3999 Pcs</h3>
                <p className="text-[#D01012] font-bold text-xl">$100–$200</p>
                <p className="text-[#1B1B1B] mt-2">For larger, more complex builds</p>
              </div>
              <div className="p-4 bg-[#F7D117] bg-opacity-10 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">4000+ Pcs</h3>
                <p className="text-[#D01012] font-bold text-xl">$200+</p>
                <p className="text-[#1B1B1B] mt-2">Custom pricing for massive sets</p>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 border-2 border-[#0055BF] hover:border-[#D01012] transition-all">
            <h2 className="text-2xl font-bold text-[#0055BF] mb-4 font-brick [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">Additional Services</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#F7D117] bg-opacity-10 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">Gluing Service</h3>
                <p className="text-[#D01012] font-bold text-xl">+$25</p>
                <div className="text-[#1B1B1B] mt-2 space-y-1">
                  <p className="font-semibold">Professional gluing ensures your set stays intact forever. We use specialized LEGO-compatible glue that:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Preserves the set's appearance</li>
                    <li>Prevents accidental disassembly</li>
                    <li>Makes cleaning easier</li>
                    <li>Perfect for display pieces</li>
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-[#F7D117] bg-opacity-10 rounded-lg">
                <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">Delivery/Pickup</h3>
                <p className="text-[#D01012] font-bold text-xl">+$15–30</p>
                <div className="text-[#1B1B1B] mt-2 space-y-1">
                  <p className="font-semibold">Convenient local delivery and pickup service:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Safe transportation</li>
                    <li>Careful handling</li>
                    <li>Flexible scheduling</li>
                    <li>Available in Atlanta area</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-[#0055BF] mb-6 font-brick [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">What's included in the basic build service?</h3>
              <p className="text-[#1B1B1B]">Our basic build service includes professional assembly of your LEGO set, quality checking, and basic cleaning. We ensure all pieces are properly connected and the build matches the instructions exactly.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">How long does a build typically take?</h3>
              <p className="text-[#1B1B1B]">Build times vary based on set size and complexity. Small sets (under 500 pieces) typically take 1-2 days, while larger sets may take 3-5 days. Rush service is available for an additional fee.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">Is gluing permanent?</h3>
              <p className="text-[#1B1B1B]">Yes, gluing is permanent. We use specialized LEGO-compatible glue that creates a strong, lasting bond. This is ideal for display pieces but not recommended if you plan to disassemble the set later.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#1B1B1B]">Do I need to provide the LEGO set?</h3>
              <p className="text-[#1B1B1B]">Yes, you'll need to provide the LEGO set. We can help you source sets if needed, but this would be an additional cost. We recommend purchasing from official LEGO retailers to ensure authenticity.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
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