'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center relative overflow-hidden scroll-mt-20">
      {/* Animated gradient background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-yellow-600 rounded-full blur-3xl"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(234,179,8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 tracking-tighter leading-tight">
          Relax. Rejuvenate. Refresh.
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 mb-12 font-light tracking-wide">
          Premium wellness and massage experience
        </p>

        <Link
          href="/booking"
          className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-400 hover:shadow-2xl hover:shadow-yellow-500/50 text-black font-semibold px-10 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
        >
          Book Appointment
        </Link>
      </div>
    </section>
  );
}
