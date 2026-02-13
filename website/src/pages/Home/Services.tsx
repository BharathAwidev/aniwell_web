import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SectionAPI } from "../../../api/section.api";
import type { SectionData } from "../../../api/section.api";

// Import local images
import modularInteriorsImg from "../../assets/Спальня.jpg";
import fullHomeInteriorsImg from "../../assets/Enscape_2025-11-26-21-47-06_Enscape scene 3.png";
import luxuryInteriorsImg from "../../assets/GUEST ROOM  view 1.png";
import renovationsImg from "../../assets/download - 2026-01-22T125110.453.jpg";

const Services = () => {
  const navigate = useNavigate();
  const [firstCategorySlug, setFirstCategorySlug] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  
  const services = [
    { 
      title: "Modular Interiors", 
      description: "Functional kitchen, wardrobe and storage",
      image: modularInteriorsImg,
    },
    { 
      title: "Full Home Interiors", 
      description: "Turnkey interior solutions for your home",
      image: fullHomeInteriorsImg,
    },
    { 
      title: "Luxury Interiors", 
      description: "Tailored interiors that redefine elegance",
      image: luxuryInteriorsImg,
    },
    { 
      title: "Renovations", 
      description: "Expert solutions to upgrade your home",
      image: renovationsImg,
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Helper function to extract array from API response
  const extractArrayFromResponse = <T,>(response: any): T[] => {
    if (Array.isArray(response)) {
      return response;
    }
    
    if (response && typeof response === 'object') {
      if (Array.isArray(response.data)) return response.data;
      if (Array.isArray(response.results)) return response.results;
      if (Array.isArray(response.items)) return response.items;
      if (Array.isArray(response.list)) return response.list;
      
      const arrayKey = Object.keys(response).find(key => Array.isArray(response[key]));
      if (arrayKey) {
        return response[arrayKey];
      }
      
      const values = Object.values(response);
      if (values.length > 0 && values.every(v => typeof v === 'object' && v !== null)) {
        return values as T[];
      }
    }
    
    console.warn("Could not extract array from API response:", response);
    return [];
  };

  // Fetch the first active category from navbar
  useEffect(() => {
    const fetchFirstCategory = async () => {
      try {
        setLoading(true);
        const sectionsResponse = await SectionAPI.getAll();
        const sections: SectionData[] = extractArrayFromResponse<SectionData>(sectionsResponse);
        
        // Find the first active category
        const firstActiveCategory = sections.find((section: SectionData) => section.status === "YES");
        
        if (firstActiveCategory) {
          const slug = firstActiveCategory.name.toLowerCase().replace(/\s+/g, '-');
          setFirstCategorySlug(slug);
        } else {
          // Fallback to default category
          setFirstCategorySlug("design-ideas");
        }
      } catch (err: any) {
        console.error("Error fetching first category:", err);
        // Fallback to default category on error
        setFirstCategorySlug("design-ideas");
      } finally {
        setLoading(false);
      }
    };

    fetchFirstCategory();
  }, []);

  const handleNavigation = () => {
    if (firstCategorySlug && !loading) {
      // Scroll to top first
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Small delay to ensure smooth scroll completes before navigation
      setTimeout(() => {
        // Navigate to the first category page from navbar
        navigate(`/${firstCategorySlug}`);
      }, 100);
    }
  };

  const handleLearnMore = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    handleNavigation();
  };

  const handleCardClick = () => {
    handleNavigation();
  };

  return (
    <section className="w-full py-12 md:py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Main Heading Section */}
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            One-stop shop for all things interiors
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Be it end-to-end interiors, renovation or modular solutions, we have it all for your home or office. 
            With a wide range of furniture & decor, we have your back from start to finish.
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-10">
          <div className="border-t border-gray-400"></div>
        </div>

        {/* Services Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={handleCardClick}
              >
                {/* Service Image */}
                <div className="h-40 md:h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </div>
                
                {/* Content */}
                <div className="p-5 md:p-6">
                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  
                  {/* Service Description */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Arrow Link */}
                  <button 
                    onClick={handleLearnMore}
                    disabled={loading}
                    className="inline-flex items-center text-orange-500 font-semibold group-hover:text-orange-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? "Loading..." : "Learn more"}</span>
                    {!loading && (
                      <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
                    )}
                  </button>
                </div>
                
                {/* Hover Effect Indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-orange-500 transform transition-transform duration-300 ${
                  hoveredIndex === index ? 'scale-x-100' : 'scale-x-0'
                }`}></div>
                
                {/* Divider between items (for mobile) */}
                {index < services.length - 1 && (
                  <div className="block md:hidden mt-6 pt-6 border-t border-gray-300">
                    <div className="border-t border-gray-400"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-10">
          <div className="border-t border-gray-400"></div>
        </div>

      
      </div>
    </section>
  );
};

export default Services;