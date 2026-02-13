// import { useParams, Link, useNavigate } from "react-router-dom";
// import { getSubCategory, getCategoryBySlug } from "../../data/categories";
// import { useState, useEffect } from "react";
// import PopupForm from "../../components/PopupForm";

// const SubCategoryPage = () => {
//   const { category, subCategory } = useParams<{
//     category: string;
//     subCategory: string;
//   }>();
//   const subCategoryData = getSubCategory(category || "", subCategory || "");
//   const categoryData = getCategoryBySlug(category || "");
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(subCategory || "");
//   const [showPopup, setShowPopup] = useState(false);

//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   if (!subCategoryData || !categoryData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
//         <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
//           <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg
//               className="w-10 h-10 text-orange-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//               ></path>
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             Subcategory Not Found
//           </h1>
//           <p className="text-gray-600 mb-6">
//             The page you're looking for doesn't exist.
//           </p>
//           <Link
//             to={`/${category}`}
//             className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
//           >
//             <svg
//               className="w-5 h-5 mr-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//               ></path>
//             </svg>
//             Go back to {category?.replace("-", " ") || "Home"}
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleSubCategoryClick = (slug: string) => {
//     setActiveTab(slug);
//     navigate(`/${category}/${slug}`);
//   };

//   const handleBookConsultation = () => {
//     setShowPopup(true);
//   };

//   const handleGetQuote = () => {
//     window.scrollTo(0, 0);
//     navigate("/get-quote");
//   };

//   // Function to navigate to design detail page - fixed type conversion
//   const handleViewDesignDetails = (designId: number | string) => {
//     navigate(`/${category}/${subCategory}/${designId.toString()}`);
//   };

//   // Function to handle card click - direct navigation
//   const handleCardClick = (itemId: number | string) => {
//     handleViewDesignDetails(itemId);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Popup Form */}
//       {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

//       <div className="container mx-auto px-4 py-8 md:py-12">
//         {/* Breadcrumb */}
//         <nav className="mb-6 md:mb-8">
//           <div className="flex items-center text-sm md:text-base">
//             <Link
//               to="/"
//               className="text-gray-600 hover:text-orange-600 transition-colors flex items-center"
//             >
//               <svg
//                 className="w-4 h-4 mr-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                 ></path>
//               </svg>
//               Home
//             </Link>
//             <span className="mx-2 text-gray-400">/</span>
//             <Link
//               to={`/${category}`}
//               className="text-gray-600 hover:text-orange-600 transition-colors capitalize"
//             >
//               {category?.replace("-", " ")}
//             </Link>
//             <span className="mx-2 text-gray-400">/</span>
//             <span className="text-gray-900 font-semibold">
//               {subCategoryData.name}
//             </span>
//           </div>
//         </nav>

//         {/* Simple Horizontal Subcategory Navigation */}
//         {categoryData.subCategories &&
//           categoryData.subCategories.length > 0 && (
//             <div className="mb-10 md:mb-14 border-b border-gray-200">
//               <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-2 scrollbar-hide">
//                 {categoryData.subCategories.map((subCat) => (
//                   <div
//                     key={subCat.id}
//                     onClick={() => handleSubCategoryClick(subCat.slug)}
//                     className={`flex-shrink-0 pb-4 relative cursor-pointer select-none ${activeTab === subCat.slug ? "text-gray-900" : "text-gray-600"}`}
//                   >
//                     <span className="text-base md:text-lg font-medium whitespace-nowrap px-2">
//                       {subCat.name}
//                     </span>
//                     {activeTab === subCat.slug && (
//                       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 mb-12 md:mb-16 border border-orange-100">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12">
//             <div className="flex-1">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
//                 {subCategoryData.name} Designs
//               </h1>
//               <div className="max-w-3xl">
//                 <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
//                   <span className="font-bold text-gray-900">
//                     What are {subCategoryData.name} Designs?
//                   </span>{" "}
//                   {subCategoryData.description}
//                 </p>
//                 {subCategoryData.designs > 0 && (
//                   <div className="flex flex-wrap gap-3 md:gap-4">
//                     <span className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
//                       <span className="font-bold">
//                         {subCategoryData.designs.toLocaleString()}+
//                       </span>{" "}
//                       Designs
//                     </span>
//                     <span className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
//                       <span className="font-bold">Free</span> Consultation
//                     </span>
//                     <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
//                       <span className="font-bold">3D</span> Visualization
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="lg:w-2/5">
//               <div className="relative">
//                 <img
//                   src={subCategoryData.image}
//                   alt={subCategoryData.name}
//                   className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl md:rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl md:rounded-2xl"></div>
//                 <div className="absolute bottom-4 left-4 right-4">
//                   <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
//                     <p className="text-gray-800 font-semibold text-center">
//                       Premium {subCategoryData.name} Design Examples
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Design Items Section */}
//         <div className="mb-16 md:mb-20">
//           {subCategoryData.items && subCategoryData.items.length > 0 ? (
//             <>
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4">
//                 <div>
//                   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//                     Popular {subCategoryData.name} Designs
//                   </h2>
//                   <p className="text-gray-600 text-lg">
//                     Browse our curated collection of premium designs
//                   </p>
//                 </div>
//                 <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-100 transition-all duration-300 border border-gray-200">
//                   View All Designs
//                   <svg
//                     className="w-5 h-5 ml-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M14 5l7 7m0 0l-7 7m7-7H3"
//                     ></path>
//                   </svg>
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
//                 {subCategoryData.items.map((item) => (
//                   <div
//                     key={item.id}
//                     onClick={() => handleCardClick(item.id)}
//                     className="group bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2 cursor-pointer"
//                   >
//                     <div className="relative h-72 md:h-80 overflow-hidden">
//                       <img
//                         src={item.image}
//                         alt={item.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
//                       <div className="absolute top-4 right-4">
//                         <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold shadow-lg">
//                           {item.style}
//                         </span>
//                       </div>
//                       <div className="absolute bottom-4 left-4">
//                         <span className="bg-gradient-to-r from-black/80 to-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
//                           {item.size}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="p-6 md:p-8">
//                       <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
//                         {item.title}
//                       </h3>
//                       <p className="text-gray-600 mb-6 text-base line-clamp-2 leading-relaxed">
//                         {item.description}
//                       </p>

