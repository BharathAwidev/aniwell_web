const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">ANIWELL INTERIORS</h1>
            <p className="text-gray-300 text-sm mb-6">
              We create beautiful, functional spaces that reflect your personality and lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <span className="text-xl">📹</span>
              </a>
            </div>
          </div>

          {/* OFFERINGS */}
          <div>
            <h3 className="text-lg font-bold mb-4">OFFERINGS</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Home Interiors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Office Interiors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Modular Kitchens
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Wardrobes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Furniture
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-bold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
            <div className="space-y-4">
              <div>
                <div className="text-gray-300 text-sm mb-1">Call us</div>
                <div className="text-lg md:text-xl font-bold">1800-309-0930</div>
              </div>
              <div>
                <div className="text-gray-300 text-sm mb-1">Email us</div>
                <div className="text-base md:text-lg">contact@aniwellinteriors.com</div>
              </div>
              <div>
                <div className="text-gray-300 text-sm mb-1">Address</div>
                <div className="text-sm">123 Design Street, Mumbai, Maharashtra 400001</div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800"></div>

        {/* DOWNLOAD APP */}
        <div className="mb-8 text-center">
          <h3 className="text-lg font-bold mb-4">DOWNLOAD OUR APP</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
              <div className="text-2xl">📱</div>
              <div className="text-left">
                <div className="text-xs text-gray-300">GET IT ON</div>
                <div className="font-bold">Google Play</div>
              </div>
            </button>
            
            <button className="flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
              <div className="text-2xl">📱</div>
              <div className="text-left">
                <div className="text-xs text-gray-300">Download on the</div>
                <div className="font-bold">App Store</div>
              </div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-800"></div>

        {/* Copyright */}
        <div className="text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Aniwell Interiors. All rights reserved.</p>
          <p className="mt-2 text-xs text-gray-500">GST No: 27AAACA1234B1Z1 | CIN: U74999MH2015PTC123456</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;