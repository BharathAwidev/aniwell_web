// // // src/pages/Category/DesignDetailPage.tsx
// // import { useParams, Link, useNavigate } from "react-router-dom";
// // import { useState, useEffect, useRef } from "react";
// // import PopupForm from "../../components/PopupForm";

// // // Static data for the design details
// // const designDetails = {
// //   id: "1",
// //   title: "Contemporary L-Shaped Kitchen Design with Lime Green and Grey Cabinets",
// //   category: "Kitchen",
// //   subCategory: "kitchen-designs",
// //   images: [
// //     "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
// //     "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
// //     "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
// //     "https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
// //     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
// //   ],
// //   layout: "L-Shaped Kitchen Design",
// //   dimension: "15x7 feet",
// //   style: "Contemporary",
// //   color: "Lime and medium grey",
// //   features: {
// //     shutterFinish: [
// //       "Lime: Laminate in high gloss finish",
// //       "Medium grey: Laminate in matte finish"
// //     ],
// //     countertop: "Granite",
// //     storage: [
// //       "This kitchen optimizes storage with a two-tone scheme: cool gray upper cabinets mounted above a long stretch of lime-green lower units.",
// //       "The upper cabinetry provides concealed space for dishes and pantry items, while the broad lower drawers and shallow pull-outs keep pots, pans, lids, and utensils neatly organized.",
// //       "A dedicated drawer stack near the cooktop hosts utensils and small tools, and the refrigerator alcove remains uncluttered for a clean, functional workflow."
// //     ],
// //     specialFeatures: [
// //       "A bold modern contrast defines the space: sleek stainless appliances set against vibrant lime cabinetry and soft gray uppers.",
// //       "Under-cabinet lighting highlights the marble-like backsplash and dark countertops, while a slim, integrated hood maintains a streamlined silhouette.",
// //       "The vertical fridge design with a clean finish, plus open-top shelf accents and soft-close hardware, create a hotel-grade, contemporary kitchen that is both stylish and highly practical."
// //     ],
// //     idealFor: "Small families"
// //   },
// //   specs: [
// //     { 
// //       icon: "https://cdn-icons-png.flaticon.com/512/992/992651.png", 
// //       title: "Customisable Designs", 
// //       description: "Fully customisable to your needs" 
// //     },
// //     { 
// //       icon: "https://cdn-icons-png.flaticon.com/512/2742/2742674.png", 
// //       title: "10 year warranty", 
// //       description: "Flat 10 year warranty" 
// //     },
// //     { 
// //       icon: "https://cdn-icons-png.flaticon.com/512/3135/3135693.png", 
// //       title: "Easy EMIs", 
// //       description: "Easy EMIs" 
// //     },
// //     { 
// //       icon: "https://cdn-icons-png.flaticon.com/512/3097/3097140.png", 
// //       title: "45 day delivery", 
// //       description: "45 day delivery" 
// //     },
// //     { 
// //       icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", 
// //       title: "4.5 rating", 
// //       description: "4.5 rating" 
// //     }
// //   ]
// // };

// // const DesignDetailPage = () => {
// //   const { category, subCategory } = useParams<{
// //     category: string;
// //     subCategory: string;
// //     designId: string;
// //   }>();
// //   const navigate = useNavigate();
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const scrollContainerRef = useRef<HTMLDivElement>(null);

// //   // Scroll to top when component mounts
// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //   }, []);

// //   const handleBookConsultation = () => {
// //     setShowPopup(true);
// //   };

// //   const handleGetQuote = () => {
// //     window.scrollTo(0, 0);
// //     navigate("/get-quote");
// //   };

// //   const nextImage = () => {
// //     setCurrentImageIndex((prevIndex) => 
// //       prevIndex === designDetails.images.length - 1 ? 0 : prevIndex + 1
// //     );
// //   };

// //   const prevImage = () => {
// //     setCurrentImageIndex((prevIndex) => 
// //       prevIndex === 0 ? designDetails.images.length - 1 : prevIndex - 1
// //     );
// //   };

// //   const scrollSpecsLeft = () => {
// //     if (scrollContainerRef.current) {
// //       scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
// //     }
// //   };

// //   const scrollSpecsRight = () => {
// //     if (scrollContainerRef.current) {
// //       scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#d8d8d8]">
// //       {/* Popup Form */}
// //       {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

// //       <div className="container mx-auto px-4 py-8 md:py-12">
// //         {/* Breadcrumb */}
// //         <nav className="mb-6 md:mb-8">
// //           <div className="flex items-center text-sm md:text-base">
// //             <Link
// //               to="/"
// //               className="text-gray-600 hover:text-teal-600 transition-colors flex items-center"
// //             >
// //               <svg
// //                 className="w-4 h-4 mr-1"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
// //                 ></path>
// //               </svg>
// //               Home
// //             </Link>
// //             <span className="mx-2 text-gray-400">/</span>
// //             <Link
// //               to={`/${category}`}
// //               className="text-gray-600 hover:text-teal-600 transition-colors capitalize"
// //             >
// //               {category?.replace("-", " ") || "Category"}
// //             </Link>
// //             <span className="mx-2 text-gray-400">/</span>
// //             <Link
// //               to={`/${category}/${subCategory}`}
// //               className="text-gray-600 hover:text-teal-600 transition-colors capitalize"
// //             >
// //               {subCategory?.replace("-", " ") || "Subcategory"}
// //             </Link>
// //             <span className="mx-2 text-gray-400">/</span>
// //             <span className="text-gray-900 font-semibold truncate max-w-xs md:max-w-lg">
// //               {designDetails.title}
// //             </span>
// //           </div>
// //         </nav>

