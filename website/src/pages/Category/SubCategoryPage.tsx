// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { getSubCategory, getCategoryBySlug } from '../../data/categories';
// import { useState } from 'react';
// import PopupForm from '../../components/PopupForm';

// const SubCategoryPage = () => {
//   const { category, subCategory } = useParams<{ category: string; subCategory: string }>();
//   const subCategoryData = getSubCategory(category || '', subCategory || '');
//   const categoryData = getCategoryBySlug(category || '');
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(subCategory || '');
//   const [showPopup, setShowPopup] = useState(false);

//   if (!subCategoryData || !categoryData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Subcategory Not Found</h1>
//           <Link to={`/${category}`} className="text-blue-600 hover:text-blue-800">Go back to {category}</Link>
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
//     // Simply redirect to quote page
//     navigate('/get-quote');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Popup Form */}
//       {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

//       <div className="container mx-auto px-4 py-6 md:py-8">
//         {/* Breadcrumb */}
//         <nav className="mb-4 md:mb-6">
//           <Link to="/" className="text-gray-600 hover:text-blue-600 text-sm md:text-base">Home</Link>
//           <span className="mx-2 text-gray-400">/</span>
//           <Link to={`/${category}`} className="text-gray-600 hover:text-blue-600 capitalize text-sm md:text-base">
//             {category?.replace('-', ' ')}
//           </Link>
//           <span className="mx-2 text-gray-400">/</span>
//           <span className="text-gray-900 font-semibold text-sm md:text-base">{subCategoryData.name}</span>
//         </nav>

//         {/* Simple Horizontal Subcategory Navigation */}
//         {categoryData.subCategories && categoryData.subCategories.length > 0 && (
//           <div className="mb-8 md:mb-12 border-b border-gray-200">
//             <div className="flex space-x-6 md:space-x-8 overflow-x-auto pb-1 scrollbar-hide">
//               {categoryData.subCategories.map((subCat) => (
//                 <button
//                   key={subCat.id}
//                   onClick={() => handleSubCategoryClick(subCat.slug)}
//                   className={`flex-shrink-0 pb-3 md:pb-4 relative transition-all duration-300 ${
//                     activeTab === subCat.slug
//                       ? 'text-gray-900 font-semibold'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   <span className="text-base md:text-lg whitespace-nowrap">
//                     {subCat.name}
//                   </span>
//                   {activeTab === subCat.slug && (
//                     <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-red-600 rounded-t-full"></div>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Hero Section */}
//         <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 lg:p-12 mb-8 md:mb-12">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             <div className="flex-1">
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//                 {subCategoryData.name} Designs
//               </h1>
//               <div className="max-w-3xl">
//                 <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
//                   <span className="font-semibold">What are {subCategoryData.name} Designs?</span> {subCategoryData.description}
//                 </p>
//                 {subCategoryData.designs > 0 && (
//                   <div className="flex flex-wrap gap-3 md:gap-4">
//                     <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm md:text-base">
//                       {subCategoryData.designs.toLocaleString()} Designs
//                     </span>
//                     <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm md:text-base">
//                       Free Consultation
//                     </span>
//                     <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm md:text-base">
//                       3D Visualization
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="lg:w-1/3">
//               <img 
//                 src={subCategoryData.image} 
//                 alt={subCategoryData.name}
//                 className="w-full h-48 md:h-64 lg:h-72 object-cover rounded-xl shadow-lg"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Design Items Section */}
//         <div className="mb-12 md:mb-16">
//           {subCategoryData.items && subCategoryData.items.length > 0 ? (
//             <>
//               <div className="flex justify-between items-center mb-6 md:mb-8">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
//                   Popular {subCategoryData.name} Designs
//                 </h2>
//                 <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
//                   View All Designs
//                   <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
//                   </svg>
//                 </button>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//                 {subCategoryData.items.map((item) => (
//                   <div key={item.id} className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
//                     <div className="relative h-56 md:h-64 overflow-hidden">
//                       <img 
//                         src={item.image} 
//                         alt={item.title}
//                         className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                       />
//                       <div className="absolute top-3 right-3 md:top-4 md:right-4">
//                         <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs md:text-sm font-semibold shadow-sm">
//                           {item.style}
//                         </span>
//                       </div>
//                       <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
//                         <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs md:text-sm">
//                           {item.size}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="p-5 md:p-6">
//                       <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-1">
//                         {item.title}
//                       </h3>
//                       <p className="text-gray-600 mb-4 text-sm md:text-base line-clamp-2">
//                         {item.description}
//                       </p>
                      
