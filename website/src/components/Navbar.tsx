// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionAPI } from "../../api/section.api";
import { type SectionData, type SubcategoryData } from "../../api/section.api";

type MenuKey = string;

// Interface for transformed category data
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  hasDropdown: boolean;
  status: string;
  subCategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState<MenuKey | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Helper function to extract array from API response
  const extractArrayFromResponse = <T,>(response: any): T[] => {
    // If response is already an array, return it
    if (Array.isArray(response)) {
      return response;
    }
    
    // If response has a data property that's an array
    if (response && typeof response === 'object' && Array.isArray(response.data)) {
      return response.data;
    }
    
    // If response has a results property that's an array
    if (response && typeof response === 'object' && Array.isArray(response.results)) {
      return response.results;
    }
    
    // If response has an items property that's an array
    if (response && typeof response === 'object' && Array.isArray(response.items)) {
      return response.items;
    }
    
    // If response has a list property that's an array
    if (response && typeof response === 'object' && Array.isArray(response.list)) {
      return response.list;
    }
    
    // If response is an object with values that should be an array
    if (response && typeof response === 'object') {
      // Try to find any array property
      const arrayKey = Object.keys(response).find(key => Array.isArray(response[key]));
      if (arrayKey) {
        return response[arrayKey];
      }
      
      // If the object itself looks like it should be an array of objects
      const values = Object.values(response);
      if (values.length > 0 && values.every(v => typeof v === 'object' && v !== null)) {
        return values as T[];
      }
    }
    
    // If nothing matches, return empty array
    console.warn("Could not extract array from API response:", response);
    return [];
  };

  // Fetch categories and subcategories from API
  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        setLoading(true);
        
        // Fetch sections (main categories)
        const sectionsResponse = await SectionAPI.getAll();
        console.log("Sections API Response:", sectionsResponse);
        
        // Extract sections array from response
        const sections: SectionData[] = extractArrayFromResponse<SectionData>(sectionsResponse);
        console.log("Extracted sections:", sections);
        
        // Fetch all subcategories
        const subcategoriesResponse = await SectionAPI.getAllSubcategories();
        console.log("Subcategories API Response:", subcategoriesResponse);
        
        // Extract subcategories array from response
        const allSubcategories: SubcategoryData[] = extractArrayFromResponse<SubcategoryData>(subcategoriesResponse);
        console.log("Extracted subcategories:", allSubcategories);
        
        // Transform API data to match our component structure
        const transformedCategories: Category[] = sections
          .filter((section: SectionData) => section.status === "YES") // Only show active sections
          .map((section: SectionData) => {
            // Get subcategories for this section
            const sectionSubcategories = allSubcategories
              .filter((sub: SubcategoryData) => {
                // Handle both section_id and sectionId properties
                const sectionId = sub.sectionId || (sub as any).section_id;
                return sectionId === section.id && sub.status === "YES"; // Only show active subcategories
              })
              .map((sub: SubcategoryData) => ({
                id: sub.id || "",
                name: sub.name,
                slug: sub.name.toLowerCase().replace(/\s+/g, '-'),
                description: sub.description || "",
                status: sub.status || "YES"
              }));

            return {
              id: section.id || "",
              name: section.name,
              slug: section.name.toLowerCase().replace(/\s+/g, '-'),
              description: section.description || "",
              hasDropdown: sectionSubcategories.length > 0,
              status: section.status || "YES",
              subCategories: sectionSubcategories
            };
          });

        console.log("Transformed categories:", transformedCategories);
        setCategories(transformedCategories);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching navigation data:", err);
        console.error("Error details:", err.message, err.response?.data);
        setError("Failed to load navigation data");
        
        // Fallback to default data if API fails
        setCategories(getFallbackCategories());
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationData();
  }, []);

  // Fallback categories in case API fails
  const getFallbackCategories = (): Category[] => {
    return [
      {
        id: "1",
        name: "Design Ideas",
        slug: "design-ideas",
        description: "We bring you carefully-curated interior design ideas",
        hasDropdown: true,
        status: "YES",
        subCategories: [
          {
            id: "1",
            name: "Kitchen",
            slug: "kitchen",
            description: "Modular Kitchen Designs",
            status: "YES"
          },
          {
            id: "2",
            name: "Living Room",
            slug: "living-room",
            description: "Living room designs",
            status: "YES"
          },
          {
            id: "3",
            name: "Master Bedroom",
            slug: "master-bedroom",
            description: "Master bedroom designs",
            status: "YES"
          },
          {
            id: "4",
            name: "Bathroom",
            slug: "bathroom",
            description: "Bathroom designs",
            status: "YES"
          },
          {
            id: "5",
            name: "Wardrobe",
            slug: "wardrobe",
            description: "Wardrobe designs",
            status: "YES"
          }
        ]
      },
      {
        id: "2",
        name: "Magazine",
        slug: "magazine",
        description: "Latest interior design trends and inspiration",
        hasDropdown: true,
        status: "YES",
        subCategories: [
          {
            id: "6",
            name: "Room Ideas",
            slug: "room-ideas",
            description: "Creative room design ideas",
            status: "YES"
          },
          {
            id: "7",
            name: "Decor & Inspiration",
            slug: "decor-inspiration",
            description: "Home decor tips and inspiration",
            status: "YES"
          }
        ]
      },
      {
        id: "3",
        name: "Projects",
        slug: "projects",
        description: "Our completed projects",
        hasDropdown: false,
        status: "YES"
      },
      {
        id: "4",
        name: "Store Locator",
        slug: "store-locator",
        description: "Find our stores near you",
        hasDropdown: false,
        status: "YES"
      },
      {
        id: "5",
        name: "More",
        slug: "more",
        description: "Additional information about us",
        hasDropdown: true,
        status: "YES",
        subCategories: [
          {
            id: "8",
            name: "About Us",
            slug: "about-us",
            description: "Learn more about our company",
            status: "YES"
          },
          {
            id: "9",
            name: "Contact Us",
            slug: "contact-us",
            description: "Get in touch with us",
            status: "YES"
          }
        ]
      }
    ];
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMobileMenu = (menuName: MenuKey) => {
    if (mobileOpenMenu === menuName) {
      setMobileOpenMenu(null);
    } else {
      setMobileOpenMenu(menuName);
    }
  };

  const handleMainMenuClick = (slug: string) => {
    navigate(`/${slug}`);
    setIsMenuOpen(false);
    setMobileOpenMenu(null);
  };

  const handleSubmenuClick = (mainSlug: string, subSlug: string) => {
    navigate(`/${mainSlug}/${subSlug}`);
    setIsMenuOpen(false);
    setMobileOpenMenu(null);
  };

  // Debug: Log current categories
  useEffect(() => {
    if (categories.length > 0) {
      console.log("Current categories in Navbar:", categories);
    }
  }, [categories]);

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="navbar-logo text-2xl font-bold whitespace-nowrap">
              <span className="text-gray-900">Aniwell</span>
              <span className="text-gray-600"> Interiors</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (error && categories.length === 0) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="navbar-logo text-2xl font-bold whitespace-nowrap">
              <span className="text-gray-900">Aniwell</span>
              <span className="text-gray-600"> Interiors</span>
            </Link>
            <div className="text-red-500 text-sm">{error}</div>
          </div>
        </div>
      </nav>
    );
  }

  // If no categories from API but no error, show fallback
  const displayCategories = categories.length > 0 ? categories : getFallbackCategories();

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => {
            setIsMenuOpen(false);
            setMobileOpenMenu(null);
          }}
        />
      )}

      <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="navbar-logo text-2xl font-bold whitespace-nowrap">
              <span className="text-gray-900">Aniwell</span>
              <span className="text-gray-600"> Interiors</span>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
              {displayCategories.map((category) => (
                <li key={category.id} className="relative group">
                  {category.hasDropdown ? (
                    <>
                      <button
                        className="flex items-center text-gray-700 hover:text-gray-900 transition-colors font-medium cursor-pointer py-2 px-2 whitespace-nowrap"
                        onClick={() => handleMainMenuClick(category.slug)}
                      >
                        {category.name}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      
                      {/* Dropdown */}
                      {category.subCategories && category.subCategories.length > 0 && (
                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                          <div className="py-2">
                            {category.subCategories.map((subCategory) => (
                              <button
                                key={subCategory.id}
                                onClick={() => handleSubmenuClick(category.slug, subCategory.slug)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                              >
                                {subCategory.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleMainMenuClick(category.slug)}
                      className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2 px-2 whitespace-nowrap"
                    >
                      {category.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setMobileOpenMenu(null);
              }}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden fixed left-0 right-0 top-16 bottom-0 bg-white z-40 overflow-y-auto">
              <div className="py-2 px-4">
                <ul className="space-y-1">
                  {displayCategories.map((category) => (
                    <li key={category.id} className="border-b border-gray-100 last:border-b-0">
                      {category.hasDropdown ? (
                        <>
                          <button
                            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 text-left rounded-lg transition-colors"
                            onClick={() => toggleMobileMenu(category.slug)}
                          >
                            <span className="font-medium">{category.name}</span>
                            <svg 
                              className={`w-5 h-5 transition-transform duration-200 ${mobileOpenMenu === category.slug ? 'transform rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </button>
                          
                          {/* Mobile Submenu */}
                          {mobileOpenMenu === category.slug && category.subCategories && category.subCategories.length > 0 && (
                            <div className="bg-gray-50 border-l-2 border-blue-500 ml-4 mt-1 rounded-r-lg">
                              <ul className="py-2 space-y-1">
                                {category.subCategories.map((subCategory) => (
                                  <li key={subCategory.id}>
                                    <button
                                      onClick={() => handleSubmenuClick(category.slug, subCategory.slug)}
                                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                      <svg className="w-3 h-3 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                      </svg>
                                      {subCategory.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      ) : (
                        <button
                          onClick={() => handleMainMenuClick(category.slug)}
                          className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 text-left rounded-lg transition-colors"
                        >
                          <span className="font-medium">{category.name}</span>
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;