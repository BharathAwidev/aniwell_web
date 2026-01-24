import { ArrowRight } from "lucide-react";

const Services = () => {
  const services = [
    { 
      title: "Modular Interiors", 
      description: "Functional kitchen, wardrobe and storage",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    { 
      title: "Full Home Interiors", 
      description: "Turnkey interior solutions for your home",
      image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    { 
      title: "Luxury Interiors", 
      description: "Tailored interiors that redefine elegance",
      image: "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    { 
      title: "Renovations", 
      description: "Expert solutions to upgrade your home",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Main Heading Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            One-stop shop for all things interiors
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Be it end-to-end interiors, renovation or modular solutions, we have it all for your home or office. 
            With a wide range of furniture & decor, we have your back from start to finish.
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Services Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                {/* Service Image */}
                <div className="h-48 md:h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Service Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  
                  {/* Service Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Arrow Link */}
                  <button className="inline-flex items-center text-orange-500 font-semibold group-hover:text-orange-600 transition-colors duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
                
                {/* Divider between items (for mobile) */}
                {index < services.length - 1 && (
                  <div className="block md:hidden mt-8 pt-8 border-t border-gray-200">
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

        {/* Note Section */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-sm text-gray-500 italic">
            *Note: The images are AI-generated placeholders and do not represent any specific product or service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;