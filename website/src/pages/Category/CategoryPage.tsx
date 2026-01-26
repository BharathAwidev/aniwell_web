// src/pages/Category/CategoryPage.tsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SectionAPI } from '../../../api/section.api';
import type { SectionData, SubcategoryData } from '../../../api/section.api';
import { ChevronRight, Sparkles } from 'lucide-react';

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

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!category) {
        setError("Category parameter is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch all sections (main categories)
        const sectionsResponse = await SectionAPI.getAll();
        const allSubcategoriesResponse = await SectionAPI.getAllSubcategories();
        
        // Helper function to extract array from API response
        const extractArrayFromResponse = <T,>(response: any): T[] => {
          if (Array.isArray(response)) return response;
          if (response?.data && Array.isArray(response.data)) return response.data;
          if (response?.results && Array.isArray(response.results)) return response.results;
          if (response?.items && Array.isArray(response.items)) return response.items;
          if (response?.list && Array.isArray(response.list)) return response.list;
          
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
        
        // Find the current category by slug (case-insensitive match)
        const currentCategory = sections.find((section: SectionData) => {
          const sectionSlug = section.name?.toLowerCase().replace(/\s+/g, '-') || '';
          const urlSlug = category.toLowerCase();
          return section.status === "YES" && sectionSlug === urlSlug;
        });

        if (!currentCategory) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        // Get subcategories for this section
        const sectionSubcategories = allSubcategories
          .filter((sub: SubcategoryData) => {
            const sectionId = sub.sectionId || (sub as any).section_id;
            return sectionId === currentCategory.id && sub.status === "YES";
          })
          .map((sub: SubcategoryData, index: number) => {
            const designCounts = [3044, 2164, 3202, 1420, 1631];
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

        setCategoryData(transformedCategory);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching category data:", err);
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
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-16 bg-gray-100 animate-pulse rounded"></div>
              <ChevronRight className="w-4 h-4 text-gray-200" />
              <div className="h-4 w-32 bg-gray-100 animate-pulse rounded"></div>
            </div>
          </div>
          
          {/* Hero Section Skeleton */}
          <div className="bg-gray-50 rounded-2xl p-8 mb-12">
            <div className="h-8 w-48 bg-gray-100 animate-pulse rounded mb-6"></div>
            <div className="h-12 w-3/4 bg-gray-100 animate-pulse rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-100 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded mb-8"></div>
          </div>

          {/* Subcategories Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100">
                <div className="h-56 bg-gray-100 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-100 animate-pulse rounded mb-4"></div>
                  <div className="h-4 w-full bg-gray-100 animate-pulse rounded mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-100 animate-pulse rounded mb-4"></div>
                  <div className="h-6 w-32 bg-gray-100 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">{error || "Category Not Found"}</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">The category you're looking for doesn't exist.</p>
          
          <Link to="/" className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center gap-2">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-gray-900 font-medium">{categoryData.name}</span>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
              {categoryData.name}
            </h1>
          </div>
          
          <p className="text-gray-600 max-w-3xl leading-relaxed">
            {categoryData.description}
          </p>
        </div>

        {/* Subcategories Grid */}
        {categoryData.subCategories && categoryData.subCategories.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Explore Designs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.subCategories.map((subCategory) => (
                <Link
                  key={subCategory.id}
                  to={`/${categoryData.slug}/${subCategory.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={subCategory.image} 
                      alt={subCategory.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-900">
                        {subCategory.designs.toLocaleString()} Designs
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {subCategory.name}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors duration-300" />
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{subCategory.description}</p>
                    <span className="text-sm font-medium text-gray-900">
                      View Designs →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Coming Soon</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              We're currently working on amazing designs for {categoryData.name}.
            </p>
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Need help with your interior design?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team of experts is here to help you create the perfect space.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
            Book Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;