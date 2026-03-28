'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black/80 backdrop-blur-md text-white sticky top-0 z-50 border-b border-yellow-600/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-wider text-white hover:text-yellow-500 transition-all duration-300 font-serif"
          >
            Aaroh Thai Spa
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#hero"
              className="text-gray-300 hover:text-yellow-500 transition-all duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#services"
              className="text-gray-300 hover:text-yellow-500 transition-all duration-300 relative group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#about"
              className="text-gray-300 hover:text-yellow-500 transition-all duration-300 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-300 hover:text-yellow-500 transition-all duration-300 relative group"
            >
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/booking"
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:shadow-lg hover:shadow-yellow-500/50 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