// //         {/* Main Content */}
// //         <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
// //           {/* Left Side - Images */}
// //           <div className="lg:w-1/2">
// //             <div className="sticky top-6">
// //               {/* Main Image Carousel */}
// //               <div className="mb-6 relative">
// //                 <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-white">
// //                   <img
// //                     src={designDetails.images[currentImageIndex]}
// //                     alt={`${designDetails.title} - View ${currentImageIndex + 1}`}
// //                     className="w-full h-64 md:h-96 lg:h-[500px] object-cover transition-opacity duration-300"
// //                   />
// //                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
// //                   {/* Carousel Navigation Arrows */}
// //                   <button
// //                     onClick={prevImage}
// //                     className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
// //                     aria-label="Previous image"
// //                   >
// //                     <svg
// //                       className="w-6 h-6"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth="2"
// //                         d="M15 19l-7-7 7-7"
// //                       />
// //                     </svg>
// //                   </button>
// //                   <button
// //                     onClick={nextImage}
// //                     className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
// //                     aria-label="Next image"
// //                   >
// //                     <svg
// //                       className="w-6 h-6"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth="2"
// //                         d="M9 5l7 7-7 7"
// //                       />
// //                     </svg>
// //                   </button>

// //                   {/* Image Counter */}
// //                   <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
// //                     {currentImageIndex + 1} / {designDetails.images.length}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side - Details */}
// //           <div className="lg:w-1/2">
// //             <div className="h-[calc(500px+2rem)] overflow-y-auto pr-2">
// //               {/* Title and Dimension Badge */}
// //               <div className="mb-8">
// //                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
// //                   {designDetails.title}
// //                 </h1>
// //                 <div className="flex flex-wrap items-center gap-4">
// //                   <div className="inline-flex items-center bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 px-5 py-3 rounded-full font-bold text-lg">
// //                     {designDetails.dimension}
// //                   </div>
// //                   <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
// //                     <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
// //                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //                     </svg>
// //                     <span>4.5 Rating</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Quick Specifications with Horizontal Scroll */}
// //               <div className="mb-8">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
// //                   Quick Specifications
// //                 </h2>
// //                 <div className="relative">
// //                   <button
// //                     onClick={scrollSpecsLeft}
// //                     className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
// //                     aria-label="Scroll left"
// //                   >
// //                     <svg
// //                       className="w-4 h-4 md:w-5 md:h-5"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth="2"
// //                         d="M15 19l-7-7 7-7"
// //                       />
// //                     </svg>
// //                   </button>
                  
// //                   <div
// //                     ref={scrollContainerRef}
// //                     className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
// //                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
// //                   >
// //                     {designDetails.specs.map((spec, index) => (
// //                       <div
// //                         key={index}
// //                         className="flex-shrink-0 w-48 bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
// //                       >
// //                         <div className="flex flex-col items-center text-center">
// //                           <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full p-3">
// //                             <img
// //                               src={spec.icon}
// //                               alt={spec.title}
// //                               className="w-10 h-10 object-contain"
// //                               onError={(e) => {
// //                                 const target = e.target as HTMLImageElement;
// //                                 target.style.display = 'none';
// //                                 const parent = target.parentElement;
// //                                 if (parent) {
// //                                   parent.innerHTML = `<div class="text-2xl font-bold text-teal-600">${spec.title.charAt(0)}</div>`;
// //                                 }
// //                               }}
// //                             />
// //                           </div>
// //                           <h3 className="font-bold text-gray-900 text-lg mb-2">
// //                             {spec.title}
// //                           </h3>
// //                           <p className="text-gray-600 text-sm">
// //                             {spec.description}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   <button
// //                     onClick={scrollSpecsRight}
// //                     className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
// //                     aria-label="Scroll right"
// //                   >
// //                     <svg
// //                       className="w-4 h-4 md:w-5 md:h-5"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth="2"
// //                         d="M9 5l7 7-7 7"
// //                       />
// //                     </svg>
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Key Details */}
// //               <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
// //                   Kitchen Design Details
// //                 </h2>
                
// //                 <div className="space-y-6">
// //                   {/* Layout */}
// //                   <div className="pb-4 border-b border-gray-100">
// //                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
// //                       Layout:
// //                     </h3>
// //                     <p className="text-gray-700">{designDetails.layout}</p>
// //                   </div>

// //                   {/* Room Dimension */}
// //                   <div className="pb-4 border-b border-gray-100">
// //                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
// //                       Room Dimension:
// //                     </h3>
// //                     <p className="text-gray-700">{designDetails.dimension}</p>
// //                   </div>