//                       <div className="mb-4 md:mb-6">
//                         <div className="flex flex-wrap gap-2">
//                           {item.features.map((feature, index) => (
//                             <span 
//                               key={index} 
//                               className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs md:text-sm border border-gray-200"
//                             >
//                               {feature}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div className="flex flex-col sm:flex-row gap-3">
//                         <button 
//                           onClick={handleBookConsultation}
//                           className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 md:py-3 md:px-6 rounded-lg transition duration-300 text-sm md:text-base flex items-center justify-center"
//                         >
//                           <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                           </svg>
//                           Book Free Consultation
//                         </button>
//                         <button 
//                           onClick={handleGetQuote}
//                           className="flex-1 text-blue-600 hover:text-blue-700 font-semibold border border-blue-600 hover:border-blue-700 py-3 px-4 md:py-3 md:px-6 rounded-lg transition duration-300 text-sm md:text-base"
//                         >
//                           Get Quote
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
              
//               {/* Load More Button */}
//               <div className="text-center mt-8 md:mt-12">
//                 <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition duration-300">
//                   Load More Designs
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
//               <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <svg className="w-10 h-10 md:w-12 md:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
//                 </svg>
//               </div>
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Designs Coming Soon</h2>
//               <p className="text-gray-600 mb-6 max-w-md mx-auto">
//                 We're currently adding amazing {subCategoryData.name} designs to our collection. Stay tuned!
//               </p>
//               <button 
//                 onClick={handleBookConsultation}
//                 className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
//               >
//                 Get Notified When Available
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Styles Section */}
//         <div className="mb-12 md:mb-16">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Explore Design Styles</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//             {["Modern", "Contemporary", "Traditional", "Minimalist"].map((style, index) => (
//               <div key={index} className="bg-white p-5 md:p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100">
//                 <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg className="w-7 h-7 md:w-8 md:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{style}</h3>
//                 <p className="text-gray-600 text-sm text-center">Explore {style.toLowerCase()} {subCategoryData.name.toLowerCase()} designs</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CTA Section */}
//         <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl p-8 md:p-12">
//           <div className="text-center">
//             <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">Design Your Dream {subCategoryData.name}</h2>
//             <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
//               Get a free 3D visualization of your {subCategoryData.name.toLowerCase()} before you decide. 
//               Our experts will guide you through every step.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button 
//                 onClick={handleBookConsultation}
//                 className="bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3 px-6 md:py-3 md:px-8 rounded-lg transition duration-300 text-sm md:text-base"
//               >
//                 <div className="flex items-center justify-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
//                   </svg>
//                   Free 3D Design
//                 </div>
//               </button>
//               <button 
//                 onClick={handleGetQuote}
//                 className="bg-transparent border-2 border-white hover:bg-white/10 font-semibold py-3 px-6 md:py-3 md:px-8 rounded-lg transition duration-300 text-sm md:text-base"
//               >
//                 <div className="flex items-center justify-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
//                   </svg>
//                   Get Quote
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubCategoryPage;







import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSubCategory, getCategoryBySlug } from '../../data/categories';
import { useState, useEffect } from 'react';
import PopupForm from '../../components/PopupForm';

