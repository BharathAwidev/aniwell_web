// import { useEffect, useState, useRef } from "react";
// import video from '../../assets/Aniwell_Logo.mp4';
// import PopupForm from "../../components/PopupForm"; // Import the PopupForm component

// const slides = [
//   {
//     type: "video",
//     source: video,
//     title: "Home to beautiful interiors",
//     subtitle: "India's Most Trusted Brand",
//     buttonText: "BOOK FREE CONSULTATION",
//     videoLength: 8,
//   },
//   {
//     type: "image",
//     image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
//     title: "Designs that define you",
//     subtitle: "Award Winning Studio",
//     buttonText: "BOOK FREE CONSULTATION",
//   },
//   {
//     type: "image",
//     image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
//     title: "Turnkey home interior solutions",
//     subtitle: "Crafting Excellence Since 1995",
//     buttonText: "BOOK FREE CONSULTATION",
//   },
// ];

// // CSS Animations
// const styles = `
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }

// @keyframes slideUp {
//   from { 
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to { 
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// .animate-fadeIn {
//   animation: fadeIn 0.3s ease-out;
// }

// .animate-slideUp {
//   animation: slideUp 0.4s ease-out;
// }

// .animate-fadeInUp {
//   animation: fadeInUp 0.6s ease-out forwards;
//   opacity: 0;
// }
// `;

// // Define proper types for slides
// interface VideoSlide {
//   type: "video";
//   source: string;
//   title: string;
//   subtitle: string;
//   buttonText: string;
//   videoLength: number;
// }

// interface ImageSlide {
//   type: "image";
//   image: string;
//   title: string;
//   subtitle: string;
//   buttonText: string;
// }

// type Slide = VideoSlide | ImageSlide;

// // Video Slide Component
// interface VideoSlideProps {
//   videoSrc: string;
//   isActive: boolean;
//   onVideoEnd: () => void;
// }

// const VideoSlide = ({ videoSrc, isActive, onVideoEnd }: VideoSlideProps) => {
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       if (isActive) {
//         videoRef.current.currentTime = 0;
//         videoRef.current.play().catch(e => console.log("Video play error:", e));
//       } else {
//         videoRef.current.pause();
//       }
//     }
//   }, [isActive]);

//   return (
//     <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//       isActive 
//         ? "opacity-100 scale-100" 
//         : "opacity-0 scale-105"
//     }`} style={{ zIndex: isActive ? 10 : 0 }}>
//       <video
//         ref={videoRef}
//         className="absolute inset-0 w-full h-full object-cover"
//         muted
//         playsInline
//         onEnded={onVideoEnd}
//         preload="metadata"
//       >
//         <source src={videoSrc} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//     </div>
//   );
// };

// // Image Slide Component
// interface ImageSlideProps {
//   imageUrl: string;
//   isActive: boolean;
// }

// const ImageSlide = ({ imageUrl, isActive }: ImageSlideProps) => {
//   return (
//     <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//       isActive 
//         ? "opacity-100 scale-100" 
//         : "opacity-0 scale-105"
//     }`} style={{ zIndex: isActive ? 10 : 0 }}>
//       {/* Background Image with Parallax Effect */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ 
//           backgroundImage: `url(${imageUrl})`,
//           transform: isActive ? 'scale(1.05)' : 'scale(1)',
//           transition: 'transform 10s ease-out'
//         }}
//       />
      
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//     </div>
//   );
// };

// // Main Carousel Component
// const HomeCarousel = () => {
//   const [current, setCurrent] = useState(0);
//   const [showForm, setShowForm] = useState(false);
//   const autoSlideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const goToNextSlide = () => {
//     setCurrent((prev) => (prev + 1) % slides.length);
//   };

//   const resetAutoSlideTimer = () => {
//     // Clear existing timer
//     if (autoSlideTimer.current) {
//       clearTimeout(autoSlideTimer.current);
//     }
    
//     // Set new timer with appropriate duration based on current slide
//     const currentSlide = slides[current] as Slide;
//     const intervalDuration = currentSlide.type === "video" 
//       ? currentSlide.videoLength * 1000
//       : 5000;
    
//     autoSlideTimer.current = setTimeout(goToNextSlide, intervalDuration);
//   };

//   useEffect(() => {
//     resetAutoSlideTimer();
    
//     return () => {
//       if (autoSlideTimer.current) {
//         clearTimeout(autoSlideTimer.current);
//       }
//     };
//   }, [current]);

//   const handleVideoEnd = () => {
//     if (current === 0) {
//       goToNextSlide();
//     }
//   };

//   const handleSlideClick = (index: number) => {
//     setCurrent(index);
//   };

//   const handleBookConsultation = () => {
//     setShowForm(true);
//     // Prevent body scroll when form is open
//     document.body.style.overflow = 'hidden';
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     // Re-enable body scroll
//     document.body.style.overflow = 'unset';
//   };

//   // Add CSS styles to the document head
//   useEffect(() => {
//     const styleElement = document.createElement('style');
//     styleElement.innerHTML = styles;
//     document.head.appendChild(styleElement);
    
//     return () => {
//       document.head.removeChild(styleElement);
//     };
//   }, []);

//   return (
//     <>
//       <div className="relative w-full h-screen bg-black overflow-hidden">
//         {/* Slides */}
//         {slides.map((slide, index) => {
//           const currentSlide = slide as Slide;
//           if (currentSlide.type === "video") {
//             return (
//               <VideoSlide
//                 key={index}
//                 videoSrc={currentSlide.source}
//                 isActive={index === current}
//                 onVideoEnd={handleVideoEnd}
//               />
//             );
//           } else {
//             return (
//               <ImageSlide
//                 key={index}
//                 imageUrl={currentSlide.image}
//                 isActive={index === current}
//               />
//             );
//           }
//         })}

//         {/* Content */}
//         <div className="absolute inset-0 z-20 flex items-center">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="max-w-3xl">
//               {/* Subtitle Badge */}
//               <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fadeInUp">
//                 <div className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
//                 <span className="text-amber-300 font-medium text-sm">
//                   {(slides[current] as Slide).subtitle}
//                 </span>
//               </div>
              
//               {/* Title */}
//               <h1 
//                 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight" 
//                 style={{ 
//                   opacity: 0,
//                   animation: 'fadeInUp 0.6s ease-out 0.1s forwards'
//                 }}
//               >
//                 {(slides[current] as Slide).title}
//               </h1>
              
//               {/* Description */}
//               <p 
//                 className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl" 
//                 style={{ 
//                   opacity: 0,
//                   animation: 'fadeInUp 0.6s ease-out 0.2s forwards'
//                 }}
//               >
//                 Transform your space with our expert interior design services. From concept to completion, we bring your vision to life.
//               </p>
              
//               {/* CTA Button - Connected to PopupForm */}
//               <button 
//                 onClick={handleBookConsultation}
//                 className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105" 
//                 style={{ 
//                   opacity: 0,
//                   animation: 'fadeInUp 0.6s ease-out 0.3s forwards'
//                 }}
//               >
//                 <span>{(slides[current] as Slide).buttonText}</span>
//                 <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
//               </button>

//               {/* Additional Info */}
//               <div 
//                 className="flex flex-wrap items-center gap-6 mt-8 text-white/80 text-sm" 
//                 style={{ 
//                   opacity: 0,
//                   animation: 'fadeInUp 0.6s ease-out 0.4s forwards'
//                 }}
//               >
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>Free Design Consultation</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>45-Day Delivery</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                   </svg>
//                   <span>5-Year Warranty</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dots Indicator */}
// <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
//   {slides.map((_, index) => (
//     <div key={index} className="relative">
//       <button
//         onClick={() => handleSlideClick(index)}
//         className={`relative rounded-full transition-all duration-300 ${
//           index === current 
//             ? "bg-amber-500 w-2" 
//             : "bg-white/40 hover:bg-white/60 w-1.5"
//         } h-1.5`}
//         aria-label={`Go to slide ${index + 1}`}
//       >
//         {index === current && (
//           <div className="absolute -inset-1 rounded-full bg-amber-500 animate-ping opacity-30"></div>
//         )}
//       </button>
//     </div>
//   ))}
// </div>
    
//       </div>

//       {/* Popup Form - Connected to the button */}
//       {showForm && <PopupForm onClose={handleCloseForm} />}
//     </>
//   );
// };

// export default HomeCarousel;





import { useEffect, useState, useRef } from "react";
import { getSlides, type SlidesResponse, type SlideData } from "../../../api/slide.api"; // Import from slide.api.ts
import PopupForm from "../../components/PopupForm";

// CSS Animations (same as before)
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

// Video Slide Component (same as before)
interface VideoSlideProps {
  videoSrc: string;
  isActive: boolean;
  onVideoEnd: () => void;
  videoLength: number;
}

const VideoSlide = ({ videoSrc, isActive, onVideoEnd, videoLength }: VideoSlideProps) => {
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
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
};

// Image Slide Component (same as before)
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
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          transform: isActive ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 10s ease-out'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  );
};

// Main Carousel Component
const HomeCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const autoSlideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch slides from backend
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const response = await getSlides();
        const apiResponse = response.data as SlidesResponse;
        
        if (apiResponse.status && apiResponse.result.data) {
          // Filter only active slides and sort by sort_order
          const activeSlides = apiResponse.result.data
            .filter(slide => slide.is_active === "1")
            .sort((a, b) => parseInt(a.sort_order) - parseInt(b.sort_order));
          
          setSlides(activeSlides);
        } else {
          setError("Failed to load slides");
        }
      } catch (err: any) {
        console.error("Error fetching slides:", err);
        const errorMessage = err.response?.data?.message || err.message || "Error loading slides";
        setError(errorMessage);
        // Use fallback data if API fails
        setSlides(getFallbackSlides());
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Fallback slides in case API fails
  const getFallbackSlides = (): SlideData[] => {
    return [
      {
        id: "1",
        type: "image",
        title: "Home to beautiful interiors",
        caption: "India's Most Trusted Brand",
        description: "Transform your space with our expert interior design services. From concept to completion, we bring your vision to life.",
        file_path: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        file_type: "image/jpeg",
        file_size: "0",
        video_length: null,
        additional_info: [
          { text: "Free Design Consultation", isActive: true },
          { text: "45-Day Delivery", isActive: true },
          { text: "5-Year Warranty", isActive: true }
        ],
        show_book_consultation: "1",
        button_text: "BOOK FREE CONSULTATION",
        is_active: "1",
        sort_order: "0",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      },
      {
        id: "2",
        type: "image",
        title: "Designs that define you",
        caption: "Award Winning Studio",
        description: "Transform your space with our expert interior design services. From concept to completion, we bring your vision to life.",
        file_path: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        file_type: "image/jpeg",
        file_size: "0",
        video_length: null,
        additional_info: [
          { text: "Free Design Consultation", isActive: true },
          { text: "45-Day Delivery", isActive: true },
          { text: "5-Year Warranty", isActive: true }
        ],
        show_book_consultation: "1",
        button_text: "BOOK FREE CONSULTATION",
        is_active: "1",
        sort_order: "1",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null
      }
    ];
  };

  const goToNextSlide = () => {
    if (slides.length > 0) {
      setCurrent((prev) => (prev + 1) % slides.length);
    }
  };

  const resetAutoSlideTimer = () => {
    if (autoSlideTimer.current) {
      clearTimeout(autoSlideTimer.current);
    }
    
    if (slides.length > 0) {
      const currentSlide = slides[current];
      const intervalDuration = currentSlide.type === "video" 
        ? (currentSlide.video_length || 8) * 1000
        : 5000;
      
      autoSlideTimer.current = setTimeout(goToNextSlide, intervalDuration);
    }
  };

  useEffect(() => {
    resetAutoSlideTimer();
    
    return () => {
      if (autoSlideTimer.current) {
        clearTimeout(autoSlideTimer.current);
      }
    };
  }, [current, slides]);

  const handleVideoEnd = () => {
    goToNextSlide();
  };

  const handleSlideClick = (index: number) => {
    setCurrent(index);
  };

  const handleBookConsultation = () => {
    setShowForm(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setShowForm(false);
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

  // Helper function to construct full file URL
  const getFileUrl = (filePath: string): string => {
    if (!filePath) return '';
    
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    
    const baseUrl = "http://apitaskmgt.biyss.com";
    
    if (filePath.startsWith('/')) {
      return `${baseUrl}${filePath}`;
    } else {
      return `${baseUrl}/${filePath}`;
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        <span className="ml-4 text-white text-lg">Loading slides...</span>
      </div>
    );
  }

  // Show error state
  if (error && slides.length === 0) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-red-400 mb-4">⚠️</div>
          <p className="text-lg mb-2">Failed to load slides</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  // If no slides available
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg">No slides available at the moment</p>
          <p className="text-sm text-gray-400 mt-2">Please check back later</p>
        </div>
      </div>
    );
  }

  const currentSlide = slides[current];

  return (
    <>
      <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => {
          const isActive = index === current;
          
          if (slide.type === "video") {
            return (
              <VideoSlide
                key={slide.id}
                videoSrc={getFileUrl(slide.file_path)}
                isActive={isActive}
                onVideoEnd={handleVideoEnd}
                videoLength={slide.video_length || 8}
              />
            );
          } else {
            return (
              <ImageSlide
                key={slide.id}
                imageUrl={getFileUrl(slide.file_path)}
                isActive={isActive}
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
                  {currentSlide.caption}
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
                {currentSlide.title}
              </h1>
              
              {/* Description */}
              <p 
                className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl" 
                style={{ 
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out 0.2s forwards'
                }}
              >
                {currentSlide.description}
              </p>
              
              {/* CTA Button */}
              {currentSlide.show_book_consultation === "1" && (
                <button 
                  onClick={handleBookConsultation}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105" 
                  style={{ 
                    opacity: 0,
                    animation: 'fadeInUp 0.6s ease-out 0.3s forwards'
                  }}
                >
                  <span>{currentSlide.button_text || "BOOK FREE CONSULTATION"}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              )}

              {/* Additional Info */}
              {currentSlide.additional_info && currentSlide.additional_info.length > 0 && (
                <div 
                  className="flex flex-wrap items-center gap-6 mt-8 text-white/80 text-sm" 
                  style={{ 
                    opacity: 0,
                    animation: 'fadeInUp 0.6s ease-out 0.4s forwards'
                  }}
                >
                  {currentSlide.additional_info
                    .filter(info => info.isActive)
                    .map((info, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{info.text}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => handleSlideClick(index)}
                  className={`relative rounded-full transition-all duration-300 ${
                    index === current 
                      ? "bg-amber-500 w-2" 
                      : "bg-white/40 hover:bg-white/60 w-1.5"
                  } h-1.5`}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  {index === current && (
                    <div className="absolute -inset-1 rounded-full bg-amber-500 animate-ping opacity-30"></div>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popup Form */}
      {showForm && <PopupForm onClose={handleCloseForm} />}
    </>
  );
};

export default HomeCarousel;