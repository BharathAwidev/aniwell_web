import { useState, useEffect } from 'react';

const Estimate = () => {
  const estimateOptions = [
    {
      title: "Full Home Interior",
      description: "Know the estimate price for your full home interiors",
      buttonText: "CALCULATE >",
      leftImage: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/price-estimator-1682068031-6FLQd/full-hi-1682068037-mSqKH.jpg",
      rightImage: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/mobile-1664858443-m6vo0/price-estimators-1682069788-xGgFt/calculator-1682069838-tZQ4E.webp"
    },
    {
      title: "Kitchen",
      description: "Get an approximate costing for your kitchen interior",
      buttonText: "CALCULATE >",
      leftImage: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/mobile-1664858443-m6vo0/price-estimators-1682069788-xGgFt/kitchen-copy-1682069840-cnYX7.webp",
      rightImage: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/mobile-1664858443-m6vo0/price-estimators-1682069788-xGgFt/calculator-1682069838-tZQ4E.webp"
    },
    {
      title: "Wardrobe",
      description: "Our estimate for your dream wardrobe",
      buttonText: "CALCULATE >",
      leftImage: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/desktop-1663681517-hulYi/price-estimator-1682068031-6FLQd/wardrobe-1-1682068117-6oLvL.jpg",
      rightImage: "https://images.livspace-cdn.com/w:80/h:80/dpr:2/plain/https://d3gq2merok8n5r.cloudfront.net/bumblebee/in/unification-home-1663681501-pVo75/mobile-1664858443-m6vo0/price-estimators-1682069788-xGgFt/calculator-1682069838-tZQ4E.webp"
    }
  ];

  const rotatingTexts = ["Full Home", "Kitchen", "Wardrobe"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get the estimate for your{" "}
            <span className="text-orange-500 inline-block min-w-[120px] text-center transition-all duration-500">
              {rotatingTexts[currentIndex]}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Calculate the approximate cost of doing up your home interiors
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-10 md:mb-12">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Estimate Cards - With images at edges */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {estimateOptions.map((option, index) => (
              <div 
                key={index}
                className="flex flex-col h-full"
              >
                {/* Card with images at edges */}
                <div className="bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 border border-gray-200 flex flex-col h-full relative">
                  {/* Images positioned at edges */}
                  <div className="flex justify-between items-center absolute top-6 left-6 right-6">
                    {/* Left Circle Image */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-md z-10">
                      <img 
                        src={option.leftImage} 
                        alt={`${option.title} - Left`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Right Circle Image */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-white shadow-md z-10">
                      <img 
                        src={option.rightImage} 
                        alt={`${option.title} - Right`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Content with top padding for images */}
                  <div className="pt-28 md:pt-32 px-6 md:px-8 pb-6 md:pb-8 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 text-center">
                      {option.title}
                    </h3>
                    
                    {/* Divider */}
                    <div className="w-10 h-1 bg-orange-500 rounded-full mb-4 mx-auto"></div>
                    
                    {/* Description */}
                    <p className="text-base text-gray-600 mb-6 leading-relaxed text-center flex-grow">
                      {option.description}
                    </p>
                    
                    {/* Button at bottom */}
                    <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-base font-bold rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-105">
                      {option.buttonText}
                    </button>
                  </div>
                </div>
                
                {/* Divider between cards on mobile */}
                {index < estimateOptions.length - 1 && (
                  <div className="md:hidden pt-6 border-t border-gray-300 mt-6">
                    <div className="border-t border-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Note */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <p className="text-gray-500 text-xs md:text-sm">
            *All estimates are indicative and subject to final measurement and customization
          </p>
        </div>
      </div>
    </section>
  );
};

export default Estimate;