const SubCategoryPage = () => {
  const { category, subCategory } = useParams<{ category: string; subCategory: string }>();
  const subCategoryData = getSubCategory(category || '', subCategory || '');
  const categoryData = getCategoryBySlug(category || '');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(subCategory || '');
  const [showPopup, setShowPopup] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!subCategoryData || !categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Subcategory Not Found</h1>
          <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
          <Link to={`/${category}`} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Go back to {category?.replace('-', ' ') || 'Home'}
          </Link>
        </div>
      </div>
    );
  }

  const handleSubCategoryClick = (slug: string) => {
    setActiveTab(slug);
    navigate(`/${category}/${slug}`);
  };

  const handleBookConsultation = () => {
    setShowPopup(true);
  };

  const handleGetQuote = () => {
    // Scroll to top first, then navigate
    window.scrollTo(0, 0);
    navigate('/get-quote');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Popup Form */}
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8">
          <div className="flex items-center text-sm md:text-base">
            <Link to="/" className="text-gray-600 hover:text-teal-600 transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/${category}`} className="text-gray-600 hover:text-teal-600 transition-colors capitalize">
              {category?.replace('-', ' ')}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">{subCategoryData.name}</span>
          </div>
        </nav>

        {/* Simple Horizontal Subcategory Navigation */}
        {categoryData.subCategories && categoryData.subCategories.length > 0 && (
          <div className="mb-10 md:mb-14 border-b border-gray-200">
            <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-2 scrollbar-hide">
              {categoryData.subCategories.map((subCat) => (
                <button
                  key={subCat.id}
                  onClick={() => handleSubCategoryClick(subCat.slug)}
                  className={`flex-shrink-0 pb-4 relative transition-all duration-300 group ${
                    activeTab === subCat.slug
                      ? 'text-gray-900 font-bold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="text-base md:text-lg font-medium whitespace-nowrap px-2">
                    {subCat.name}
                  </span>
                  {activeTab === subCat.slug && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-t-full"></div>
                  )}
                  {activeTab !== subCat.slug && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-t-full group-hover:w-8 transition-all duration-300"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 mb-12 md:mb-16 border border-teal-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 md:gap-12">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                {subCategoryData.name} Designs
              </h1>
              <div className="max-w-3xl">
                <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  <span className="font-bold text-gray-900">What are {subCategoryData.name} Designs?</span> {subCategoryData.description}
                </p>
                {subCategoryData.designs > 0 && (
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    <span className="bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
                      <span className="font-bold">{subCategoryData.designs.toLocaleString()}+</span> Designs
                    </span>
                    <span className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-5 py-2.5 rounded-full text-base font-medium shadow-sm">
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
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl md:rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <p className="text-gray-800 font-semibold text-center">Premium {subCategoryData.name} Design Examples</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Design Items Section */}
        <div className="mb-16 md:mb-20">
          {subCategoryData.items && subCategoryData.items.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Popular {subCategoryData.name} Designs
                  </h2>
                  <p className="text-gray-600 text-lg">Browse our curated collection of premium designs</p>
                </div>
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 font-semibold rounded-xl hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-100 transition-all duration-300 border border-gray-200">
                  View All Designs
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {subCategoryData.items.map((item) => (
                  <div key={item.id} className="group bg-white rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2">
                    <div className="relative h-72 md:h-80 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={handleBookConsultation}
                          className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-base flex items-center justify-center shadow-md hover:shadow-lg"
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          Book Consultation
                        </button>
                        <button 
                          onClick={handleGetQuote}
                          className="flex-1 bg-white text-teal-600 hover:text-teal-700 font-semibold border-2 border-teal-500 hover:border-teal-600 py-4 px-6 rounded-xl transition-all duration-300 text-base hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Load More Button */}
              <div className="text-center mt-12 md:mt-16">
                <button className="inline-flex items-center px-10 py-4 bg-white text-teal-600 hover:text-teal-700 font-semibold rounded-xl border-2 border-teal-500 hover:border-teal-600 transition-all duration-300 text-lg hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Load More Designs
                </button>
              </div>
            </>
          ) : (
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl p-10 md:p-16 text-center border border-gray-200">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 md:w-14 md:h-14 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Designs Coming Soon</h2>
              <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                We're currently adding amazing {subCategoryData.name} designs to our collection. Stay tuned for exciting new additions!
              </p>
              <button 
                onClick={handleBookConsultation}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 text-lg shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Get Notified When Available
              </button>
            </div>
          )}
        </div>

        {/* Styles Section */}
        <div className="mb-16 md:mb-20">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Design Styles</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover different design aesthetics for your {subCategoryData.name.toLowerCase()}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {["Modern", "Contemporary", "Traditional", "Minimalist"].map((style, index) => (
              <div key={index} className="group bg-white p-6 md:p-8 rounded-2xl hover:shadow-xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{style}</h3>
                <p className="text-gray-600 text-center text-sm md:text-base">Explore {style.toLowerCase()} {subCategoryData.name.toLowerCase()} designs</p>
                <div className="mt-4 text-center">
                  <span className="inline-block w-8 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full group-hover:w-12 transition-all duration-300"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8">Design Your Dream {subCategoryData.name}</h2>
            <p className="text-xl md:text-2xl mb-8 md:mb-12 leading-relaxed">
              Get a free 3D visualization of your {subCategoryData.name.toLowerCase()} before you decide. 
              Our expert designers will guide you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={handleBookConsultation}
                className="bg-white text-teal-700 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                  Free 3D Design
                </div>
              </button>
              <button 
                onClick={handleGetQuote}
                className="bg-transparent border-2 border-white hover:bg-white/10 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-lg flex items-center justify-center hover:shadow-lg"
              >
                <div className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  Get Instant Quote
                </div>
              </button>
            </div>
            <p className="mt-8 text-teal-100 text-lg">
              Start your interior design journey today with our expert team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPage;