import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });

export const metadata: Metadata = {
  title: "Brick by Brick Toy Building - Professional LEGO Set Building Services",
  description: "Professional LEGO set building services. We build your dreams, brick by brick.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${bricolage.variable}`}>
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-blue-600 font-brick">
                Brick by Brick
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
                <Link href="/services" className="text-gray-600 hover:text-blue-600">
                  Services
                </Link>
                <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600">
                  How It Works
                </Link>
                <Link href="/portfolio" className="text-gray-600 hover:text-blue-600">
                  Portfolio
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
                  Pricing
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 font-brick">Brick by Brick</h3>
                <p className="text-gray-300">Professional LEGO set building services.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 font-brick">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/services" className="text-gray-300 hover:text-white">Services</Link></li>
                  <li><Link href="/how-it-works" className="text-gray-300 hover:text-white">How It Works</Link></li>
                  <li><Link href="/portfolio" className="text-gray-300 hover:text-white">Portfolio</Link></li>
                  <li><Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
                  <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 font-brick">Contact Us</h3>
                <p className="text-gray-300">Email: probrickbuilds@gmail.com</p>
                <p className="text-gray-300">Phone: (770) 383-5290</p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; {new Date().getFullYear()} Brick by Brick Toy Building. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
