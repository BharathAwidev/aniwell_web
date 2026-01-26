const WhyChooseUs = () => {
  const scrollingStats = [
    {
      text: "Flat 10-year warranty",
      sup: "¹",
      image: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/why-choose-us-1682067952-gXbOw/flat-10-year-warranty-1-1682067957-aj1Rq.jpg",
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      text: "45-day move-in guarantee",
      sup: "²",
      image: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/why-choose-us-1682067952-gXbOw/45-day-move-in-guarantee-1682070434-vYtgS.jpg",
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      text: "146 quality checks",
      image: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/why-choose-us-1682067952-gXbOw/146-quality-checks-1682070435-krIlQ.jpg",
      bgColor: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      text: "1,00,000+ happy homes",
      image: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/why-choose-us-1682067952-gXbOw/50000-happy-homes-1682070435-ih1Ir.jpg",
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      text: "100+ cities",
      image: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/why-choose-us-1682067952-gXbOw/40-cities-1682070433-M7Q2t.jpg",
      bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-600"
    },
    {
      text: "2 countries",
      image: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/why-choose-us-1682067952-gXbOw/4-countries-1682070431-k0TjR.jpg",
      bgColor: "bg-gradient-to-br from-teal-500 to-teal-600"
    },
    {
      text: "20 lakh+ catalogue products",
      image: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/why-choose-us-1682067952-gXbOw/20-lakhcatalogue-products-1682070432-CoDEa.jpg",
      bgColor: "bg-gradient-to-br from-pink-500 to-pink-600"
    },
    {
      text: "2,000+ designers",
      image: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/why-choose-us-1682067952-gXbOw/3500-designers-1682070430-eEvZq.jpg",
      bgColor: "bg-gradient-to-br from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-[#e0e0e0] relative overflow-hidden"> {/* Reduced padding, changed bg color */}
      {/* Background Pattern - Simplified */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-48 h-48 bg-orange-300 rounded-full -translate-x-24 -translate-y-24"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-300 rounded-full translate-x-32 translate-y-32"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Header - Reduced spacing */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why choose us
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"> {/* Changed to gray-700 for better contrast */}
            Discover why thousands trust us for their dream interiors
          </p>
        </div>

        {/* Enhanced Marquee with Cards - Reduced spacing */}
        <div className="max-w-7xl mx-auto overflow-hidden">
          <div className="relative py-4"> {/* Reduced padding */}
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#e0e0e0] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#e0e0e0] to-transparent z-10 pointer-events-none"></div>
            
            {/* Marquee Container */}
            <div className="flex overflow-hidden">
              <div className="flex animate-marquee space-x-4 md:space-x-6"> {/* Reduced space */}
                {[...scrollingStats, ...scrollingStats].map((stat, index) => (
                  <div 
                    key={index}
                    className="group relative flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex-shrink-0 w-60 md:w-64 border border-gray-200"
                  >
                    {/* Image Circle with Gradient */}
                    <div className={`${stat.bgColor} w-16 h-16 md:w-18 md:h-18 rounded-full flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>
                      <img 
                        src={stat.image} 
                        alt={stat.text}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Text Content */}
                    <div className="text-center">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1"> {/* Reduced font size */}
                        {stat.text}
                        {stat.sup && (
                          <sup className="text-sm md:text-base text-orange-600 ml-1">{stat.sup}</sup>
                        )}
                      </h3>
                    </div>

                    {/* Decorative Bottom Border */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-orange-500 transition-all duration-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mini Stats Bar - Reduced spacing */}
        <div className="max-w-5xl mx-auto mt-8"> {/* Reduced margin-top */}
          <div className="bg-gradient-to-r from-gray-50 to-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200"> {/* Reduced padding */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4"> {/* Reduced gap */}
              {[
                { value: "10 Years", label: "Warranty", color: "text-orange-600" },
                { value: "45 Days", label: "Move-in", color: "text-blue-600" },
                { value: "1L+ Homes", label: "Completed", color: "text-green-600" },
                { value: "100+ Cities", label: "Presence", color: "text-purple-600" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`text-xl md:text-2xl font-bold ${item.color} mb-1`}> {/* Reduced font size */}
                    {item.value}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base"> {/* Reduced font size */}
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Notes - Reduced spacing */}
        <div className="max-w-3xl mx-auto mt-8 pt-6 border-t border-gray-300"> {/* Reduced margin-top and padding-top */}
          <div className="text-center text-gray-600 text-sm md:text-base"> {/* Reduced font size */}
            <div className="inline-flex flex-col md:flex-row gap-3 md:gap-6"> {/* Reduced gap */}
              <div className="flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span> {/* Reduced size */}
                <p><sup className="text-orange-600 font-bold">¹</sup> Industry-leading warranty program</p>
              </div>
              <div className="flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> {/* Reduced size */}
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