// src/pages/Category/DesignDetailPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PopupForm from "../../components/PopupForm";

// Static data for the design details
const designDetails = {
  id: "1",
  title: "Contemporary L-Shaped Kitchen Design with Lime Green and Grey Cabinets",
  category: "Kitchen",
  subCategory: "kitchen-designs",
  images: [
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ],
  layout: "L-Shaped Kitchen Design",
  dimension: "15x7 feet",
  style: "Contemporary",
  color: "Lime and medium grey",
  features: {
    shutterFinish: [
      "Lime: Laminate in high gloss finish",
      "Medium grey: Laminate in matte finish"
    ],
    countertop: "Granite",
    storage: [
      "This kitchen optimizes storage with a two-tone scheme: cool gray upper cabinets mounted above a long stretch of lime-green lower units.",
      "The upper cabinetry provides concealed space for dishes and pantry items, while the broad lower drawers and shallow pull-outs keep pots, pans, lids, and utensils neatly organized.",
      "A dedicated drawer stack near the cooktop hosts utensils and small tools, and the refrigerator alcove remains uncluttered for a clean, functional workflow."
    ],
    specialFeatures: [
      "A bold modern contrast defines the space: sleek stainless appliances set against vibrant lime cabinetry and soft gray uppers.",
      "Under-cabinet lighting highlights the marble-like backsplash and dark countertops, while a slim, integrated hood maintains a streamlined silhouette.",
      "The vertical fridge design with a clean finish, plus open-top shelf accents and soft-close hardware, create a hotel-grade, contemporary kitchen that is both stylish and highly practical."
    ],
    idealFor: "Small families"
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

const DesignDetailPage = () => {
  const { category, subCategory } = useParams<{
    category: string;
    subCategory: string;
    designId: string;
  }>();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookConsultation = () => {
    setShowPopup(true);
  };

  const handleGetQuote = () => {
    window.scrollTo(0, 0);
    navigate("/get-quote");
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === designDetails.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? designDetails.images.length - 1 : prevIndex - 1
    );
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

  return (
    <div className="min-h-screen bg-[#d8d8d8]">
      {/* Popup Form */}
      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8">
          <div className="flex items-center text-sm md:text-base">
            <Link
              to="/"
              className="text-gray-600 hover:text-teal-600 transition-colors flex items-center"
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
              className="text-gray-600 hover:text-teal-600 transition-colors capitalize"
            >
              {category?.replace("-", " ") || "Category"}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              to={`/${category}/${subCategory}`}
              className="text-gray-600 hover:text-teal-600 transition-colors capitalize"
            >
              {subCategory?.replace("-", " ") || "Subcategory"}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold truncate max-w-xs md:max-w-lg">
              {designDetails.title}
            </span>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Left Side - Images */}
          <div className="lg:w-1/2">
            <div className="sticky top-6">
              {/* Main Image Carousel */}
              <div className="mb-6 relative">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl bg-white">
                  <img
                    src={designDetails.images[currentImageIndex]}
                    alt={`${designDetails.title} - View ${currentImageIndex + 1}`}
                    className="w-full h-64 md:h-96 lg:h-[500px] object-cover transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Carousel Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                    aria-label="Previous image"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                    aria-label="Next image"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {designDetails.images.length}
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
                  {designDetails.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="inline-flex items-center bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 px-5 py-3 rounded-full font-bold text-lg">
                    {designDetails.dimension}
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
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  
                  <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {designDetails.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-48 bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 w-16 h-16 flex items-center justify-center bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full p-3">
                            <img
                              src={spec.icon}
                              alt={spec.title}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `<div class="text-2xl font-bold text-teal-600">${spec.title.charAt(0)}</div>`;
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
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Key Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Kitchen Design Details
                </h2>
                
                <div className="space-y-6">
                  {/* Layout */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Layout:
                    </h3>
                    <p className="text-gray-700">{designDetails.layout}</p>
                  </div>

                  {/* Room Dimension */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Room Dimension:
                    </h3>
                    <p className="text-gray-700">{designDetails.dimension}</p>
                  </div>

                  {/* Style */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Style:
                    </h3>
                    <p className="text-gray-700">{designDetails.style}</p>
                  </div>

                  {/* Colour */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Colour:
                    </h3>
                    <p className="text-gray-700">{designDetails.color}</p>
                  </div>

                  {/* Shutter finish */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Shutter finish:
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {designDetails.features.shutterFinish.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Countertop Material */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Countertop Material:
                    </h3>
                    <p className="text-gray-700">{designDetails.features.countertop}</p>
                  </div>

                  {/* Storage Features */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Storage Features:
                    </h3>
                    <ul className="space-y-3">
                      {designDetails.features.storage.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Special Features */}
                  <div className="pb-4 border-b border-gray-100">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Special Features:
                    </h3>
                    <ul className="space-y-3">
                      {designDetails.features.specialFeatures.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal for */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                      Ideal for:
                    </h3>
                    <p className="text-gray-700">{designDetails.features.idealFor}</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBookConsultation}
                    className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-lg flex items-center justify-center shadow-lg hover:shadow-xl whitespace-nowrap"
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
                    className="flex-1 bg-white text-teal-600 hover:text-teal-700 font-semibold py-4 px-6 rounded-xl border-2 border-teal-500 hover:border-teal-600 transition-all duration-300 text-lg flex items-center justify-center whitespace-nowrap hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50"
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