'use client';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      review: 'The most relaxing experience I\'ve had in years. The therapists are truly skilled and professional. Highly recommended!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      review: 'Exceptional service with attention to detail. The ambiance is perfect and I felt completely rejuvenated after my session.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Anjali Patel',
      review: 'A sanctuary of peace and wellness. The therapists understood exactly what I needed. I\'ll definitely be back!',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="bg-black py-24 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(234,179,8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-6">
          What Our Clients Say
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Trusted by wellness seekers like you</p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-8 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl group-hover:scale-110 transition-transform duration-300" style={{transitionDelay: `${i * 50}ms`}}>
                    ★
                  </span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-base leading-relaxed mb-6 italic group-hover:text-gray-100 transition-colors duration-300">
                "{testimonial.review}"
              </p>

              {/* Customer Name */}
              <p className="text-white font-serif font-bold text-lg group-hover:text-yellow-500 transition-colors duration-300">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
