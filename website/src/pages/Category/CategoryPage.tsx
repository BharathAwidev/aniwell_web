// src/pages/Category/CategoryPage.tsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SectionAPI } from '../../../api/section.api';
import type { SectionData, SubcategoryData } from '../../../api/section.api';

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
  designs: number;
  image: string;
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!category) {
        setError("Category parameter is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching category data for:", category);
        
        // Fetch all sections (main categories)
        const sectionsResponse = await SectionAPI.getAll();
        const allSubcategoriesResponse = await SectionAPI.getAllSubcategories();
        
        console.log("Raw Sections Response:", sectionsResponse);
        console.log("Raw Subcategories Response:", allSubcategoriesResponse);
        
        // Helper function to extract array from API response
        const extractArrayFromResponse = <T,>(response: any): T[] => {
          if (Array.isArray(response)) return response;
          if (response?.data && Array.isArray(response.data)) return response.data;
          if (response?.results && Array.isArray(response.results)) return response.results;
          if (response?.items && Array.isArray(response.items)) return response.items;
          if (response?.list && Array.isArray(response.list)) return response.list;
          
          // Try to find any array property
          if (response && typeof response === 'object') {
            for (const key in response) {
              if (Array.isArray(response[key])) {
                return response[key];
              }
            }
          }
          
          return [];
        };

        const sections: SectionData[] = extractArrayFromResponse<SectionData>(sectionsResponse);
        const allSubcategories: SubcategoryData[] = extractArrayFromResponse<SubcategoryData>(allSubcategoriesResponse);
        
        console.log("Extracted Sections:", sections);
        console.log("Extracted Subcategories:", allSubcategories);
        
        // Find the current category by slug (case-insensitive match)
        const currentCategory = sections.find((section: SectionData) => {
          // Clean the slug for comparison
          const sectionSlug = section.name?.toLowerCase().replace(/\s+/g, '-') || '';
          const urlSlug = category.toLowerCase();
          console.log(`Comparing: "${sectionSlug}" with URL: "${urlSlug}"`);
          return section.status === "YES" && sectionSlug === urlSlug;
        });

        console.log("Found current category:", currentCategory);

        if (!currentCategory) {
          // Show debug info to understand what's available
          const availableCategories = sections
            .filter(s => s.status === "YES")
            .map(s => ({
              name: s.name,
              slug: s.name?.toLowerCase().replace(/\s+/g, '-'),
              id: s.id,
              status: s.status
            }));
          
          setDebugInfo({
            requestedSlug: category,
            availableCategories,
            sectionsCount: sections.length,
            activeSectionsCount: sections.filter(s => s.status === "YES").length
          });
          
          console.log("Available categories:", availableCategories);
          setError("Category not found");
          setLoading(false);
          return;
        }

        // Get subcategories for this section
        const sectionSubcategories = allSubcategories
          .filter((sub: SubcategoryData) => {
            // Handle both section_id and sectionId properties
            const sectionId = sub.sectionId || (sub as any).section_id;
            const matches = sectionId === currentCategory.id && sub.status === "YES";
            if (matches) {
              console.log(`Matched subcategory: ${sub.name} for section: ${currentCategory.name}`);
            }
            return matches;
          })
          .map((sub: SubcategoryData, index: number) => {
            // Get a random design count for display
            const designCounts = [3044, 2164, 3202, 1420, 1631, 956, 1308, 892, 567];
            const randomDesigns = designCounts[Math.min(index, designCounts.length - 1)];
            
            return {
              id: sub.id || `sub-${index}`,
              name: sub.name,
              slug: sub.name?.toLowerCase().replace(/\s+/g, '-') || `sub-${index}`,
              description: sub.description || `Explore our collection of ${sub.name} designs`,
              status: sub.status || "YES",
              designs: randomDesigns,
              image: getCategoryImage(sub.name)
            };
          });

        console.log("Section subcategories found:", sectionSubcategories);

        // Transform category data
        const transformedCategory: Category = {
          id: currentCategory.id || "",
          name: currentCategory.name,
          slug: currentCategory.name?.toLowerCase().replace(/\s+/g, '-') || "",
          description: "We bring you carefully-curated interior design ideas, to give your home a brand new look. Explore exclusive interior designs and trends that are every bit inspirational as they are practical. Our team of interior designers have put together ideas across kitchen, bedroom, living room and more, to help you pick a design that will best suit your home interior requirements.",
          hasDropdown: sectionSubcategories.length > 0,
          status: currentCategory.status || "YES",
          subCategories: sectionSubcategories
        };

        console.log("Transformed category:", transformedCategory);
        setCategoryData(transformedCategory);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching category data:", err);
        console.error("Error stack:", err.stack);
        setError("Failed to load category data");
        setCategoryData(getFallbackCategory(category || ''));
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [category]);

  // Helper function to get appropriate image based on category name
  const getCategoryImage = (categoryName: string): string => {
    if (!categoryName) return 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop';
    
    const imageMap: Record<string, string> = {
      'kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
      'living room': 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&auto=format&fit=crop',
      'master bedroom': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop',
      'bathroom': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&auto=format&fit=crop',
      'wardrobe': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
      'study room': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
      'kids bedroom': 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&auto=format&fit=crop',
      'kid\'s bedroom': 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&auto=format&fit=crop',
      'tv unit': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop',
      'pooja room': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop',
      'dining room': 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop'
    };

    const lowerName = categoryName.toLowerCase().trim();
    
    // Check for exact match
    if (imageMap[lowerName]) {
      return imageMap[lowerName];
    }
    
    // Check for partial matches
    for (const key in imageMap) {
      if (lowerName.includes(key) || key.includes(lowerName)) {
        return imageMap[key];
      }
    }
    
    // Default interior design image
    return 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop';
  };

  // Fallback category data
  const getFallbackCategory = (categorySlug: string): Category | null => {
    const fallbackCategories: Record<string, Category> = {
      'design-ideas': {
        id: "1",
        name: "Home Interior Design",
        slug: "design-ideas",
        description: "We bring you carefully-curated interior design ideas, to give your home a brand new look. Explore exclusive interior designs and trends that are every bit inspirational as they are practical. Our team of interior designers have put together ideas across kitchen, bedroom, living room and more, to help you pick a design that will best suit your home interior requirements.",
        hasDropdown: true,
        status: "YES",
        subCategories: [
          {
            id: "1",
            name: "Kitchen",
            slug: "kitchen",
            description: "Modular Kitchen Designs are a seamless fusion of functionality and style.",
            status: "YES",
            designs: 3044,
            image: getCategoryImage('kitchen')
          },
          {
            id: "2",
            name: "Living Room",
            slug: "living-room",
            description: "Transform your living space with elegant and comfortable designs.",
            status: "YES",
            designs: 2164,
            image: getCategoryImage('living room')
          },
          {
            id: "3",
            name: "Master Bedroom",
            slug: "master-bedroom",
            description: "Create your perfect sanctuary with luxurious bedroom designs.",
            status: "YES",
            designs: 3202,
            image: getCategoryImage('master bedroom')
          },
          {
            id: "4",
            name: "Bathroom",
            slug: "bathroom",
            description: "Modern bathroom designs combining luxury and functionality.",
            status: "YES",
            designs: 1420,
            image: getCategoryImage('bathroom')
          }
        ]
      },
      'projects': {
        id: "2",
        name: "Projects",
        slug: "projects",
        description: "Explore our portfolio of completed interior design projects.",
        hasDropdown: false,
        status: "YES",
        subCategories: []
      },
      'store-locator': {
        id: "3",
        name: "Store Locator",
        slug: "store-locator",
        description: "Find our showrooms and stores near you.",
        hasDropdown: false,
        status: "YES",
        subCategories: []
      }
    };

    return fallbackCategories[categorySlug] || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
          </div>
          
          {/* Hero Section Skeleton */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-12">
            <div className="h-12 w-3/4 bg-gray-200 animate-pulse rounded mb-6"></div>
            <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded mb-8"></div>
            <div className="h-12 w-48 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Subcategories Grid Skeleton */}
          <div className="mb-8">
            <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-4"></div>
                    <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded mb-4"></div>
                    <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{error || "Category Not Found"}</h1>
          <p className="text-gray-600 mb-4">The category you're looking for doesn't exist or failed to load.</p>
          
          {/* Debug Information */}
          {debugInfo && (
            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">Debug Information:</h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Requested URL:</span> {category}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Available Categories:</span> {debugInfo.activeSectionsCount} active out of {debugInfo.sectionsCount} total
              </p>
              <ul className="space-y-1">
                {debugInfo.availableCategories.map((cat: any, index: number) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {cat.name} (slug: {cat.slug}, ID: {cat.id})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 inline-block">
              Go back home
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Try Again
            </button>
            <Link 
              to="/design-ideas" 
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 inline-block"
            >
              Go to Design Ideas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-semibold">{categoryData.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Home Interior Design
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mb-8">
            We bring you carefully-curated interior design ideas, to give your home a brand new look. Explore exclusive interior designs and trends that are every bit inspirational as they are practical. Our team of interior designers have put together ideas across kitchen, bedroom, living room and more, to help you pick a design that will best suit your home interior requirements.
          </p>
        </div>

        {/* Subcategories Grid */}
        {categoryData.subCategories && categoryData.subCategories.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Browse Categories</h2>
              <div className="text-gray-600">
                <span className="font-semibold">{categoryData.subCategories.length}</span> Categories Available
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.subCategories.map((subCategory) => (
                <Link
                  key={subCategory.id}
                  to={`/${categoryData.slug}/${subCategory.slug}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={subCategory.image} 
                      alt={subCategory.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold">{subCategory.name}</h3>
                      {subCategory.designs > 0 && (
                        <p className="text-lg font-medium">{subCategory.designs.toLocaleString()} Designs</p>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                        Popular
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2">{subCategory.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Explore Designs</span>
                      <svg className="w-6 h-6 text-blue-600 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Content Coming Soon</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We're working on amazing content for {categoryData.name}. Check back soon for updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;