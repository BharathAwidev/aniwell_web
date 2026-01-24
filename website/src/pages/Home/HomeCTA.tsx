// HomeCTA.tsx
const HomeCTA = () => {
  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Beautiful Home Interior"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-orange-500/80"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Text */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Your dream home is just a click away
          </h2>
          
          {/* Get Started Button */}
          <button className="group px-16 py-5 bg-white text-orange-600 hover:bg-gray-100 text-xl md:text-2xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <span className="flex items-center justify-center space-x-3">
              <span>GET STARTED</span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
          </button>
          
          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">10K+</div>
              <div className="text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">45 Days</div>
              <div className="text-sm">Move-in Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">10 Years</div>
              <div className="text-sm">Warranty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">4.9★</div>
              <div className="text-sm">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCTA;