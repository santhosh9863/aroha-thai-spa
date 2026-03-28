'use client';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Thai Massage',
      description: 'Traditional Thai techniques for flexibility and tension relief',
      icon: '🧘',
    },
    {
      id: 2,
      title: 'Swedish Massage',
      description: 'Relaxing full-body massage to ease stress and improve circulation',
      icon: '💆',
    },
    {
      id: 3,
      title: 'Deep Tissue',
      description: 'Intense therapy targeting deep muscle layers for lasting relief',
      icon: '💪',
    },
    {
      id: 4,
      title: 'Aromatherapy',
      description: 'Therapeutic massage infused with essential oils for wellness',
      icon: '🌿',
    },
  ];

  return (
    <section id="services" className="bg-black py-24 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(234,179,8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white text-center mb-6">
          Our Services
        </h2>
        <p className="text-center text-gray-400 mb-16 text-lg">Discover our range of premium wellness treatments</p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-8 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2 cursor-pointer"
            >
              <div className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-4 group-hover:text-yellow-500 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
