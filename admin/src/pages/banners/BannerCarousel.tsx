import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { ChevronLeft, ChevronRight, X, Plus, Pause, Play, Trash2, Edit, Video, Image as ImageIcon, Eye, EyeOff, UploadCloud, ArrowUpDown, Check } from "lucide-react";

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

// Define proper types for slides with additional info
interface AdditionalInfo {
  text: string;
  isActive: boolean;
}

interface BaseSlide {
  id: number;
  type: "image" | "video";
  title: string;
  subtitle: string;
  buttonText: string;
  isActive: boolean;
  description?: string;
  sortOrder: number;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  additionalInfo: AdditionalInfo[];
}

interface VideoSlide extends BaseSlide {
  type: "video";
  videoLength: number;
}

interface ImageSlide extends BaseSlide {
  type: "image";
}

type Slide = VideoSlide | ImageSlide;

// Video Slide Preview Component
interface VideoSlidePreviewProps {
  videoSrc: string;
  isActive: boolean;
  onVideoEnd: () => void;
}

const VideoSlidePreview = ({ videoSrc, isActive, onVideoEnd }: VideoSlidePreviewProps) => {
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

// Image Slide Preview Component
interface ImageSlidePreviewProps {
  imageUrl: string;
  isActive: boolean;
}

const ImageSlidePreview = ({ imageUrl, isActive }: ImageSlidePreviewProps) => {
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

// Additional Info Item Component
interface AdditionalInfoItemProps {
  text: string;
  index: number;
  onEdit: (index: number, newText: string) => void;
  onToggle: (index: number) => void;
  onDelete: (index: number) => void;
}

const AdditionalInfoItem = ({ text, index, onEdit, onToggle, onDelete }: AdditionalInfoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(index, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(text);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 flex-1">
        <Check size={14} className="text-green-600 flex-shrink-0" />
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        ) : (
          <span className="text-sm text-gray-700">{text}</span>
        )}
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <Edit size={14} />
        </button>
        <button
          onClick={() => onDelete(index)}
          className="p-1 text-red-600 hover:text-red-800"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

// Main BannerCarousel Component
const BannerCarousel = () => {
  // Initial slides data with additional info
  const [slides, setSlides] = useState<Slide[]>([
    {
      id: 1,
      type: "image",
      title: "Designs that define you",
      subtitle: "Award Winning Studio",
      buttonText: "BOOK FREE CONSULTATION",
      isActive: true,
      description: "Transform your space with our expert interior design services.",
      sortOrder: 1,
      fileName: "design-studio.jpg",
      fileUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      fileSize: "2.5 MB",
      fileType: "image/jpeg",
      additionalInfo: [
        { text: "Free Design Consultation", isActive: true },
        { text: "45-Day Delivery", isActive: true },
        { text: "5-Year Warranty", isActive: true }
      ]
    },
    {
      id: 2,
      type: "image",
      title: "Turnkey home interior solutions",
      subtitle: "Crafting Excellence Since 1995",
      buttonText: "BOOK FREE CONSULTATION",
      isActive: true,
      description: "From concept to completion, we bring your vision to life.",
      sortOrder: 2,
      fileName: "interior-solutions.jpg",
      fileUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      fileSize: "3.1 MB",
      fileType: "image/jpeg",
      additionalInfo: [
        { text: "Custom Designs", isActive: true },
        { text: "Professional Installation", isActive: true },
        { text: "Quality Materials", isActive: true }
      ]
    },
    {
      id: 3,
      type: "video",
      title: "Home to beautiful interiors",
      subtitle: "India's Most Trusted Brand",
      buttonText: "BOOK FREE CONSULTATION",
      videoLength: 8,
      isActive: true,
      description: "Experience luxury and comfort in every corner of your home.",
      sortOrder: 3,
      fileName: "aniwell-intro.mp4",
      fileUrl: "/assets/Aniwell_Logo.mp4",
      fileSize: "15.2 MB",
      fileType: "video/mp4",
      additionalInfo: [
        { text: "Expert Designers", isActive: true },
        { text: "On-Time Delivery", isActive: true },
        { text: "Premium Quality", isActive: true }
      ]
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [newInfoText, setNewInfoText] = useState<string>("");

  const [newSlide, setNewSlide] = useState<Omit<BaseSlide, 'id' | 'sortOrder'> & {
    type: "image" | "video";
    videoLength?: number;
  }>({
    type: "image",
    title: "",
    subtitle: "",
    buttonText: "BOOK FREE CONSULTATION",
    isActive: true,
    description: "",
    fileName: "",
    fileUrl: "",
    fileSize: "",
    fileType: "",
    additionalInfo: [
      { text: "Free Design Consultation", isActive: true },
      { text: "45-Day Delivery", isActive: true },
      { text: "5-Year Warranty", isActive: true }
    ]
  });

  const autoSlideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add CSS styles to the document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Auto-rotate slides
  const goToNextSlide = () => {
    const activeSlides = slides.filter(slide => slide.isActive);
    if (activeSlides.length <= 1) return;
    
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % activeSlides.length;
      return nextIndex;
    });
  };

  const resetAutoSlideTimer = () => {
    // Clear existing timer
    if (autoSlideTimer.current) {
      clearTimeout(autoSlideTimer.current);
    }
    
    // Set new timer with appropriate duration based on current slide
    const activeSlides = slides.filter(slide => slide.isActive);
    if (activeSlides.length === 0 || !autoPlay) return;
    
    const currentSlide = activeSlides[currentIndex];
    const intervalDuration = currentSlide.type === "video" 
      ? (currentSlide as VideoSlide).videoLength * 1000
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
  }, [currentIndex, autoPlay, slides]);

  const handleVideoEnd = () => {
    goToNextSlide();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const activeSlides = slides.filter(slide => slide.isActive);
    if (activeSlides.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const prevSlide = () => {
    const activeSlides = slides.filter(slide => slide.isActive);
    if (activeSlides.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const toggleSlideStatus = (id: number) => {
    setSlides(
      slides.map((slide) =>
        slide.id === id ? { ...slide, isActive: !slide.isActive } : slide
      )
    );
  };

  const deleteSlide = (id: number) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      setSlides(slides.filter((slide) => slide.id !== id));
      const activeSlides = slides.filter(slide => slide.isActive && slide.id !== id);
      if (currentIndex >= activeSlides.length) {
        setCurrentIndex(Math.max(0, activeSlides.length - 1));
      }
    }
  };

  // Additional Info Functions
  const addAdditionalInfo = () => {
    if (!newInfoText.trim()) return;
    
    setNewSlide(prev => ({
      ...prev,
      additionalInfo: [
        ...prev.additionalInfo,
        { text: newInfoText.trim(), isActive: true }
      ]
    }));
    setNewInfoText("");
  };

  const updateAdditionalInfo = (index: number, newText: string) => {
    setNewSlide(prev => {
      const updatedInfo = [...prev.additionalInfo];
      if (index >= 0 && index < updatedInfo.length) {
        updatedInfo[index] = { ...updatedInfo[index], text: newText };
      }
      return { ...prev, additionalInfo: updatedInfo };
    });
  };

  const toggleAdditionalInfo = (index: number) => {
    setNewSlide(prev => {
      const updatedInfo = [...prev.additionalInfo];
      if (index >= 0 && index < updatedInfo.length) {
        updatedInfo[index] = { ...updatedInfo[index], isActive: !updatedInfo[index].isActive };
      }
      return { ...prev, additionalInfo: updatedInfo };
    });
  };

  const deleteAdditionalInfo = (index: number) => {
    setNewSlide(prev => ({
      ...prev,
      additionalInfo: prev.additionalInfo.filter((_, i) => i !== index)
    }));
  };

  const editSlide = (slide: Slide) => {
    setEditingSlide(slide);
    setIsEditing(true);
    if (slide.type === "video") {
      setNewSlide({
        type: "video",
        title: slide.title,
        subtitle: slide.subtitle,
        buttonText: slide.buttonText,
        isActive: slide.isActive,
        description: slide.description || "",
        videoLength: slide.videoLength,
        fileName: slide.fileName,
        fileUrl: slide.fileUrl,
        fileSize: slide.fileSize,
        fileType: slide.fileType,
        additionalInfo: [...slide.additionalInfo]
      });
    } else {
      setNewSlide({
        type: "image",
        title: slide.title,
        subtitle: slide.subtitle,
        buttonText: slide.buttonText,
        isActive: slide.isActive,
        description: slide.description || "",
        fileName: slide.fileName,
        fileUrl: slide.fileUrl,
        fileSize: slide.fileSize,
        fileType: slide.fileType,
        additionalInfo: [...slide.additionalInfo]
      });
    }
    setSelectedFile(null);
    setPreviewUrl(slide.fileUrl);
    setUploadProgress(null);
    setNewInfoText("");
    setShowAddModal(true);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    
    // Generate preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Set file details in form
    setNewSlide(prev => ({
      ...prev,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fileType: file.type
    }));
  };

  const simulateUpload = () => {
    if (!selectedFile) return;
    
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          
          // After upload completes, set the file URL
          if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setNewSlide(prev => ({
              ...prev,
              fileUrl: url
            }));
          }
          
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleAddSlide = () => {
    if (!selectedFile && !isEditing) {
      alert("Please select a file to upload");
      return;
    }

    const fileUrl = selectedFile ? URL.createObjectURL(selectedFile) : newSlide.fileUrl;

    const newSlideData: Slide = newSlide.type === "image" ? {
      id: slides.length + 1,
      type: "image",
      title: newSlide.title || "New Slide",
      subtitle: newSlide.subtitle || "Slide Subtitle",
      buttonText: newSlide.buttonText || "BOOK FREE CONSULTATION",
      isActive: newSlide.isActive || true,
      description: newSlide.description || "",
      sortOrder: slides.length + 1,
      fileName: newSlide.fileName,
      fileUrl: fileUrl,
      fileSize: newSlide.fileSize,
      fileType: newSlide.fileType,
      additionalInfo: newSlide.additionalInfo.filter(info => info.text.trim() !== "")
    } : {
      id: slides.length + 1,
      type: "video",
      title: newSlide.title || "New Slide",
      subtitle: newSlide.subtitle || "Slide Subtitle",
      buttonText: newSlide.buttonText || "BOOK FREE CONSULTATION",
      videoLength: newSlide.videoLength || 5,
      isActive: newSlide.isActive || true,
      description: newSlide.description || "",
      sortOrder: slides.length + 1,
      fileName: newSlide.fileName,
      fileUrl: fileUrl,
      fileSize: newSlide.fileSize,
      fileType: newSlide.fileType,
      additionalInfo: newSlide.additionalInfo.filter(info => info.text.trim() !== "")
    };

    setSlides([...slides, newSlideData]);
    resetForm();
    setShowAddModal(false);
  };

  const handleUpdateSlide = () => {
    if (!editingSlide) return;
    
    const fileUrl = selectedFile ? URL.createObjectURL(selectedFile) : newSlide.fileUrl;

    const updatedSlide = newSlide.type === "image" ? {
      ...editingSlide,
      type: "image" as const,
      title: newSlide.title,
      subtitle: newSlide.subtitle,
      buttonText: newSlide.buttonText,
      isActive: newSlide.isActive,
      description: newSlide.description,
      fileName: newSlide.fileName,
      fileUrl: fileUrl,
      fileSize: newSlide.fileSize,
      fileType: newSlide.fileType,
      additionalInfo: newSlide.additionalInfo.filter(info => info.text.trim() !== "")
    } : {
      ...editingSlide,
      type: "video" as const,
      title: newSlide.title,
      subtitle: newSlide.subtitle,
      buttonText: newSlide.buttonText,
      isActive: newSlide.isActive,
      description: newSlide.description,
      videoLength: newSlide.videoLength || 5,
      fileName: newSlide.fileName,
      fileUrl: fileUrl,
      fileSize: newSlide.fileSize,
      fileType: newSlide.fileType,
      additionalInfo: newSlide.additionalInfo.filter(info => info.text.trim() !== "")
    };

    setSlides(
      slides.map((slide) =>
        slide.id === editingSlide.id ? updatedSlide as Slide : slide
      )
    );
    resetForm();
    setIsEditing(false);
    setEditingSlide(null);
    setShowAddModal(false);
  };

  const resetForm = () => {
    setNewSlide({
      type: "image",
      title: "",
      subtitle: "",
      buttonText: "BOOK FREE CONSULTATION",
      isActive: true,
      description: "",
      fileName: "",
      fileUrl: "",
      fileSize: "",
      fileType: "",
      additionalInfo: [
        { text: "Free Design Consultation", isActive: true },
        { text: "45-Day Delivery", isActive: true },
        { text: "5-Year Warranty", isActive: true }
      ]
    });
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadProgress(null);
    setNewInfoText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSort = (id: number, direction: 'up' | 'down') => {
    const slideIndex = slides.findIndex(s => s.id === id);
    if (slideIndex === -1) return;

    const newSlides = [...slides];
    if (direction === 'up' && slideIndex > 0) {
      [newSlides[slideIndex], newSlides[slideIndex - 1]] = [newSlides[slideIndex - 1], newSlides[slideIndex]];
    } else if (direction === 'down' && slideIndex < slides.length - 1) {
      [newSlides[slideIndex], newSlides[slideIndex + 1]] = [newSlides[slideIndex + 1], newSlides[slideIndex]];
    }
    
    // Update sort order
    const updatedSlides = newSlides.map((slide, index) => ({
      ...slide,
      sortOrder: index + 1
    }));
    
    setSlides(updatedSlides);
  };

  const activeSlides = slides.filter(slide => slide.isActive);
  const currentSlide = activeSlides[currentIndex];

  return (
    <div className="p-4 md:p-6">
      <style>{styles}</style>

      {/* Page Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Banner Carousel Management</h1>
        <p className="text-sm md:text-base text-gray-600">Upload and manage carousel slides for homepage</p>
      </div>

      {/* Controls Bar */}
      <div className="mb-4 md:mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-white p-3 md:p-4 rounded-xl border border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 md:px-4 md:py-2 text-white hover:bg-blue-700 text-sm md:text-base"
          >
            <Plus size={16} className="md:size-5" />
            <span className="hidden sm:inline">Add Slide</span>
            <span className="sm:hidden">Add</span>
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-50 text-sm md:text-base"
          >
            {showPreview ? <EyeOff size={16} className="md:size-5" /> : <Eye size={16} className="md:size-5" />}
            <span className="hidden sm:inline">{showPreview ? "Hide Preview" : "Show Preview"}</span>
            <span className="sm:hidden">{showPreview ? "Hide" : "Show"}</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 hover:bg-gray-50 text-sm md:text-base"
          >
            {autoPlay ? <Pause size={16} className="md:size-5" /> : <Play size={16} className="md:size-5" />}
            <span className="hidden md:inline">{autoPlay ? "Pause Auto-play" : "Start Auto-play"}</span>
          </button>
          <div className="flex gap-2">
            <span className="text-xs md:text-sm text-gray-500">
              {activeSlides.length} active
            </span>
            <span className="text-xs md:text-sm text-gray-500">
              • {slides.length} total
            </span>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && currentSlide && (
        <div className="mb-6 md:mb-8 overflow-hidden rounded-xl border border-gray-200 bg-black">
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] w-full overflow-hidden">
            {/* Slides */}
            {activeSlides.map((slide, index) => {
              if (slide.type === "video") {
                return (
                  <VideoSlidePreview
                    key={slide.id}
                    videoSrc={slide.fileUrl}
                    isActive={index === currentIndex}
                    onVideoEnd={handleVideoEnd}
                  />
                );
              } else {
                return (
                  <ImageSlidePreview
                    key={slide.id}
                    imageUrl={slide.fileUrl}
                    isActive={index === currentIndex}
                  />
                );
              }
            })}

            {/* Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-center px-4 sm:px-6 md:px-8">
              <div className="max-w-2xl">
                {/* Subtitle Badge */}
                <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-4 animate-fadeInUp">
                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-amber-300 font-medium text-xs sm:text-sm">
                    {currentSlide.subtitle}
                  </span>
                </div>
                
                {/* Title */}
                <h1 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight" 
                  style={{ 
                    opacity: 0,
                    animation: 'fadeInUp 0.6s ease-out 0.1s forwards'
                  }}
                >
                  {currentSlide.title}
                </h1>
                
                {/* Description */}
                <p 
                  className="text-sm sm:text-base md:text-lg text-white/90 mb-6 max-w-xl" 
                  style={{ 
                    opacity: 0,
                    animation: 'fadeInUp 0.6s ease-out 0.2s forwards'
                  }}
                >
                  {currentSlide.description || "Transform your space with our expert interior design services."}
                </p>
                
                {/* CTA Button */}
                <button 
                  className="group inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-base sm:text-lg rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 mb-6" 
                  style={{ 
                    opacity: 0,
                    animation: 'fadeInUp 0.6s ease-out 0.3s forwards'
                  }}
                >
                  <span>{currentSlide.buttonText}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>

                {/* Additional Info */}
                {currentSlide.additionalInfo.filter(info => info.isActive).length > 0 && (
                  <div 
                    className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 text-white/80 text-sm sm:text-base" 
                    style={{ 
                      opacity: 0,
                      animation: 'fadeInUp 0.6s ease-out 0.4s forwards'
                    }}
                  >
                    {currentSlide.additionalInfo
                      .filter(info => info.isActive)
                      .map((info, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check size={16} className="text-amber-400 flex-shrink-0" />
                          <span>{info.text}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            {activeSlides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/10 backdrop-blur-sm p-2 text-white hover:bg-white/20 sm:left-4 sm:p-3"
                >
                  <ChevronLeft size={20} className="sm:size-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-white/10 backdrop-blur-sm p-2 text-white hover:bg-white/20 sm:right-4 sm:p-3"
                >
                  <ChevronRight size={20} className="sm:size-6" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {activeSlides.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex gap-1.5 sm:gap-2">
                {activeSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-amber-500 w-6 sm:w-8" 
                        : "bg-white/40 hover:bg-white/60 w-2 sm:w-3"
                    } h-2 sm:h-3`}
                  >
                    {index === currentIndex && (
                      <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Upload Form - Hidden on mobile, show in modal */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-4 md:p-6">
            <h3 className="mb-3 md:mb-4 text-lg font-semibold">
              {isEditing ? "Edit Slide" : "Upload New Slide"}
            </h3>
            
            <div className="space-y-3 md:space-y-4">
              {/* Type Selection */}
              <div>
                <label className="mb-1 md:mb-2 block text-sm font-medium text-gray-700">
                  Slide Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewSlide({ ...newSlide, type: "image" })}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                      newSlide.type === "image"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <ImageIcon size={14} className="md:size-4" />
                    Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSlide({ ...newSlide, type: "video" })}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                      newSlide.type === "video"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Video size={14} className="md:size-4" />
                    Video
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="mb-1 md:mb-2 block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  type="text"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Enter slide title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="mb-1 md:mb-2 block text-sm font-medium text-gray-700">
                  Subtitle *
                </label>
                <input
                  type="text"
                  value={newSlide.subtitle}
                  onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Enter slide subtitle"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="mb-1 md:mb-2 block text-sm font-medium text-gray-700">
                  {newSlide.type === "image" ? "Image File *" : "Video File *"}
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept={newSlide.type === "image" ? "image/*" : "video/*"}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {previewUrl ? (
                    <div className="space-y-2">
                      {newSlide.type === "image" ? (
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                          <Video size={32} className="text-white" />
                        </div>
                      )}
                      <p className="text-sm font-medium truncate">{newSlide.fileName}</p>
                      <p className="text-xs text-gray-500">{newSlide.fileSize}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <UploadCloud size={32} className="mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload {newSlide.type === "image" ? "an image" : "a video"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {newSlide.type === "image" ? "JPG, PNG, GIF up to 10MB" : "MP4, MOV up to 50MB"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Upload Progress */}
                {uploadProgress !== null && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}

                {/* Upload Button */}
                {selectedFile && uploadProgress === null && (
                  <button
                    onClick={simulateUpload}
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    <UploadCloud size={16} />
                    Upload File
                  </button>
                )}
              </div>

              {/* Video Length */}
              {newSlide.type === "video" && (
                <div>
                  <label className="mb-1 md:mb-2 block text-sm font-medium text-gray-700">
                    Video Length (seconds) *
                  </label>
                  <input
                    type="number"
                    value={newSlide.videoLength || 5}
                    onChange={(e) => setNewSlide({ ...newSlide, videoLength: parseInt(e.target.value) || 5 })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    min="1"
                    max="60"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label className="mb-1 md:mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newSlide.description || ""}
                  onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Enter slide description"
                  rows={3}
                />
              </div>

              {/* Additional Info Section */}
              <div>
                <label className="mb-1 md:mb-2 block text-sm font-medium text-gray-700">
                  Additional Info Points
                </label>
                <div className="space-y-2 mb-3">
                  {newSlide.additionalInfo.map((info, index) => (
                    <AdditionalInfoItem
                      key={index}
                      text={info.text}
                      index={index}
                      onEdit={updateAdditionalInfo}
                      onToggle={toggleAdditionalInfo}
                      onDelete={deleteAdditionalInfo}
                    />
                  ))}
                </div>
                
                {/* Add new info point */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInfoText}
                    onChange={(e) => setNewInfoText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addAdditionalInfo()}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Add new info point (e.g., Free Consultation)"
                  />
                  <button
                    onClick={addAdditionalInfo}
                    disabled={!newInfoText.trim()}
                    className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Press Enter or click + to add. Each slide can have multiple info points.
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={newSlide.isActive}
                  onChange={(e) => setNewSlide({ ...newSlide, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active (visible in carousel)
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-2 pt-3 md:pt-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditingSlide(null);
                        resetForm();
                      }}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateSlide}
                      disabled={!newSlide.title || !newSlide.subtitle || (!previewUrl && !newSlide.fileUrl)}
                      className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Update Slide
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={resetForm}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleAddSlide}
                      disabled={!newSlide.title || !newSlide.subtitle || !previewUrl}
                      className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Slide
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Slides Table */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">All Slides ({slides.length})</h3>
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="lg:hidden flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 text-sm"
                >
                  <Plus size={16} />
                  <span>Add Slide</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {slides.filter(s => s.type === "image").length} images
                  </span>
                  <span className="text-xs text-gray-500">
                    • {slides.filter(s => s.type === "video").length} videos
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">#</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Media</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Title & Subtitle</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Info Points</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {slides
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((slide) => (
                      <tr key={slide.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-3 py-3 sm:px-4 sm:py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {slide.sortOrder}
                            </span>
                            <div className="flex flex-col">
                              <button
                                onClick={() => handleSort(slide.id, 'up')}
                                disabled={slide.sortOrder === 1}
                                className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              >
                                <ArrowUpDown size={10} className="rotate-180 sm:size-3" />
                              </button>
                              <button
                                onClick={() => handleSort(slide.id, 'down')}
                                disabled={slide.sortOrder === slides.length}
                                className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              >
                                <ArrowUpDown size={10} className="sm:size-3" />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4">
                          <div className="h-14 w-20 sm:h-16 sm:w-24 overflow-hidden rounded-md">
                            {slide.type === "image" ? (
                              <img
                                src={slide.fileUrl}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                                <Video size={20} className="text-white sm:size-6" />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4">
                          <div>
                            <div className="font-medium text-gray-900 text-sm sm:text-base">{slide.title}</div>
                            <div className="text-xs sm:text-sm text-gray-600">{slide.subtitle}</div>
                            <div className="mt-1 text-xs text-gray-500 truncate max-w-[150px] sm:max-w-none">
                              {slide.fileName} • {slide.fileSize}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            slide.type === "image" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {slide.type === "image" ? <ImageIcon size={10} className="sm:size-3" /> : <Video size={10} className="sm:size-3" />}
                            {slide.type === "image" ? "Image" : "Video"}
                          </span>
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4">
                          <div className="flex flex-wrap gap-1">
                            {slide.additionalInfo.slice(0, 3).map((info, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs bg-gray-100 text-gray-700">
                                <Check size={8} />
                                {info.text.length > 15 ? `${info.text.substring(0, 15)}...` : info.text}
                              </span>
                            ))}
                            {slide.additionalInfo.length > 3 && (
                              <span className="text-xs text-gray-500">+{slide.additionalInfo.length - 3} more</span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            slide.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {slide.isActive ? <Eye size={10} className="sm:size-3" /> : <EyeOff size={10} className="sm:size-3" />}
                            {slide.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() => editSlide(slide)}
                              className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-100"
                              title="Edit"
                            >
                              <Edit size={14} className="sm:size-4" />
                            </button>
                            <button
                              onClick={() => toggleSlideStatus(slide.id)}
                              className={`rounded-lg p-1.5 ${
                                slide.isActive
                                  ? "text-gray-600 hover:bg-gray-200"
                                  : "text-green-600 hover:bg-green-100"
                              }`}
                              title={slide.isActive ? "Deactivate" : "Activate"}
                            >
                              {slide.isActive ? <EyeOff size={14} className="sm:size-4" /> : <Eye size={14} className="sm:size-4" />}
                            </button>
                            <button
                              onClick={() => deleteSlide(slide.id)}
                              className="rounded-lg p-1.5 text-red-600 hover:bg-red-100"
                              title="Delete"
                            >
                              <Trash2 size={14} className="sm:size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* Empty State */}
              {slides.length === 0 && (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 sm:h-16 sm:w-16">
                    <ImageIcon size={20} className="text-gray-400 sm:size-6" />
                  </div>
                  <h4 className="mb-2 text-base font-medium text-gray-900 sm:text-lg">No slides yet</h4>
                  <p className="mb-4 text-gray-600 text-sm sm:text-base">Upload your first slide to create a carousel</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-sm sm:text-base"
                  >
                    <Plus size={16} className="sm:size-5" />
                    Upload First Slide
                  </button>
                </div>
              )}
            </div>

            {/* Table Footer */}
            {slides.length > 0 && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 text-xs sm:text-sm text-gray-500">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    Showing {slides.length} slide{slides.length !== 1 ? 's' : ''}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>{activeSlides.length} active</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      <span>{slides.length - activeSlides.length} inactive</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Add/Edit Modal */}
      {(showAddModal || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {isEditing ? "Edit Slide" : "Upload New Slide"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setIsEditing(false);
                    setEditingSlide(null);
                    resetForm();
                  }}
                  className="rounded-lg p-2 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Type Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Slide Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNewSlide({ ...newSlide, type: "image" })}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                      newSlide.type === "image"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <ImageIcon size={16} />
                    Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewSlide({ ...newSlide, type: "video" })}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                      newSlide.type === "video"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Video size={16} />
                    Video
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  type="text"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Enter slide title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Subtitle *
                </label>
                <input
                  type="text"
                  value={newSlide.subtitle}
                  onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Enter slide subtitle"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {newSlide.type === "image" ? "Image File *" : "Video File *"}
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept={newSlide.type === "image" ? "image/*" : "video/*"}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {previewUrl ? (
                    <div className="space-y-2">
                      {newSlide.type === "image" ? (
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
                          <Video size={32} className="text-white" />
                        </div>
                      )}
                      <p className="text-sm font-medium truncate">{newSlide.fileName}</p>
                      <p className="text-xs text-gray-500">{newSlide.fileSize}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <UploadCloud size={32} className="mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload {newSlide.type === "image" ? "an image" : "a video"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {newSlide.type === "image" ? "JPG, PNG, GIF up to 10MB" : "MP4, MOV up to 50MB"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Upload Progress */}
                {uploadProgress !== null && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}

                {/* Upload Button */}
                {selectedFile && uploadProgress === null && (
                  <button
                    onClick={simulateUpload}
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    <UploadCloud size={16} />
                    Upload File
                  </button>
                )}
              </div>

              {/* Video Length */}
              {newSlide.type === "video" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Video Length (seconds) *
                  </label>
                  <input
                    type="number"
                    value={newSlide.videoLength || 5}
                    onChange={(e) => setNewSlide({ ...newSlide, videoLength: parseInt(e.target.value) || 5 })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    min="1"
                    max="60"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newSlide.description || ""}
                  onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Enter slide description"
                  rows={3}
                />
              </div>

              {/* Additional Info Section */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Additional Info Points
                </label>
                <div className="space-y-2 mb-3">
                  {newSlide.additionalInfo.map((info, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 flex-1">
                        <Check size={14} className="text-green-600" />
                        <span className="text-sm text-gray-700">{info.text}</span>
                      </div>
                      <button
                        onClick={() => deleteAdditionalInfo(index)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                
                {/* Add new info point */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newInfoText}
                    onChange={(e) => setNewInfoText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addAdditionalInfo()}
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Add new info point"
                  />
                  <button
                    onClick={addAdditionalInfo}
                    disabled={!newInfoText.trim()}
                    className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mobileIsActive"
                  checked={newSlide.isActive}
                  onChange={(e) => setNewSlide({ ...newSlide, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="mobileIsActive" className="ml-2 text-sm text-gray-700">
                  Active (visible in carousel)
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-2 pt-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditingSlide(null);
                        resetForm();
                        setShowAddModal(false);
                      }}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateSlide}
                      disabled={!newSlide.title || !newSlide.subtitle || (!previewUrl && !newSlide.fileUrl)}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Update Slide
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        resetForm();
                        setShowAddModal(false);
                      }}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSlide}
                      disabled={!newSlide.title || !newSlide.subtitle || !previewUrl}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Slide
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;