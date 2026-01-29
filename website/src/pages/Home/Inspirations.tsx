import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SectionAPI } from "../../../api/section.api";
import type { SectionData, SubcategoryData } from "../../../api/section.api";

// Import local images
import livingRoomImg from "../../assets/living room.jpg";
import masterBedroomImg from "../../assets/master bedroom.jpg";
import falseCeilingImg from "../../assets/false ceiling.png";
import poojaroomImg from "../../assets/pooja.jpg";
import kitchenImg from "../../assets/kitchen.png";
import wardrobeImg from "../../assets/wardrobe.png";

const Inspirations = () => {
  const navigate = useNavigate();
  const [firstCategorySlug, setFirstCategorySlug] = useState<string>("");
  const [firstSubcategorySlug, setFirstSubcategorySlug] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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

  // Fetch the first active category and subcategory from navbar
  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        setLoading(true);
        const sectionsResponse = await SectionAPI.getAll();
        const sections: SectionData[] = extractArrayFromResponse<SectionData>(sectionsResponse);
        
        const subcategoriesResponse = await SectionAPI.getAllSubcategories();
        const allSubcategories: SubcategoryData[] = extractArrayFromResponse<SubcategoryData>(subcategoriesResponse);
        
        // Find the first active category
        const firstActiveCategory = sections.find((section: SectionData) => section.status === "YES");
        
        if (firstActiveCategory) {
          const categorySlug = firstActiveCategory.name.toLowerCase().replace(/\s+/g, '-');
          setFirstCategorySlug(categorySlug);
          
          // Find the first active subcategory for this category
          const categorySubcategories = allSubcategories
            .filter((sub: SubcategoryData) => {
              const sectionId = sub.sectionId || (sub as any).section_id;
              return sectionId === firstActiveCategory.id && sub.status === "YES";
            });

          if (categorySubcategories.length > 0) {
            const firstSubcategory = categorySubcategories[0];
            const subcategorySlug = firstSubcategory.name.toLowerCase().replace(/\s+/g, '-');
            setFirstSubcategorySlug(subcategorySlug);
          } else {
            // If no subcategories, use the category slug
            setFirstSubcategorySlug(categorySlug);
          }
        } else {
          // Fallback to default values
          setFirstCategorySlug("design-ideas");
          setFirstSubcategorySlug("kitchen");
        }
      } catch (err: any) {
        console.error("Error fetching navigation data:", err);
        // Fallback to default values on error
        setFirstCategorySlug("design-ideas");
        setFirstSubcategorySlug("kitchen");
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationData();
  }, []);

  const inspirations = [
    {
      title: "Living Room",
      image: livingRoomImg,
    },
    {
      title: "Master Bedroom",
      image: masterBedroomImg,
    },
    {
      title: "False Ceiling",
      image: falseCeilingImg,
    },
    {
      title: "Pooja Room",
      image: poojaroomImg,
    },
    {
      title: "Kitchen",
      image: kitchenImg,
    },
    {
      title: "Wardrobe",
      image: wardrobeImg,
    }
  ];

  const handleNavigation = () => {
    if (firstCategorySlug && firstSubcategorySlug && !loading) {
      // Scroll to top first
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Small delay to ensure smooth scroll completes before navigation
      setTimeout(() => {
        // Navigate to the category/subcategory page
        if (firstSubcategorySlug) {
          navigate(`/${firstCategorySlug}/${firstSubcategorySlug}`);
        } else {
          navigate(`/${firstCategorySlug}`);
        }
      }, 100);
    }
  };

  const handleViewAllClick = () => {
    handleNavigation();
  };

  const handleCardClick = () => {
    handleNavigation();
  };

  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Inspiration for home interior designs
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Give your home a new look with these interior design ideas curated for you
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-10">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Image Grid Gallery */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
            {inspirations.map((item, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={handleCardClick}
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
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="flex items-center">
                    <span className="text-orange-400 mr-2 text-lg font-bold">-</span>
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                {/* Hover Effect Indicator */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500 transition-all duration-300 rounded-lg md:rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-10">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* View All Button */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-10 text-center">
          <button 
            onClick={handleViewAllClick}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-base">{loading ? "Loading..." : "View All"}</span>
            {!loading && <span className="ml-2 text-lg">→</span>}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Inspirations;