// //                   {/* Style */}
// //                   <div className="pb-4 border-b border-gray-100">
// //                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
// //                       Style:
// //                     </h3>
// //                     <p className="text-gray-700">{designDetails.style}</p>
// //                   </div>

// //                   {/* Colour */}
// //                   <div className="pb-4 border-b border-gray-100">
// //                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
// //                       Colour:
// //                     </h3>
// //                     <p className="text-gray-700">{designDetails.color}</p>
// //                   </div>

// //                   {/* Shutter finish */}
// //                   <div className="pb-4 border-b border-gray-100">
// //                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
// //                       Shutter finish:
// //                     </h3>
// //                     <ul className="list-disc pl-5 space-y-1">
// //                       {designDetails.features.shutterFinish.map((item, index) => (
// //                         <li key={index} className="text-gray-700">{item}</li>
// //                       ))}
// //                     </ul>
// //                   </div>

// //                   {/* Countertop Material */}
// //                   <div className="pb-4 border-b border-gray-100">
// //                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
// //                       Countertop Material:
// //                     </h3>
// //                     <p className="text-gray-700">{designDetails.features.countertop}</p>
// //                   </div>

// //                   {/* Storage Features */}
// //                   <div className="pb-4 border-b border-gray-100">
// //                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
// //                       Storage Features:
// //                     </h3>
// //                     <ul className="space-y-3">
// //                       {designDetails.features.storage.map((item, index) => (
// //                         <li key={index} className="text-gray-700">{item}</li>
// //                       ))}
// //                     </ul>
// //                   </div>

// //                   {/* Special Features */}
// //                   <div className="pb-4 border-b border-gray-100">
// //                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
// //                       Special Features:
// //                     </h3>
// //                     <ul className="space-y-3">
// //                       {designDetails.features.specialFeatures.map((item, index) => (
// //                         <li key={index} className="text-gray-700">{item}</li>
// //                       ))}
// //                     </ul>
// //                   </div>

// //                   {/* Ideal for */}
// //                   <div>
// //                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
// //                       Ideal for:
// //                     </h3>
// //                     <p className="text-gray-700">{designDetails.features.idealFor}</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* CTA Buttons */}
// //               <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
// //                 <div className="flex flex-col sm:flex-row gap-4">
// //                   <button
// //                     onClick={handleBookConsultation}
// //                     className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-lg flex items-center justify-center shadow-lg hover:shadow-xl whitespace-nowrap"
// //                   >
// //                     <svg
// //                       className="w-6 h-6 mr-3"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth="2"
// //                         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
// //                       ></path>
// //                     </svg>
// //                     BOOK FREE CONSULTATION
// //                   </button>
// //                   <button
// //                     onClick={handleGetQuote}
// //                     className="flex-1 bg-white text-teal-600 hover:text-teal-700 font-semibold py-4 px-6 rounded-xl border-2 border-teal-500 hover:border-teal-600 transition-all duration-300 text-lg flex items-center justify-center whitespace-nowrap hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50"
// //                   >
// //                     <svg
// //                       className="w-6 h-6 mr-3"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth="2"
// //                         d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
// //                       ></path>
// //                     </svg>
// //                     GET INSTANT QUOTE
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default DesignDetailPage;





// // src/pages/Category/DesignDetailPage.tsx
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import PopupForm from "../../components/PopupForm";

// // Static data for the design details
// const designDetails = {
//   id: "1",
//   title: "Contemporary L-Shaped Kitchen Design with Lime Green and Grey Cabinets",
//   category: "Kitchen",
//   subCategory: "kitchen-designs",
//   images: [
//     "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//     "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     "https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//   ],
//   layout: "L-Shaped Kitchen Design",
//   dimension: "15x7 feet",
//   style: "Contemporary",
//   color: "Lime and medium grey",
//   features: {
//     shutterFinish: [
//       "Lime: Laminate in high gloss finish",
//       "Medium grey: Laminate in matte finish"
//     ],
//     countertop: "Granite",
//     storage: [
//       "This kitchen optimizes storage with a two-tone scheme: cool gray upper cabinets mounted above a long stretch of lime-green lower units.",
//       "The upper cabinetry provides concealed space for dishes and pantry items, while the broad lower drawers and shallow pull-outs keep pots, pans, lids, and utensils neatly organized.",
//       "A dedicated drawer stack near the cooktop hosts utensils and small tools, and the refrigerator alcove remains uncluttered for a clean, functional workflow."
//     ],
//     specialFeatures: [
//       "A bold modern contrast defines the space: sleek stainless appliances set against vibrant lime cabinetry and soft gray uppers.",
//       "Under-cabinet lighting highlights the marble-like backsplash and dark countertops, while a slim, integrated hood maintains a streamlined silhouette.",
//       "The vertical fridge design with a clean finish, plus open-top shelf accents and soft-close hardware, create a hotel-grade, contemporary kitchen that is both stylish and highly practical."
//     ],
//     idealFor: "Small families"
//   },
//   specs: [
//     { 
//       icon: "https://cdn-icons-png.flaticon.com/512/992/992651.png", 
//       title: "Customisable Designs", 
//       description: "Fully customisable to your needs" 
//     },
//     { 
//       icon: "https://cdn-icons-png.flaticon.com/512/2742/2742674.png", 
//       title: "10 year warranty", 
//       description: "Flat 10 year warranty" 
//     },
//     { 
//       icon: "https://cdn-icons-png.flaticon.com/512/3135/3135693.png", 
//       title: "Easy EMIs", 
//       description: "Easy EMIs" 
//     },
//     { 
//       icon: "https://cdn-icons-png.flaticon.com/512/3097/3097140.png", 
//       title: "45 day delivery", 
//       description: "45 day delivery" 
//     },
//     { 
//       icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", 
//       title: "4.5 rating", 
//       description: "4.5 rating" 
//     }
//   ]
// };

