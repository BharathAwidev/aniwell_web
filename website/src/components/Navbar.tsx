// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SectionAPI } from "../../api/section.api";
import { type SectionData, type SubcategoryData } from "../../api/section.api";

// Import your logo image
import logo from "../assets/logo.png"; // Adjust path as needed

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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Set initial state
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Fetch categories and subcategories from API
  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        setLoading(true);
        
        const sectionsResponse = await SectionAPI.getAll();
        const sections: SectionData[] = extractArrayFromResponse<SectionData>(sectionsResponse);
        
        const subcategoriesResponse = await SectionAPI.getAllSubcategories();
        const allSubcategories: SubcategoryData[] = extractArrayFromResponse<SubcategoryData>(subcategoriesResponse);
        
        const transformedCategories: Category[] = sections
          .filter((section: SectionData) => section.status === "YES")
          .map((section: SectionData) => {
            const sectionSubcategories = allSubcategories
              .filter((sub: SubcategoryData) => {
                const sectionId = sub.sectionId || (sub as any).section_id;
                return sectionId === section.id && sub.status === "YES";
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

        setCategories(transformedCategories);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching navigation data:", err);
        setError("Failed to load navigation data");
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
        name: "About",
        slug: "about",
        description: "Learn more about our company",
        hasDropdown: false,
        status: "YES"
      },
      {
        id: "6",
        name: "Contact",
        slug: "contact",
        description: "Get in touch with us",
        hasDropdown: false,
        status: "YES"
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

  if (loading) {
    return (
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white py-3'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="hidden sm:block">
                <div className="h-6 w-36 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
              </div>
            </div>
            <div className="hidden lg:flex space-x-4">
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
            </div>
            <div className="lg:hidden">
              <div className="h-8 w-8 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const displayCategories = categories.length > 0 ? categories : getFallbackCategories();

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => {
            setIsMenuOpen(false);
            setMobileOpenMenu(null);
          }}
        />
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-1 border-b border-gray-100' 
          : 'bg-white/95 backdrop-blur-sm py-2'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center space-x-3 group">
              {/* Logo Image */}
              <div className="flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Aniwell Interiors" 
                  className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                />
              </div>
              {/* Brand Name - Visible on larger screens */}
              {/* <div className="hidden sm:flex flex-col">
                <span className="text-xl font-bold text-gray-900 tracking-tight leading-tight">Aniwell Interiors</span>
                <span className="text-xs font-light text-gray-600 leading-tight">Your Dream Our Design</span>
              </div> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {displayCategories.map((category) => (
                <div key={category.id} className="relative group">
                  {category.hasDropdown ? (
                    <>
                      <button
                        className="flex items-center text-gray-700 hover:text-blue-700 transition-all duration-200 font-medium cursor-pointer py-2 px-3 xl:px-4 whitespace-nowrap group"
                        onClick={() => handleMainMenuClick(category.slug)}
                      >
                        <span className="font-medium text-sm xl:text-base">{category.name}</span>
                        <svg 
                          className="w-4 h-4 ml-1 text-gray-500 group-hover:text-blue-700 transition-transform duration-200" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {category.subCategories && category.subCategories.length > 0 && (
                        <div className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100 overflow-hidden">
                          <div className="py-2">
                            <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">{category.name}</span>
                            </div>
                            {category.subCategories.map((subCategory) => (
                              <button
                                key={subCategory.id}
                                onClick={() => handleSubmenuClick(category.slug, subCategory.slug)}
                                className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50/50 transition-colors duration-150 border-b border-gray-50 last:border-b-0"
                              >
                                <div className="flex items-center">
                                  <span className="flex-1 font-medium">{subCategory.name}</span>
                                </div>
                                {subCategory.description && (
                                  <p className="text-xs text-gray-500 mt-1 truncate">{subCategory.description}</p>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleMainMenuClick(category.slug)}
                      className="text-gray-700 hover:text-blue-700 transition-all duration-200 font-medium py-2 px-3 xl:px-4 whitespace-nowrap text-sm xl:text-base"
                    >
                      {category.name}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-gray-100 transition-colors duration-200 relative z-50"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setMobileOpenMenu(null);
              }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`lg:hidden fixed inset-0 top-16 bottom-0 bg-white z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="p-4 h-full flex flex-col">
              {/* Mobile Logo and Brand */}
              {/* <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-100">
                <img 
                  src={logo} 
                  alt="Aniwell Interiors" 
                  className="h-12 w-auto object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">Aniwell Interiors</span>
                  <span className="text-xs font-light text-gray-600">Premium Interior Solutions</span>
                </div>
              </div> */}

              {/* Mobile Categories List */}
              <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {displayCategories.map((category) => (
                    <li key={category.id} className="rounded-lg overflow-hidden">
                      {category.hasDropdown ? (
                        <>
                          <button
                            className="flex items-center justify-between w-full px-4 py-3 text-gray-900 hover:text-blue-700 text-left transition-colors duration-200"
                            onClick={() => toggleMobileMenu(category.slug)}
                          >
                            <div className="flex items-center">
                              <div className="text-left">
                                <span className="font-semibold text-gray-900 block">{category.name}</span>
                                <span className="text-xs text-gray-600 mt-0.5 line-clamp-1">{category.description}</span>
                              </div>
                            </div>
                            <svg 
                              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                mobileOpenMenu === category.slug ? 'transform rotate-180 text-blue-700' : ''
                              }`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </button>
                          
                          {/* Mobile Submenu */}
                          {mobileOpenMenu === category.slug && category.subCategories && category.subCategories.length > 0 && (
                            <div className="ml-4 mt-1 mb-2">
                              <ul className="space-y-1 p-2">
                                {category.subCategories.map((subCategory) => (
                                  <li key={subCategory.id}>
                                    <button
                                      onClick={() => handleSubmenuClick(category.slug, subCategory.slug)}
                                      className="flex items-center w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:text-blue-700 transition-colors duration-150"
                                    >
                                      <div className="flex-1 text-left">
                                        <span className="font-medium block">{subCategory.name}</span>
                                        {subCategory.description && (
                                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{subCategory.description}</p>
                                        )}
                                      </div>
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
                          className="flex items-center w-full px-4 py-3 text-gray-900 hover:text-blue-700 text-left transition-colors duration-200"
                        >
                          <div className="text-left">
                            <span className="font-semibold text-gray-900 block">{category.name}</span>
                            <span className="text-xs text-gray-600 mt-0.5 line-clamp-1">{category.description}</span>
                          </div>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile Footer Note */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} Aniwell Interiors. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;