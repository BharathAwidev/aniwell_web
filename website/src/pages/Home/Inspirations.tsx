
const Inspirations = () => {
  const inspirations = [
    {
      title: "Living Room",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Master Bedroom",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "False Ceiling",
      image: "https://images.unsplash.com/photo-1616587894289-86480e533129?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Homes by Livspace",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Kitchen",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Wardrobe",
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Inspiration for home interior designs
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Give your home a new look with these interior design ideas curated for you
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Image Grid Gallery */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {inspirations.map((item, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2 text-lg font-bold">-</span>
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* View All Button */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16 text-center">
          <button className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <span className="text-lg">View All</span>
            <span className="ml-3 text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Inspirations;