//                       <div className="mb-6 md:mb-8">
//                         <div className="flex flex-wrap gap-2">
//                           {item.features.map((feature, index) => (
//                             <span
//                               key={index}
//                               className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm border border-gray-200 font-medium"
//                             >
//                               {feature}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="flex flex-col gap-3">
//                         {/* Two buttons in one row - Responsive */}
//                         <div className="flex flex-col xs:flex-row gap-3">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleBookConsultation();
//                             }}
//                             className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-sm md:text-base flex items-center justify-center shadow-md hover:shadow-lg whitespace-nowrap overflow-hidden"
//                           >
//                             <svg
//                               className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                               ></path>
//                             </svg>
//                             <span className="truncate">BOOK FREE CONSULTATION</span>
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleGetQuote();
//                             }}
//                             className="flex-1 bg-white text-orange-600 hover:text-orange-700 font-semibold py-3 px-4 rounded-xl border-2 border-orange-500 hover:border-orange-600 transition-all duration-300 text-sm md:text-base flex items-center justify-center whitespace-nowrap overflow-hidden hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50"
//                           >
//                             <svg
//                               className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                               ></path>
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                               ></path>
//                             </svg>
//                             <span className="truncate">GET QUOTE</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Load More Button */}
//               <div className="text-center mt-12 md:mt-16">
//                 <button className="inline-flex items-center px-10 py-4 bg-white text-orange-600 hover:text-orange-700 font-semibold rounded-xl border-2 border-orange-500 hover:border-orange-600 transition-all duration-300 text-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50">
//                   <svg
//                     className="w-5 h-5 mr-3"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                     ></path>
//                   </svg>
//                   Load More Designs
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-10 md:p-16 text-center border border-gray-200">
//               <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
//                 <svg
//                   className="w-12 h-12 md:w-14 md:h-14 text-orange-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                   ></path>
//                 </svg>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Designs Coming Soon
//               </h2>
//               <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
//                 We're currently adding amazing {subCategoryData.name} designs to
//                 our collection. Stay tuned for exciting new additions!
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button
//                   onClick={handleBookConsultation}
//                   className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-all duration-300 text-base shadow-md hover:shadow-lg whitespace-nowrap"
//                 >
//                   <svg
//                     className="w-5 h-5 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     ></path>
//                   </svg>
//                   BOOK FREE CONSULTATION
//                 </button>
//                 <button
//                   onClick={handleGetQuote}
//                   className="inline-flex items-center px-6 py-3 bg-white text-orange-600 hover:text-orange-700 font-semibold rounded-xl border-2 border-orange-500 hover:border-orange-600 transition-all duration-300 text-base hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 whitespace-nowrap"
//                 >
//                   <svg
//                     className="w-5 h-5 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     ></path>
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     ></path>
//                   </svg>
//                   GET QUOTE
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategoryPage;













