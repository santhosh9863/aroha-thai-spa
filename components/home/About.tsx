'use client';

export default function About() {
  return (
    <section id="about" className="bg-gradient-to-b from-black to-gray-950 py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-center lg:text-left">
          About Us
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 mb-16"></div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <p className="text-gray-300 text-lg leading-relaxed font-light">
              At Aaroh Thai Spa, we believe wellness is a journey, not a destination. Our team of certified and experienced therapists is dedicated to providing authentic, personalized treatments that rejuvenate your mind, body, and spirit.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed font-light">
              We maintain the highest standards of hygiene and use only premium products to ensure every session is a sanctuary of calm and relaxation. Our tranquil environment is designed to transport you away from the everyday stress and into a space of pure serenity.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed font-light">
              Whether you're seeking relief from tension, recovery from physical strain, or simply a moment of self-care, Aaroh Thai Spa is your trusted partner in wellness and rejuvenation.
            </p>
          </div>

          {/* Visual Placeholder */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 blur"></div>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-2xl overflow-hidden h-96 border border-gray-800 shadow-2xl group-hover:border-yellow-500/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/10 to-transparent"></div>
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(234,179,8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
              <div className="flex items-center justify-center h-full relative z-10">
                <div className="text-center">
                  <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">🧘</div>
                  <p className="text-gray-400 text-sm tracking-widest">WELLNESS & RELAXATION</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
