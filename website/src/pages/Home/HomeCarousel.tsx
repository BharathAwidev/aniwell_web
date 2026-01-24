// import { useEffect, useState } from "react";
// import "./Home.css";

// const slides = [
//   {
//     image:
//       "https://images.livspace-cdn.com/w:1920/h:1080/plain/https://livspace-cms-assets.s3.ap-south-1.amazonaws.com/homepage/banner1.jpg",
//     title: "Home to beautiful interiors",
//   },
//   {
//     image:
//       "https://images.livspace-cdn.com/w:1920/h:1080/plain/https://livspace-cms-assets.s3.ap-south-1.amazonaws.com/homepage/banner2.jpg",
//     title: "Designs that define you",
//   },
//   {
//     image:
//       "https://images.livspace-cdn.com/w:1920/h:1080/plain/https://livspace-cms-assets.s3.ap-south-1.amazonaws.com/homepage/banner3.jpg",
//     title: "Turnkey home interior solutions",
//   },
// ];

// const HomeCarousel = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="carousel">
//       {slides.map((slide, index) => (
//         <div
//           key={index}
//           className={`carousel-slide ${
//             index === current ? "active" : ""
//           }`}
//           style={{ backgroundImage: `url(${slide.image})` }}
//         >
//           <div className="carousel-overlay">
//             <h1>{slide.title}</h1>
//             <button>BOOK FREE CONSULTATION</button>
//           </div>
//         </div>
//       ))}

//       {/* Dots */}
//       <div className="carousel-dots">
//         {slides.map((_, index) => (
//           <span
//             key={index}
//             className={index === current ? "dot active" : "dot"}
//             onClick={() => setCurrent(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomeCarousel;






// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const slides = [
//   {
//     image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
//     title: "Home to beautiful interiors",
//     subtitle: "India's Most Trusted Brand",
//     buttonText: "BOOK FREE CONSULTATION",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
//     title: "Designs that define you",
//     subtitle: "Award Winning Studio",
//     buttonText: "BOOK FREE CONSULTATION",
//   },
//   {
//     image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
//     title: "Turnkey home interior solutions",
//     subtitle: "Crafting Excellence Since 1995",
//     buttonText: "BOOK FREE CONSULTATION",
//   },
// ];

// const HomeCarousel = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   };

//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* About Us Link - Fixed position */}
//       <div className="absolute top-6 md:top-8 right-6 md:right-8 z-30">
//         <a
//           href="/about"
//           className="text-white hover:text-amber-300 font-medium text-base md:text-lg lg:text-xl transition-colors duration-300"
//         >
//           About Us
//         </a>
//       </div>

//       {/* Slides Container */}
//       <div className="absolute inset-0">
//         {slides.map((slide, index) => (
//           <div
//             key={index}
//             className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//               index === current 
//                 ? "opacity-100 z-10" 
//                 : "opacity-0 z-0 pointer-events-none"
//             }`}
//           >
//             {/* Background Image */}
//             <div className="absolute inset-0">
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
              
//               {/* Dark Overlay */}
//               <div className="absolute inset-0 bg-black/40" />
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Content Overlay - Only current slide content */}
//       <div className="absolute inset-0 z-20 flex items-center justify-center">
//         <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
//           <div className="max-w-4xl mx-auto text-center">
//             {/* Subtitle */}
//             <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-sm mb-4 md:mb-6 animate-fadeIn">
//               <span className="text-amber-300 text-sm md:text-base font-semibold">
//                 {slides[current].subtitle}
//               </span>
//             </div>
            
//             {/* Title */}
//             <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight animate-fadeIn animation-delay-200">
//               {slides[current].title}
//             </h1>
            
//             {/* Button */}
//             <button className="group inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg md:rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl animate-fadeIn animation-delay-400">
//               <span className="text-sm md:text-base lg:text-lg">
//                 {slides[current].buttonText}
//               </span>
//               <span className="group-hover:translate-x-2 transition-transform duration-300">
//                 →
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
//         aria-label="Previous slide"
//       >
//         <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
//       </button>
      
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
//         aria-label="Next slide"
//       >
//         <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
//       </button>

//       {/* Dots Indicator */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2 md:gap-3">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrent(index)}
//             className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
//               index === current
//                 ? "bg-amber-500 w-6 md:w-8"
//                 : "bg-white/60 hover:bg-white"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Progress Bar */}
//       <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
//         <div 
//           className="h-full bg-amber-500 transition-all duration-1000 ease-out"
//           style={{ width: `${((current + 1) / slides.length) * 100}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// export default HomeCarousel;



import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Home to beautiful interiors",
    subtitle: "India's Most Trusted Brand",
    buttonText: "BOOK FREE CONSULTATION",
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Designs that define you",
    subtitle: "Award Winning Studio",
    buttonText: "BOOK FREE CONSULTATION",
  },
  {
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    title: "Turnkey home interior solutions",
    subtitle: "Crafting Excellence Since 1995",
    buttonText: "BOOK FREE CONSULTATION",
  },
];

const HomeCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: index === current ? 10 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <div className="text-center max-w-6xl">
          <div className="inline-block px-6 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full mb-6">
            <span className="text-amber-300 font-semibold">
              {slides[current].subtitle}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            {slides[current].title}
          </h1>
          
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <span>{slides[current].buttonText}</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-amber-500 w-8" : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;