// src/pages/Category/SubCategoryPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PopupForm from "../../components/PopupForm";
import { ServiceAPI, type ServiceData } from "../../../api/service.api";
import { SectionAPI, type SubcategoryData } from "../../../api/section.api";
import { ChevronRight } from "lucide-react";

interface DesignItem {
  id: string;
  title: string;
  description: string;
  style: string;
  size: string;
  image: string;
  features: string[];
}

interface TransformedSubcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  designs: number;
  image: string;
  items: DesignItem[];
}

const SubCategoryPage = () => {
  const { category, subCategory } = useParams<{
    category: string;
    subCategory: string;
  }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(subCategory || "");
  const [showPopup, setShowPopup] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState<TransformedSubcategory | null>(null);
  const [categorySubcategories, setCategorySubcategories] = useState<SubcategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch subcategory data and services
  useEffect(() => {
    const fetchData = async () => {
      if (!category || !subCategory) {
        setError("Category or subcategory parameter is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        console.log("Fetching data for:", { category, subCategory });
        
        // Fetch all subcategories for the current category
        const subcategoriesResponse = await SectionAPI.getAllSubcategories();
        const servicesResponse = await ServiceAPI.getAll();

        console.log("Subcategories API Response:", subcategoriesResponse);
        console.log("Services API Response:", servicesResponse);

        // Helper function to extract array from API response
        const extractArrayFromResponse = <T,>(response: any): T[] => {
          // Try different response structures
          if (Array.isArray(response)) return response;
          if (response?.data && Array.isArray(response.data)) return response.data;
          if (response?.result?.data && Array.isArray(response.result.data)) return response.result.data;
          if (response?.items && Array.isArray(response.items)) return response.items;
          if (response?.list && Array.isArray(response.list)) return response.list;
          
          // For Axios responses
          if (response?.data?.result?.data && Array.isArray(response.data.result.data)) {
            return response.data.result.data;
          }
          if (response?.data?.data && Array.isArray(response.data.data)) {
            return response.data.data;
          }
          
          // Direct object access
          if (response && typeof response === 'object') {
            // Check if it's the services response structure
            if (response.result && response.result.data && Array.isArray(response.result.data)) {
              return response.result.data;
            }
            for (const key in response) {
              if (Array.isArray(response[key])) {
                return response[key];
              }
            }
          }
          
          console.warn("Could not extract array from response:", response);
          return [];
        };

        const allSubcategories: SubcategoryData[] = extractArrayFromResponse<SubcategoryData>(subcategoriesResponse);
        
        // For services, we need to handle the API response structure differently
        let allServices: ServiceData[] = [];
        
        if (servicesResponse?.data?.result?.data && Array.isArray(servicesResponse.data.result.data)) {
          allServices = servicesResponse.data.result.data;
        } else if (servicesResponse?.result?.data && Array.isArray(servicesResponse.result.data)) {
          allServices = servicesResponse.result.data;
        } else if (Array.isArray(servicesResponse)) {
          allServices = servicesResponse;
        } else if (servicesResponse?.data && Array.isArray(servicesResponse.data)) {
          allServices = servicesResponse.data;
        }

        console.log("All Subcategories:", allSubcategories);
        console.log("All Services:", allServices);

        // Find current category and subcategory
        const currentSubcategory = allSubcategories.find((sub: SubcategoryData) => {
          const subSlug = sub.name?.toLowerCase().replace(/\s+/g, '-') || '';
          const urlSlug = subCategory.toLowerCase();
          const match = sub.status === "YES" && subSlug === urlSlug;
          console.log(`Checking subcategory: ${sub.name} (slug: ${subSlug}) against URL: ${urlSlug} - Match: ${match}`);
          return match;
        });

        if (!currentSubcategory) {
          console.error("Current subcategory not found!");
          setError("Subcategory not found");
          setLoading(false);
          return;
        }

        console.log("Found current subcategory:", currentSubcategory);

        // Get all subcategories for this category
        const sectionSubcategories = allSubcategories
          .filter((sub: SubcategoryData) => {
            // Use both sectionId and section_id for compatibility
            const sectionId = sub.sectionId || sub.section_id;
            const currentSectionId = currentSubcategory.sectionId || currentSubcategory.section_id;
            const match = sectionId === currentSectionId && sub.status === "YES";
            console.log(`Filtering subcategory: ${sub.name}, sectionId: ${sectionId}, currentSectionId: ${currentSectionId}, match: ${match}`);
            return match;
          });

        console.log("Section subcategories:", sectionSubcategories);

        // Get services for this subcategory
        const subcategoryServices = allServices.filter((service: ServiceData) => {
          console.log("Service category_id:", service.category_id, "Type:", typeof service.category_id);
          console.log("Current subcategory ID:", currentSubcategory.id, "Type:", typeof currentSubcategory.id);
          
          // Try both string comparison and number comparison
          const match = service.category_id === currentSubcategory.id || 
                       service.category_id?.toString() === currentSubcategory.id?.toString();
          console.log(`Checking service: ${service.title}, category_id: ${service.category_id}, subcategory.id: ${currentSubcategory.id}, match: ${match}`);
          return match;
        });

        console.log("Subcategory services:", subcategoryServices);

        // Transform subcategory data
        const transformedSubcategory: TransformedSubcategory = {
          id: currentSubcategory.id || "",
          name: currentSubcategory.name,
          slug: currentSubcategory.name?.toLowerCase().replace(/\s+/g, '-') || "",
          description: currentSubcategory.description || `Explore our collection of ${currentSubcategory.name} designs that combine functionality with aesthetic appeal.`,
          designs: subcategoryServices.length,
          image: getCategoryImage(currentSubcategory.name),
          items: subcategoryServices.map((service: ServiceData, index: number) => {
            const item = {
              id: service.id,
              title: service.title || `${currentSubcategory.name} Design ${index + 1}`,
              description: service.description || `A beautiful ${currentSubcategory.name} design combining style and functionality.`,
              style: service.style || "Contemporary",
              size: service.dimension || "Custom Size",
              image: ServiceAPI.getServiceImages(service.id)[0] || getCategoryImage(currentSubcategory.name),
              features: ["Modern Design", "High Quality", "Customizable"]
            };
            console.log(`Transformed service ${index + 1}:`, item);
            return item;
          })
        };

        console.log("Transformed subcategory data:", transformedSubcategory);

        setSubCategoryData(transformedSubcategory);
        setCategorySubcategories(sectionSubcategories);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching subcategory data:", err);
        setError("Failed to load subcategory data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, subCategory]);

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

  const handleSubCategoryClick = (slug: string) => {
    setActiveTab(slug);
    navigate(`/${category}/${slug}`);
  };

  const handleBookConsultation = () => {
    setShowPopup(true);
  };

  const handleGetQuote = () => {
    window.scrollTo(0, 0);
    navigate("/get-quote");
  };

  // Function to navigate to design detail page
  const handleViewDesignDetails = (designId: string) => {
    navigate(`/${category}/${subCategory}/${designId}`);
  };

  // Function to handle card click - direct navigation
  const handleCardClick = (itemId: string) => {
    handleViewDesignDetails(itemId);
  };

  // Add this to check the data when component renders
  useEffect(() => {
    if (subCategoryData) {
      console.log("Current subCategoryData for UI:", subCategoryData);
      console.log("Items count:", subCategoryData.items.length);
      console.log("Items:", subCategoryData.items);
    }
  }, [subCategoryData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb Skeleton */}
          <nav className="mb-6 md:mb-8">
            <div className="flex items-center">
              <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
              <div className="mx-2 h-4 w-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
              <div className="mx-2 h-4 w-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </nav>

          {/* Hero Section Skeleton */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 mb-12 md:mb-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12">
              <div className="flex-1">
                <div className="h-12 w-3/4 bg-orange-100 animate-pulse rounded mb-6"></div>
                <div className="h-6 w-full bg-orange-100 animate-pulse rounded mb-4"></div>
                <div className="h-6 w-2/3 bg-orange-100 animate-pulse rounded mb-4"></div>
              </div>
              <div className="lg:w-2/5">
                <div className="h-64 md:h-80 lg:h-96 bg-orange-100 animate-pulse rounded-xl"></div>
              </div>
            </div>
          </div>

          {/* Design Items Skeleton - Show 3 skeleton items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="h-48 bg-gray-200 animate-pulse rounded-xl mb-6"></div>
                <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded mb-6"></div>
                <div className="h-10 bg-gray-200 animate-pulse rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !subCategoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {error || "Subcategory Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist.
          </p>
          <Link
            to={`/${category || '/'}`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Go back to {category?.replace("-", " ") || "Home"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Popup Form */}
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8">
          <div className="flex items-center text-sm md:text-base">
            <Link
              to="/"
              className="text-gray-600 hover:text-orange-600 transition-colors flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              to={`/${category}`}
              className="text-gray-600 hover:text-orange-600 transition-colors capitalize"
            >
              {category?.replace("-", " ")}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">
              {subCategoryData.name}
            </span>
          </div>
        </nav>

        {/* Debug Info - Remove in production */}
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Debug Info: {subCategoryData.items.length} items found
          </p>
        </div>

        {/* Simple Horizontal Subcategory Navigation */}
        {categorySubcategories.length > 0 && (
          <div className="mb-10 md:mb-14 border-b border-gray-200">
            <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-2 scrollbar-hide">
              {categorySubcategories.map((subCat) => (
                <div
                  key={subCat.id}
                  onClick={() => handleSubCategoryClick(subCat.name?.toLowerCase().replace(/\s+/g, '-') || '')}
                  className={`flex-shrink-0 pb-4 relative cursor-pointer select-none ${activeTab === (subCat.name?.toLowerCase().replace(/\s+/g, '-') || '') ? "text-gray-900" : "text-gray-600"}`}
                >
                  <span className="text-base md:text-lg font-medium whitespace-nowrap px-2">
                    {subCat.name}
                  </span>
                  {activeTab === (subCat.name?.toLowerCase().replace(/\s+/g, '-') || '') && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 mb-12 md:mb-16 border border-orange-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {subCategoryData.name} Designs
              </h1>
              <div className="max-w-3xl">
                <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  <span className="font-bold text-gray-900">
                    What are {subCategoryData.name} Designs?
                  </span>{" "}
                  {subCategoryData.description}
                </p>
                {subCategoryData.designs > 0 && (
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <span className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
                      <span className="font-bold">
                        {subCategoryData.designs.toLocaleString()}+
                      </span>{" "}
                      Designs
                    </span>
                    <span className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
                      <span className="font-bold">Free</span> Consultation
                    </span>
                    <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
                      <span className="font-bold">3D</span> Visualization
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:w-2/5">
              <div className="relative">
                <img
                  src={subCategoryData.image}
                  alt={subCategoryData.name}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl md:rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl md:rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <p className="text-gray-800 font-semibold text-center">
                      Premium {subCategoryData.name} Design Examples
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Items Section */}
        <div className="mb-16 md:mb-20">
          {subCategoryData.items.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Popular {subCategoryData.name} Designs
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Browse our curated collection of premium designs
                  </p>
                </div>
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-100 transition-all duration-300 border border-gray-200">
                  View All Designs
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {subCategoryData.items.map((item) => {
                  console.log("Rendering item:", item); // Debug
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleCardClick(item.id)}
                      className="group bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2 cursor-pointer"
                    >
                      <div className="relative h-72 md:h-80 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            console.log("Image error for:", item.title);
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                            {item.style}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-gradient-to-r from-black/80 to-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                            {item.size}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 md:p-8">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-6 text-base line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="mb-6 md:mb-8">
                          <div className="flex flex-wrap gap-2">
                            {item.features.map((feature, index) => (
                              <span
                                key={index}
                                className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm border border-gray-200 font-medium"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          {/* Two buttons in one row - Responsive */}
                          <div className="flex flex-col xs:flex-row gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookConsultation();
                              }}
                              className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-sm md:text-base flex items-center justify-center shadow-md hover:shadow-lg whitespace-nowrap overflow-hidden"
                            >
                              <svg
                                className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                              </svg>
                              <span className="truncate">BOOK FREE CONSULTATION</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleGetQuote();
                              }}
                              className="flex-1 bg-white text-orange-600 hover:text-orange-700 font-semibold py-3 px-4 rounded-xl border-2 border-orange-500 hover:border-orange-600 transition-all duration-300 text-sm md:text-base flex items-center justify-center whitespace-nowrap overflow-hidden hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50"
                            >
                              <svg
                                className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                ></path>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                              </svg>
                              <span className="truncate">GET QUOTE</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12 md:mt-16">
                <button className="inline-flex items-center px-10 py-4 bg-white text-orange-600 hover:text-orange-700 font-semibold rounded-xl border-2 border-orange-500 hover:border-orange-600 transition-all duration-300 text-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  Load More Designs
                </button>
              </div>
            </>
          ) : (
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-10 md:p-16 text-center border border-gray-200">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg
                  className="w-12 h-12 md:w-14 md:h-14 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Designs Coming Soon
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                We're currently adding amazing {subCategoryData.name} designs to
                our collection. Stay tuned for exciting new additions!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleBookConsultation}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-xl transition-all duration-300 text-base shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  BOOK FREE CONSULTATION
                </button>
                <button
                  onClick={handleGetQuote}
                  className="inline-flex items-center px-6 py-3 bg-white text-orange-600 hover:text-orange-700 font-semibold rounded-xl border-2 border-orange-500 hover:border-orange-600 transition-all duration-300 text-base hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 whitespace-nowrap"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  GET QUOTE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;