'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-600/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(234,179,8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-3 hover:text-yellow-500 transition-colors duration-300">
              Aaroh Thai Spa
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mb-4"></div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Relaxation & Wellness Experience
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-serif font-bold mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-yellow-500 transition-all duration-300 relative group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-gray-400 hover:text-yellow-500 transition-all duration-300 relative group"
                >
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-gray-400 hover:text-yellow-500 transition-all duration-300 relative group"
                >
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-400 hover:text-yellow-500 transition-all duration-300 relative group"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white font-serif font-bold mb-6">Contact</h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              <span className="block font-medium text-yellow-500/80 mb-1 text-xs uppercase tracking-widest">Phone</span>
              +91 (080) XXXX-XXXX
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="block font-medium text-yellow-500/80 text-xs uppercase tracking-widest mb-1">Address</span>
              Bangalore, India
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Copyright */}
          <p className="text-gray-500 text-xs text-center tracking-widest uppercase">
            © 2026 Aaroh Thai Spa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
