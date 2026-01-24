const Estimate = () => {
  const estimateOptions = [
    {
      title: "Full Home Interior",
      description: "Know the estimate price for your full home interiors",
      buttonText: "CALCULATE >",
      icon: "🏠"
    },
    {
      title: "Kitchen",
      description: "Get an approximate costing for your kitchen interior",
      buttonText: "CALCULATE >",
      icon: "🍽️"
    },
    {
      title: "Wardrobe",
      description: "Our estimate for your dream wardrobe",
      buttonText: "CALCULATE >",
      icon: "👔"
    }
  ];

  return (
    <section className="w-full py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Get the estimate for your Full Home
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            Calculate the approximate cost of doing up your home interiors
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Estimate Cards - Equal Height Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {estimateOptions.map((option, index) => (
              <div 
                key={index}
                className="flex flex-col h-full" // Ensure flex column and full height
              >
                {/* Card with equal height */}
                <div className="bg-gray-50 rounded-2xl p-8 md:p-10 hover:bg-gray-100 transition-colors duration-300 border border-gray-200 flex flex-col h-full">
                  {/* Icon */}
                  <div className="text-5xl md:text-6xl mb-6 text-center">{option.icon}</div>
                  
                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                    {option.title}
                  </h3>
                  
                  {/* Divider */}
                  <div className="w-12 h-1 bg-orange-500 rounded-full mb-6 mx-auto"></div>
                  
                  {/* Description - flex-grow allows this to expand */}
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed text-center flex-grow">
                    {option.description}
                  </p>
                  
                  {/* Button at bottom */}
                  <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105 mt-auto">
                    {option.buttonText}
                  </button>
                </div>
                
                {/* Divider between cards on mobile */}
                {index < estimateOptions.length - 1 && (
                  <div className="md:hidden pt-8 border-t border-gray-300 mt-8">
                    <div className="border-t border-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="max-w-4xl mx-auto mt-16 md:mt-20">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Note */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-gray-500 text-sm">
            *All estimates are indicative and subject to final measurement and customization
          </p>
        </div>
      </div>
    </section>
  );
};

export default Estimate;