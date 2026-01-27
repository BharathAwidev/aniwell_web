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
//           <div className="w-20 h-20 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <svg
//               className="w-10 h-10 text-teal-600"
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
//             className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
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
//     // Scroll to top first, then navigate
//     window.scrollTo(0, 0);
//     navigate("/get-quote");
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
//               className="text-gray-600 hover:text-teal-600 transition-colors flex items-center"
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
//               className="text-gray-600 hover:text-teal-600 transition-colors capitalize"
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
//                       <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 mb-12 md:mb-16 border border-teal-100">
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
//                     <span className="bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
//                       <span className="font-bold">
//                         {subCategoryData.designs.toLocaleString()}+
//                       </span>{" "}
//                       Designs
//                     </span>
//                     <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
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
//                     className="group bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2"
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

//                       {/* Two buttons in one row - Responsive */}
//                       <div className="flex flex-col xs:flex-row gap-3">
//                         <button
//                           onClick={handleBookConsultation}
//                           className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-sm md:text-base flex items-center justify-center shadow-md hover:shadow-lg whitespace-nowrap overflow-hidden"
//                         >
//                           <svg
//                             className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             ></path>
//                           </svg>
//                           <span className="truncate">BOOK FREE CONSULTATION</span>
//                         </button>
//                         <button
//                           onClick={handleGetQuote}
//                           className="flex-1 bg-white text-teal-600 hover:text-teal-700 font-semibold py-3 px-4 rounded-xl border-2 border-teal-500 hover:border-teal-600 transition-all duration-300 text-sm md:text-base flex items-center justify-center whitespace-nowrap overflow-hidden hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50"
//                         >
//                           <svg
//                             className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                             ></path>
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                             ></path>
//                           </svg>
//                           <span className="truncate">GET QUOTE</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Load More Button */}
//               <div className="text-center mt-12 md:mt-16">
//                 <button className="inline-flex items-center px-10 py-4 bg-white text-teal-600 hover:text-teal-700 font-semibold rounded-xl border-2 border-teal-500 hover:border-teal-600 transition-all duration-300 text-lg hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50">
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
//               <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
//                 <svg
//                   className="w-12 h-12 md:w-14 md:h-14 text-teal-600"
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
//                   className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 text-base shadow-md hover:shadow-lg whitespace-nowrap"
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
//                   className="inline-flex items-center px-6 py-3 bg-white text-teal-600 hover:text-teal-700 font-semibold rounded-xl border-2 border-teal-500 hover:border-teal-600 transition-all duration-300 text-base hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 whitespace-nowrap"
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




import { useEffect, useState, useRef } from "react";
import video from '../../assets/Aniwell_Logo.mp4';
import PopupForm from "../../components/PopupForm"; // Import the PopupForm component

const slides = [
  {
    type: "video",
    source: video,
    title: "Home to beautiful interiors",
    subtitle: "India's Most Trusted Brand",
    buttonText: "BOOK FREE CONSULTATION",
    videoLength: 8,
  },
  {
    type: "image",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Designs that define you",
    subtitle: "Award Winning Studio",
    buttonText: "BOOK FREE CONSULTATION",
  },
  {
    type: "image",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Turnkey home interior solutions",
    subtitle: "Crafting Excellence Since 1995",
    buttonText: "BOOK FREE CONSULTATION",
  },
];

// CSS Animations
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
`;

// Define proper types for slides
interface VideoSlide {
  type: "video";
  source: string;
  title: string;
  subtitle: string;
  buttonText: string;
  videoLength: number;
}

interface ImageSlide {
  type: "image";
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

type Slide = VideoSlide | ImageSlide;

// Video Slide Component
interface VideoSlideProps {
  videoSrc: string;
  isActive: boolean;
  onVideoEnd: () => void;
}

const VideoSlide = ({ videoSrc, isActive, onVideoEnd }: VideoSlideProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log("Video play error:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
      isActive 
        ? "opacity-100 scale-100" 
        : "opacity-0 scale-105"
    }`} style={{ zIndex: isActive ? 10 : 0 }}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        onEnded={onVideoEnd}
        preload="metadata"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
};

// Image Slide Component
interface ImageSlideProps {
  imageUrl: string;
  isActive: boolean;
}

const ImageSlide = ({ imageUrl, isActive }: ImageSlideProps) => {
  return (
    <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
      isActive 
        ? "opacity-100 scale-100" 
        : "opacity-0 scale-105"
    }`} style={{ zIndex: isActive ? 10 : 0 }}>
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 10s ease-out'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
};

// Main Carousel Component
const HomeCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const autoSlideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToNextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const resetAutoSlideTimer = () => {
    // Clear existing timer
    if (autoSlideTimer.current) {
      clearTimeout(autoSlideTimer.current);
    }
    
    // Set new timer with appropriate duration based on current slide
    const currentSlide = slides[current] as Slide;
    const intervalDuration = currentSlide.type === "video" 
      ? currentSlide.videoLength * 1000
      : 5000;
    
    autoSlideTimer.current = setTimeout(goToNextSlide, intervalDuration);
  };

  useEffect(() => {
    resetAutoSlideTimer();
    
    return () => {
      if (autoSlideTimer.current) {
        clearTimeout(autoSlideTimer.current);
      }
    };
  }, [current]);

  const handleVideoEnd = () => {
    if (current === 0) {
      goToNextSlide();
    }
  };

  const handleSlideClick = (index: number) => {
    setCurrent(index);
  };

  const handleBookConsultation = () => {
    setShowForm(true);
    // Prevent body scroll when form is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setShowForm(false);
    // Re-enable body scroll
    document.body.style.overflow = 'unset';
  };

  // Add CSS styles to the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <>
      <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => {
          const currentSlide = slide as Slide;
          if (currentSlide.type === "video") {
            return (
              <VideoSlide
                key={index}
                videoSrc={currentSlide.source}
                isActive={index === current}
                onVideoEnd={handleVideoEnd}
              />
            );
          } else {
            return (
              <ImageSlide
                key={index}
                imageUrl={currentSlide.image}
                isActive={index === current}
              />
            );
          }
        })}

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Subtitle Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fadeInUp">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-amber-300 font-medium text-sm">
                  {(slides[current] as Slide).subtitle}
                </span>
              </div>
              
              {/* Title */}
              <h1 
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight" 
                style={{ 
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out 0.1s forwards'
                }}
              >
                {(slides[current] as Slide).title}
              </h1>
              
              {/* Description */}
              <p 
                className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl" 
                style={{ 
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out 0.2s forwards'
                }}
              >
                Transform your space with our expert interior design services. From concept to completion, we bring your vision to life.
              </p>
              
              {/* CTA Button - Connected to PopupForm */}
              <button 
                onClick={handleBookConsultation}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105" 
                style={{ 
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out 0.3s forwards'
                }}
              >
                <span>{(slides[current] as Slide).buttonText}</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>

              {/* Additional Info */}
              <div 
                className="flex flex-wrap items-center gap-6 mt-8 text-white/80 text-sm" 
                style={{ 
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out 0.4s forwards'
                }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Free Design Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>45-Day Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>5-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideClick(index)}
              className={`relative rounded-full transition-all duration-300 ${
                index === current 
                  ? "bg-amber-500 w-8" 
                  : "bg-white/40 hover:bg-white/60 w-3"
              } h-3`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === current && (
                <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20"></div>
              )}
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs mb-1">Scroll</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Popup Form - Connected to the button */}
      {showForm && <PopupForm onClose={handleCloseForm} />}
    </>
  );
};

export default HomeCarousel;