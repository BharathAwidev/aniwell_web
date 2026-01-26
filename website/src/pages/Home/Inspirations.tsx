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
    <section className="w-full py-12 md:py-16 bg-white"> {/* Reduced padding */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10"> {/* Reduced margin-bottom */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"> {/* Reduced margin-bottom */}
            Inspiration for home interior designs
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Give your home a new look with these interior design ideas curated for you
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-10"> {/* Reduced margin-bottom */}
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Image Grid Gallery */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5"> {/* Reduced gaps */}
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
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent"> {/* Reduced padding */}
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2 text-lg font-bold">-</span>
                    <h3 className="text-base md:text-lg font-semibold text-white"> {/* Reduced font size */}
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-10"> {/* Reduced margin-top */}
          <div className="border-t border-gray-300"></div>
        </div>

        {/* View All Button */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-10 text-center"> {/* Reduced margin-top */}
          <button className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"> {/* Reduced padding */}
            <span className="text-base">View All</span> {/* Reduced font size */}
            <span className="ml-2 text-lg">→</span> {/* Reduced margin */}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Inspirations;