// const DesignDetailPage = () => {
//   const { category, subCategory } = useParams<{
//     category: string;
//     subCategory: string;
//     designId: string;
//   }>();
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   // Scroll to top when component mounts
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleBookConsultation = () => {
//     setShowPopup(true);
//   };

//   const handleGetQuote = () => {
//     window.scrollTo(0, 0);
//     navigate("/get-quote");
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === designDetails.images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       prevIndex === 0 ? designDetails.images.length - 1 : prevIndex - 1
//     );
//   };

//   const scrollSpecsLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
//     }
//   };

//   const scrollSpecsRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#d8d8d8]">
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
//               {category?.replace("-", " ") || "Category"}
//             </Link>
//             <span className="mx-2 text-gray-400">/</span>
//             <Link
//               to={`/${category}/${subCategory}`}
//               className="text-gray-600 hover:text-orange-600 transition-colors capitalize"
//             >
//               {subCategory?.replace("-", " ") || "Subcategory"}
//             </Link>
//             <span className="mx-2 text-gray-400">/</span>
//             <span className="text-gray-900 font-semibold truncate max-w-xs md:max-w-lg">
//               {designDetails.title}
//             </span>
//           </div>
//         </nav>

//         {/* Main Content */}
//         <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
//           {/* Left Side - Images */}
//           <div className="lg:w-1/2">
//             <div className="sticky top-6">
//               {/* Main Image Carousel */}
//               <div className="mb-6 relative">
//                 <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-white">
//                   <img
//                     src={designDetails.images[currentImageIndex]}
//                     alt={`${designDetails.title} - View ${currentImageIndex + 1}`}
//                     className="w-full h-64 md:h-96 lg:h-[500px] object-cover transition-opacity duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
//                   {/* Carousel Navigation Arrows */}
//                   <button
//                     onClick={prevImage}
//                     className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
//                     aria-label="Previous image"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={nextImage}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
//                     aria-label="Next image"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </button>

//                   {/* Image Counter */}
//                   <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
//                     {currentImageIndex + 1} / {designDetails.images.length}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Details */}
//           <div className="lg:w-1/2">
//             <div className="h-[calc(500px+2rem)] overflow-y-auto pr-2">
//               {/* Title and Dimension Badge */}
//               <div className="mb-8">
//                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//                   {designDetails.title}
//                 </h1>
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-5 py-3 rounded-full font-bold text-lg">
//                     {designDetails.dimension}
//                   </div>
//                   <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
//                     <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     <span>4.5 Rating</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Specifications with Horizontal Scroll */}
//               <div className="mb-8">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                   Quick Specifications
//                 </h2>
//                 <div className="relative">
//                   <button
//                     onClick={scrollSpecsLeft}
//                     className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
//                     aria-label="Scroll left"
//                   >
//                     <svg
//                       className="w-4 h-4 md:w-5 md:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                   </button>
                  
//                   <div
//                     ref={scrollContainerRef}
//                     className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
//                     style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//                   >
//                     {designDetails.specs.map((spec, index) => (
//                       <div
//                         key={index}
//                         className="flex-shrink-0 w-48 bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
//                       >
//                         <div className="flex flex-col items-center text-center">
//                           <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gradient-to-r from-orange-100 to-amber-100 rounded-full p-3">
//                             <img
//                               src={spec.icon}
//                               alt={spec.title}
//                               className="w-10 h-10 object-contain"
//                               onError={(e) => {
//                                 const target = e.target as HTMLImageElement;
//                                 target.style.display = 'none';
//                                 const parent = target.parentElement;
//                                 if (parent) {
//                                   parent.innerHTML = `<div class="text-2xl font-bold text-orange-600">${spec.title.charAt(0)}</div>`;
//                                 }
//                               }}
//                             />
//                           </div>
//                           <h3 className="font-bold text-gray-900 text-lg mb-2">
//                             {spec.title}
//                           </h3>
//                           <p className="text-gray-600 text-sm">
//                             {spec.description}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <button
//                     onClick={scrollSpecsRight}
//                     className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
//                     aria-label="Scroll right"
//                   >
//                     <svg
//                       className="w-4 h-4 md:w-5 md:h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>

//               {/* Key Details */}
//               <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
//                   Kitchen Design Details
//                 </h2>
                
//                 <div className="space-y-6">
//                   {/* Layout */}
//                   <div className="pb-4 border-b border-gray-100">
//                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
//                       Layout:
//                     </h3>
//                     <p className="text-gray-700">{designDetails.layout}</p>
//                   </div>

//                   {/* Room Dimension */}
//                   <div className="pb-4 border-b border-gray-100">
//                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
//                       Room Dimension:
//                     </h3>
//                     <p className="text-gray-700">{designDetails.dimension}</p>
//                   </div>

//                   {/* Style */}
//                   <div className="pb-4 border-b border-gray-100">
//                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
//                       Style:
//                     </h3>
//                     <p className="text-gray-700">{designDetails.style}</p>
//                   </div>

//                   {/* Colour */}
//                   <div className="pb-4 border-b border-gray-100">
//                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
//                       Colour:
//                     </h3>
//                     <p className="text-gray-700">{designDetails.color}</p>
//                   </div>

//                   {/* Shutter finish */}
//                   <div className="pb-4 border-b border-gray-100">
//                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
//                       Shutter finish:
//                     </h3>
//                     <ul className="list-disc pl-5 space-y-1">
//                       {designDetails.features.shutterFinish.map((item, index) => (
//                         <li key={index} className="text-gray-700">{item}</li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Countertop Material */}
//                   <div className="pb-4 border-b border-gray-100">
//                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
//                       Countertop Material:
//                     </h3>
//                     <p className="text-gray-700">{designDetails.features.countertop}</p>
//                   </div>

//                   {/* Storage Features */}
//                   <div className="pb-4 border-b border-gray-100">
//                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
//                       Storage Features:
//                     </h3>
//                     <ul className="space-y-3">
//                       {designDetails.features.storage.map((item, index) => (
//                         <li key={index} className="text-gray-700">{item}</li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Special Features */}
//                   <div className="pb-4 border-b border-gray-100">
//                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
//                       Special Features:
//                     </h3>
//                     <ul className="space-y-3">
//                       {designDetails.features.specialFeatures.map((item, index) => (
//                         <li key={index} className="text-gray-700">{item}</li>
//                       ))}
//                     </ul>
//                   </div>

//                   {/* Ideal for */}
//                   <div>
//                     <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
//                       Ideal for:
//                     </h3>
//                     <p className="text-gray-700">{designDetails.features.idealFor}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* CTA Buttons */}
//               <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <button
//                     onClick={handleBookConsultation}
//                     className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-lg flex items-center justify-center shadow-lg hover:shadow-xl whitespace-nowrap"
//                   >
//                     <svg
//                       className="w-6 h-6 mr-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       ></path>
//                     </svg>
//                     BOOK FREE CONSULTATION
//                   </button>
//                   <button
//                     onClick={handleGetQuote}
//                     className="flex-1 bg-white text-orange-600 hover:text-orange-700 font-semibold py-4 px-6 rounded-xl border-2 border-orange-500 hover:border-orange-600 transition-all duration-300 text-lg flex items-center justify-center whitespace-nowrap hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50"
//                   >
//                     <svg
//                       className="w-6 h-6 mr-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       ></path>
//                     </svg>
//                     GET INSTANT QUOTE
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesignDetailPage;

// src/pages/Category/DesignDetailPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PopupForm from "../../components/PopupForm";
import { ServiceAPI } from "../../api/service.api";
import { SectionAPI, type SubcategoryData } from "../../api/section.api";
import { ChevronRight } from "lucide-react";

interface DesignFeatures {
  shutterFinish: string[];
  countertop: string;
  storage: string[];
  specialFeatures: string[];
  idealFor: string;
  color?: string;
  layout?: string;
}

interface DesignSpec {
  icon: string;
  title: string;
  description: string;
}

interface DesignDetail {
  id: string;
  title: string;
  description: string;
  images: string[];
  dimension: string;
  style: string;
  features: DesignFeatures;
  specs: DesignSpec[];
  category?: string;
  subCategory?: string;
  tags: string[];
}

// Interface matching the actual API response structure
interface ApiTag {
  id: string;
  service_id: string;
  value: string;
}

interface ApiDesignDetail {
  key: string;
  value: string;
}

interface ApiFeature {
  key: string;
  value: string;
}

interface ApiServiceResponse {
  id: string;
  section_id: string;
  category_id: string;
  title: string;
  description: string;
  dimension: string;
  style: string;
  created_at: string;
  section_name: string;
  category_name: string;
}

interface FullApiResponse {
  status: boolean;
  statusCode: number;
  responseCode: number;
  message: string;
  result: {
    service: ApiServiceResponse;
    tags: ApiTag[];
    designDetails: ApiDesignDetail[];
    features: ApiFeature[];
  };
}

const DesignDetailPage = () => {
  const { category, subCategory, designId } = useParams<{
    category: string;
    subCategory: string;
    designId: string;
  }>();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [designData, setDesignData] = useState<DesignDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [subcategoryData, setSubcategoryData] = useState<SubcategoryData | null>(null);
  const [categoryData, setCategoryData] = useState<any>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch design data
  useEffect(() => {
    const fetchDesignData = async () => {
      if (!designId) {
        setError("Design ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        console.log("Fetching design data for ID:", designId);
        
        // Fetch service data using ServiceAPI
        const serviceResponse = await ServiceAPI.getById(designId);
        console.log("Service API Response:", serviceResponse);

        if (!serviceResponse || !serviceResponse.data) {
          setError("Design not found");
          setLoading(false);
          return;
        }

        // Use type assertion with unknown first to avoid TypeScript error
        const apiResponse = serviceResponse.data as unknown as FullApiResponse;
        const service = apiResponse.result.service;
        
        console.log("Service data:", service);
        console.log("Tags:", apiResponse.result.tags);
        console.log("Design details:", apiResponse.result.designDetails);
        console.log("Features:", apiResponse.result.features);

        if (!service) {
          setError("Design not found");
          setLoading(false);
          return;
        }

        // Fetch subcategory and category data for breadcrumb
        if (category && subCategory) {
          try {
            // Fetch all subcategories
            const subcategoriesResponse = await SectionAPI.getAllSubcategories();
            const allSubcategories = subcategoriesResponse?.data?.result?.data || 
                                   subcategoriesResponse?.data?.data || 
                                   subcategoriesResponse?.data || 
                                   subcategoriesResponse;
            
            // Find current subcategory
            const currentSubcategory = allSubcategories?.find((sub: SubcategoryData) => {
              const subSlug = sub.name?.toLowerCase().replace(/\s+/g, '-') || '';
              const urlSlug = subCategory.toLowerCase();
              return sub.status === "YES" && subSlug === urlSlug;
            });
            
            if (currentSubcategory) {
              setSubcategoryData(currentSubcategory);
              
              // Find category for this subcategory
              const sectionsResponse = await SectionAPI.getAll();
              const allSections = sectionsResponse?.data?.result?.data || 
                                 sectionsResponse?.data?.data || 
                                 sectionsResponse?.data || 
                                 sectionsResponse;
              
              const currentCategory = allSections?.find((section: any) => {
                return section.id === currentSubcategory.sectionId || 
                       section.id === currentSubcategory.section_id ||
                       section.id === service.section_id;
              });
              
              setCategoryData(currentCategory);
            }
          } catch (err) {
            console.error("Error fetching category/subcategory data:", err);
            // Fallback to service data
            setCategoryData({
              name: service.section_name || category?.replace("-", " ") || "Category"
            });
            setSubcategoryData({
              name: service.category_name || subCategory?.replace("-", " ") || "Subcategory"
            } as SubcategoryData);
          }
        }

        // Process tags
        const tags = apiResponse.result.tags?.map((tag: ApiTag) => tag.value) || [];

        // Process design details
        const designDetails = apiResponse.result.designDetails || [];
        let layout = "";
        let roomDimension = service.dimension;

        designDetails.forEach((detail: ApiDesignDetail) => {
          const key = detail.key?.toLowerCase() || "";
          const value = detail.value || "";
          
          if (key.includes("layout")) {
            layout = value;
          } else if (key.includes("room") && key.includes("dimension")) {
            roomDimension = value || roomDimension;
          }
        });

        // Process features
        const features = apiResponse.result.features || [];
        const shutterFinish: string[] = [];
        const storageFeatures: string[] = [];
        const specialFeatures: string[] = [];
        let countertop = "";
        let idealFor = "";
        let color = "";

        features.forEach((feature: ApiFeature) => {
          const key = feature.key?.toLowerCase() || "";
          const value = feature.value || "";

          console.log(`Processing feature: ${key}, value: ${value}`);

          if (key === "storage") {
            // Split by bullet points or newlines
            const items = value.split(/\n|•| - /).filter(item => item.trim());
            if (items.length > 0) {
              storageFeatures.push(...items.map(item => item.trim()));
            } else if (value) {
              storageFeatures.push(value);
            }
          } else if (key === "special") {
            // Split by bullet points or newlines
            const items = value.split(/\n|•| - /).filter(item => item.trim());
            if (items.length > 0) {
              specialFeatures.push(...items.map(item => item.trim()));
            } else if (value) {
              specialFeatures.push(value);
            }
          } else if (key.includes("countertop")) {
            countertop = value;
          } else if (key.includes("color") || key.includes("colour")) {
            color = value;
          } else if (key.includes("ideal") || key.includes("suitable")) {
            idealFor = value;
          } else if (key.includes("shutter") || key.includes("finish")) {
            shutterFinish.push(value);
          }
        });

        // Extract color from title if not in features
        if (!color) {
          const colorMatch = service.title.match(/\b(white|off-white|cream|beige|gray|grey|black|blue|green|red|yellow|brown)\b/i);
          if (colorMatch) {
            color = colorMatch[0];
          }
        }

        // Extract countertop from title if not in features
        if (!countertop) {
          if (service.title.toLowerCase().includes("quartz")) {
            countertop = "Quartz";
          } else if (service.title.toLowerCase().includes("granite")) {
            countertop = "Granite";
          } else if (service.title.toLowerCase().includes("marble")) {
            countertop = "Marble";
          }
        }

        // Set sensible defaults for empty values
        if (shutterFinish.length === 0) {
          shutterFinish.push("High-quality laminate finish");
        }
        if (!countertop) {
          countertop = "Premium countertop material";
        }
        if (storageFeatures.length === 0) {
          storageFeatures.push("Optimized storage solutions", "Ample cabinet space");
        }
        if (specialFeatures.length === 0) {
          specialFeatures.push("Modern design aesthetics", "Functional layout");
        }
        if (!idealFor) {
          idealFor = "Contemporary homes seeking style and functionality";
        }
        if (!color) {
          color = "Neutral palette with accent options";
        }
        if (!layout) {
          // Extract from title
          const layoutMatch = service.title.match(/\b(L-shaped|U-shaped|straight|galley|island|peninsula)\b/i);
          if (layoutMatch) {
            layout = layoutMatch[0];
          } else {
            layout = "Efficient kitchen layout";
          }
        }

        // Get images from ServiceAPI
        const images = ServiceAPI.getServiceImages(service.id) || [];
        
        // Add fallback images if empty
        let finalImages = images;
        if (images.length === 0) {
          finalImages = [
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop',
          ];
        }

        // Transform service data to design detail format
        const transformedDesign: DesignDetail = {
          id: service.id,
          title: service.title || "Design Details",
          description: service.description || "",
          images: finalImages,
          dimension: roomDimension || "Custom Size",
          style: service.style || "Contemporary",
          category: categoryData?.name || service.section_name || category?.replace("-", " ") || "Category",
          subCategory: subcategoryData?.name || service.category_name || subCategory?.replace("-", " ") || "Subcategory",
          tags: tags,
          features: {
            shutterFinish,
            countertop,
            storage: storageFeatures,
            specialFeatures,
            idealFor,
            color,
            layout
          },
          specs: [
            { 
              icon: "https://cdn-icons-png.flaticon.com/512/992/992651.png", 
              title: "Customisable Designs", 
              description: "Fully customisable to your needs" 
            },
            { 
              icon: "https://cdn-icons-png.flaticon.com/512/2742/2742674.png", 
              title: "10 year warranty", 
              description: "Flat 10 year warranty" 
            },
            { 
              icon: "https://cdn-icons-png.flaticon.com/512/3135/3135693.png", 
              title: "Easy EMIs", 
              description: "Easy EMIs" 
            },
            { 
              icon: "https://cdn-icons-png.flaticon.com/512/3097/3097140.png", 
              title: "45 day delivery", 
              description: "45 day delivery" 
            },
            { 
              icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", 
              title: "4.5 rating", 
              description: "4.5 rating" 
            }
          ]
        };

        console.log("Transformed design data:", transformedDesign);
        setDesignData(transformedDesign);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching design data:", err);
        setError("Failed to load design details");
      } finally {
        setLoading(false);
      }
    };

    fetchDesignData();
  }, [designId, category, subCategory]);

  const handleBookConsultation = () => {
    setShowPopup(true);
  };

  const handleGetQuote = () => {
    window.scrollTo(0, 0);
    navigate("/get-quote");
  };

  const nextImage = () => {
    if (designData) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === designData.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (designData) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? designData.images.length - 1 : prevIndex - 1
      );
    }
  };

  const scrollSpecsLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollSpecsRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Function to render bullet points from description
  const renderDescription = (text: string) => {
    if (!text) return null;
    
    const lines = text.split('\n').filter(line => line.trim());
    return (
      <ul className="space-y-2">
        {lines.map((line, index) => (
          <li key={index} className="text-gray-700 flex items-start">
            <span className="mr-2">•</span>
            <span>{line.trim()}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Function to render feature items
  const renderFeatureItems = (items: string[]) => {
    if (items.length === 0) return null;
    
    return (
      <ul className="space-y-2">
        {items.map((item, index) => {
          // Check if item starts with bullet or dash
          const cleanItem = item.replace(/^[•\-]\s*/, '').trim();
          return (
            <li key={index} className="text-gray-700 flex items-start">
              <span className="mr-2">•</span>
              <span>{cleanItem}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#d8d8d8]">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb Skeleton */}
          <nav className="mb-6 md:mb-8">
            <div className="flex items-center">
              <div className="h-4 w-16 bg-gray-300 animate-pulse rounded"></div>
              <div className="mx-2 h-4 w-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 w-24 bg-gray-300 animate-pulse rounded"></div>
              <div className="mx-2 h-4 w-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 w-32 bg-gray-300 animate-pulse rounded"></div>
              <div className="mx-2 h-4 w-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 w-48 bg-gray-300 animate-pulse rounded"></div>
            </div>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
            {/* Left Side Skeleton */}
            <div className="lg:w-1/2">
              <div className="h-64 md:h-96 lg:h-[500px] bg-gray-300 animate-pulse rounded-2xl"></div>
            </div>

            {/* Right Side Skeleton */}
            <div className="lg:w-1/2">
              <div className="h-12 w-3/4 bg-gray-300 animate-pulse rounded mb-6"></div>
              <div className="h-8 w-32 bg-gray-300 animate-pulse rounded mb-8"></div>
              
              <div className="h-8 w-48 bg-gray-300 animate-pulse rounded mb-4"></div>
              <div className="h-32 bg-gray-300 animate-pulse rounded mb-8"></div>
              
              <div className="h-10 w-full bg-gray-300 animate-pulse rounded mb-4"></div>
              <div className="h-10 w-full bg-gray-300 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !designData) {
    return (
      <div className="min-h-screen bg-[#d8d8d8] flex items-center justify-center">
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
            {error || "Design Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            The design you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#d8d8d8]">
      {/* Popup Form */}
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8">
          <div className="flex items-center text-sm md:text-base flex-wrap">
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
              {designData.category || category?.replace("-", " ") || "Category"}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              to={`/${category}/${subCategory}`}
              className="text-gray-600 hover:text-orange-600 transition-colors capitalize"
            >
              {designData.subCategory || subCategory?.replace("-", " ") || "Subcategory"}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold truncate max-w-xs md:max-w-lg">
              {designData.title}
            </span>
          </div>
        </nav>

        {/* Tags */}
        {designData.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {designData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Left Side - Images */}
          <div className="lg:w-1/2">
            <div className="sticky top-6">
              {/* Main Image Carousel */}
              <div className="mb-6 relative">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-white">
                  <img
                    src={designData.images[currentImageIndex]}
                    alt={`${designData.title} - View ${currentImageIndex + 1}`}
                    className="w-full h-64 md:h-96 lg:h-[500px] object-cover transition-opacity duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Carousel Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronRight className="w-6 h-6 rotate-180" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {designData.images.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="lg:w-1/2">
            <div className="h-[calc(500px+2rem)] overflow-y-auto pr-2">
              {/* Title and Dimension Badge */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {designData.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-5 py-3 rounded-full font-bold text-lg">
                    {designData.dimension}
                  </div>
                  <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
                    <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>4.5 Rating</span>
                  </div>
                </div>
              </div>

              {/* Quick Specifications with Horizontal Scroll */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Quick Specifications
                </h2>
                <div className="relative">
                  <button
                    onClick={scrollSpecsLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                    aria-label="Scroll left"
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5 rotate-180" />
                  </button>
                  
                  <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {designData.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-48 bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gradient-to-r from-orange-100 to-amber-100 rounded-full p-3">
                            <img
                              src={spec.icon}
                              alt={spec.title}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="text-2xl font-bold text-orange-600">${spec.title.charAt(0)}</div>`;
                                }
                              }}
                            />
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg mb-2">
                            {spec.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {spec.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={scrollSpecsRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>

              {/* Key Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Design Details
                </h2>
                
                <div className="space-y-6">
                  {/* Style */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Style:
                    </h3>
                    <p className="text-gray-700 capitalize">{designData.style}</p>
                  </div>

                  {/* Room Dimension */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Room Dimension:
                    </h3>
                    <p className="text-gray-700">{designData.dimension}</p>
                  </div>

                  {/* Description */}
                  {designData.description && (
                    <div className="pb-4 border-b border-gray-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        Description:
                      </h3>
                      <div className="text-gray-700">
                        {renderDescription(designData.description)}
                      </div>
                    </div>
                  )}

                  {/* Color */}
                  {designData.features.color && (
                    <div className="pb-4 border-b border-gray-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        Colour:
                      </h3>
                      <p className="text-gray-700 capitalize">{designData.features.color}</p>
                    </div>
                  )}

                  {/* Layout */}
                  {designData.features.layout && (
                    <div className="pb-4 border-b border-gray-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        Layout:
                      </h3>
                      <p className="text-gray-700 capitalize">{designData.features.layout}</p>
                    </div>
                  )}

                  {/* Countertop Material */}
                  {designData.features.countertop && (
                    <div className="pb-4 border-b border-gray-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        Countertop Material:
                      </h3>
                      <p className="text-gray-700 capitalize">{designData.features.countertop}</p>
                    </div>
                  )}

                  {/* Storage Features */}
                  {designData.features.storage.length > 0 && (
                    <div className="pb-4 border-b border-gray-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        Storage Features:
                      </h3>
                      <div className="text-gray-700">
                        {renderFeatureItems(designData.features.storage)}
                      </div>
                    </div>
                  )}

                  {/* Special Features */}
                  {designData.features.specialFeatures.length > 0 && (
                    <div className="pb-4 border-b border-gray-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        Special Features:
                      </h3>
                      <div className="text-gray-700">
                        {renderFeatureItems(designData.features.specialFeatures)}
                      </div>
                    </div>
                  )}

                  {/* Shutter finish */}
                  {designData.features.shutterFinish.length > 0 && (
                    <div className="pb-4 border-b border-gray-100">
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        Shutter finish:
                      </h3>
                      <div className="text-gray-700">
                        {renderFeatureItems(designData.features.shutterFinish)}
                      </div>
                    </div>
                  )}

                  {/* Ideal for */}
                  {designData.features.idealFor && (
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                        Ideal for:
                      </h3>
                      <p className="text-gray-700 capitalize">{designData.features.idealFor}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBookConsultation}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-lg flex items-center justify-center shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
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
                    BOOK FREE CONSULTATION
                  </button>
                  <button
                    onClick={handleGetQuote}
                    className="flex-1 bg-white text-orange-600 hover:text-orange-700 font-semibold py-4 px-6 rounded-xl border-2 border-orange-500 hover:border-orange-600 transition-all duration-300 text-lg flex items-center justify-center whitespace-nowrap hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    GET INSTANT QUOTE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDetailPage;