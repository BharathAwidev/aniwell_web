import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  Download,
  Apple,
  Play,
} from "lucide-react";

const Footer = () => {



  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-500" },
    { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-500" },
    { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-blue-400" },
    { icon: Youtube, label: "YouTube", href: "#", color: "hover:text-red-500" },
    { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-700" },
  ];

  const offerings = [
    "Home Interiors",
    "Office Interiors",
    "Modular Kitchens",
    "Wardrobes",
    "Furniture",
    "False Ceiling",
    "Painting Services",
    "Renovation"
  ];

  const companyLinks = [
    "About Us",
    "Careers",
    "Privacy Policy",
    "Terms & Conditions",
    "Contact Us",
    "Store Locator",
    "Customer Reviews",
    "Blog"
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Call us",
      content: "1800-309-0930",
      subtitle: "Mon-Sat: 9AM-8PM"
    },
    {
      icon: Mail,
      title: "Email us",
      content: "contact@aniwellinteriors.com",
      subtitle: "Response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit us",
      content: "123 Design Street, Mumbai",
      subtitle: "Maharashtra 400001"
    }
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-950 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="relative">
        {/* Top Pattern */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ANIWELL INTERIORS
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed">
                We create beautiful, functional spaces that reflect your personality and lifestyle. 
                Transforming houses into homes since 2010.
              </p>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">Connect With Us</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`group flex items-center justify-center w-10 h-10 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* OFFERINGS */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
              <span className="text-amber-400">Our</span>
              <span>Services</span>
            </h3>
            <ul className="space-y-3">
              {offerings.map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="group flex items-center text-gray-300 hover:text-white text-sm transition-all duration-300 hover:translate-x-1"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-amber-400 transition-all duration-300 mr-1" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
              <span className="text-amber-400">Company</span>
              <span>Info</span>
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="group flex items-center text-gray-300 hover:text-white text-sm transition-all duration-300 hover:translate-x-1"
                  >
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-amber-400 transition-all duration-300 mr-1" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className="text-lg font-bold mb-6 pb-3 border-b border-gray-800 flex items-center gap-2">
              <span className="text-amber-400">Get In</span>
              <span>Touch</span>
            </h3>
            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-gray-700 group-hover:border-amber-500/30 transition-all duration-300">
                      <info.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
                        {info.title}
                      </div>
                      <div className="text-white font-medium mb-1 group-hover:text-amber-300 transition-colors duration-300">
                        {info.content}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {info.subtitle}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App Download */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-4">
                <Download className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">Mobile Experience</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Download Our App
              </h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Get personalized design ideas, 3D visualization, and exclusive app-only offers.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="group relative overflow-hidden flex items-center justify-center gap-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 px-8 py-4 rounded-2xl border border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="text-3xl">📱</div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">GET IT ON</div>
                    <div className="font-bold text-lg flex items-center gap-2">
                      <Play className="w-5 h-5" />
                      Google Play
                    </div>
                  </div>
                </div>
              </button>
              
              <button className="group relative overflow-hidden flex items-center justify-center gap-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 px-8 py-4 rounded-2xl border border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="text-3xl">📱</div>
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="font-bold text-lg flex items-center gap-2">
                      <Apple className="w-5 h-5" />
                      App Store
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

       

    
        {/* Copyright & Links */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Aniwell Interiors. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                GST No: 27AAACA1234B1Z1 | CIN: U74999MH2015PTC123456
              </p>
            </div>
      
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;