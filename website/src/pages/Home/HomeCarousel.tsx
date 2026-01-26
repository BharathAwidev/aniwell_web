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

// CSS Animations - Add this to your global CSS file or use inline styles
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

// Popup Form Component
interface PopupFormProps {
  title?: string;
  onClose?: () => void;
}

const PopupForm = ({ title = "Talk to a designer", onClose }: PopupFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    sendUpdates: false
  });

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checkbox.checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    if (onClose) onClose();
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.phone.trim() !== '' && 
           formData.city.trim() !== '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-600 mt-1">Get expert consultation for your dream home</p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                placeholder="Enter your email address"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">🇮🇳 +91</div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full pl-16 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">Our designer will call you on this number</p>
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500 mr-1">*</span>
                Select City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              >
                <option value="">Choose your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* WhatsApp Updates */}
            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                id="sendUpdates"
                name="sendUpdates"
                checked={formData.sendUpdates}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
              />
              <label htmlFor="sendUpdates" className="ml-3 text-sm text-gray-600">
                Send me updates on WhatsApp about new designs, offers, and tips
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 ${
                isFormValid()
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              BOOK FREE CONSULTATION
            </button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">✓ Trusted by</div>
                <div className="font-semibold text-gray-700">5000+ Families</div>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">✓ Serving</div>
                <div className="font-semibold text-gray-700">25+ Cities</div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-100">
              By submitting this form, you agree to our{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                privacy policy
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                terms & conditions
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Carousel Component
const HomeCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
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
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === current 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105"
            }`}
            style={{ zIndex: index === current ? 10 : 0 }}
          >
            {/* Background Image with Parallax Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: index === current ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 10s ease-out'
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              {/* Subtitle Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fadeInUp">
                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-amber-300 font-medium text-sm">
                  {slides[current].subtitle}
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
                {slides[current].title}
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
              
              {/* CTA Button */}
              <button 
                onClick={handleBookConsultation}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105" 
                style={{ 
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out 0.3s forwards'
                }}
              >
                <span>{slides[current].buttonText}</span>
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

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 xl:left-8 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:text-amber-300" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 xl:right-8 top-1/2 transform -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:text-amber-300" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
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

      {/* Popup Form */}
      {showForm && <PopupForm onClose={handleCloseForm} />}
    </>
  );
};

export default HomeCarousel;