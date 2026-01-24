const WhyChooseUs = () => {
  const scrollingStats = [
    {
      text: "Flat 10-year warranty",
      sup: "¹",
      icon: "🛡️",
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      text: "45-day move-in guarantee",
      sup: "²",
      icon: "📅",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      text: "146 quality checks",
      icon: "✅",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      text: "1,00,000+ happy homes",
      icon: "😊",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      text: "100+ cities",
      icon: "🏙️",
      bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600"
    },
    {
      text: "2 countries",
      icon: "🌍",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-600"
    },
    {
      text: "20 lakh+ catalogue products",
      icon: "📦",
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-600"
    },
    {
      text: "2,000+ designers",
      icon: "👨‍🎨",
      bgColor: "bg-gradient-to-br from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-300 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full translate-x-48 translate-y-48"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-green-300 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 relative">
            <span className="relative inline-block">
              Why choose us
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></span>
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Discover why thousands trust us for their dream interiors
          </p>
        </div>

        {/* Enhanced Marquee with Cards */}
        <div className="max-w-7xl mx-auto overflow-hidden">
          <div className="relative py-8">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            {/* Marquee Container */}
            <div className="flex overflow-hidden">
              <div className="flex animate-marquee space-x-6 md:space-x-8">
                {[...scrollingStats, ...scrollingStats].map((stat, index) => (
                  <div 
                    key={index}
                    className="group relative flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex-shrink-0 w-72 md:w-80 border border-gray-100"
                  >
                    {/* Icon Circle with Gradient */}
                    <div className={`${stat.bgColor} w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <span className="text-4xl md:text-5xl">
                        {stat.icon}
                      </span>
                    </div>
                    
                    {/* Text Content */}
                    <div className="text-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {stat.text}
                        {stat.sup && (
                          <sup className="text-lg md:text-xl text-orange-600 ml-1">{stat.sup}</sup>
                        )}
                      </h3>
                    </div>

                    {/* Decorative Bottom Border */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-orange-500 transition-all duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mini Stats Bar */}
        <div className="max-w-5xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-gray-50 to-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "10 Years", label: "Warranty", color: "text-orange-600" },
                { value: "45 Days", label: "Move-in", color: "text-blue-600" },
                { value: "1L+ Homes", label: "Completed", color: "text-green-600" },
                { value: "100+ Cities", label: "Presence", color: "text-purple-600" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold ${item.color} mb-2`}>
                    {item.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-gray-200">
          <div className="text-center text-gray-600 text-base">
            <div className="inline-flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <p><sup className="text-orange-600 font-bold">¹</sup> Industry-leading warranty program</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <p><sup className="text-blue-600 font-bold">²</sup> Fastest project completion guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Animation */}
        <style>
          {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            animation: marquee 45s linear infinite;
          }
          `}
        </style>
      </div>
    </section>
  );
};

export default WhyChooseUs;