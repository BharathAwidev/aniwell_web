// src/pages/Contact.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPinIcon className="w-8 h-8" />,
      title: "Visit Our Office",
      details: "SBI Bank back side, Srila Park Pride Road",
      description: "Hyder Nagar, Hafeezpet, Hyderabad"
    },
    {
      icon: <PhoneIcon className="w-8 h-8" />,
      title: "Call Us",
      details: "+91 77991 83334",
      description: "Monday to Saturday, 9:00 AM - 7:00 PM"
    },
    {
      icon: <EnvelopeIcon className="w-8 h-8" />,
      title: "Email Us",
      details: "info@aniwellinteriors.com",
      description: "We respond within 24 hours"
    },
    {
      icon: <ClockIcon className="w-8 h-8" />,
      title: "Business Hours",
      details: "Mon - Sat: 9:00 AM - 7:00 PM",
      description: "Sunday: By appointment only"
    }
  ];

  const inquiryTypes = [
    "Residential Interior Design",
    "Commercial Interior Design",
    "Kitchen Design",
    "Wardrobe Design",
    "Renovation Services",
    "Consultation",
    "Other"
  ];

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-orange-100 mb-8">
              Let's start a conversation about your dream space. Our team is ready to bring your vision to life.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-orange-600 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-orange-600 font-medium mb-2">{item.details}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you soon.</p>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">
                  Thank you! Your message has been sent successfully. We'll contact you shortly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 resize-none"
                  placeholder="Tell us about your project requirements, preferences, and any specific needs..."
                />
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                <div className="text-sm text-gray-500">
                  * Required fields
                </div>
              </div>
            </form>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Office</h3>
              
              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-xl h-64 mb-6 flex items-center justify-center border border-orange-100">
                <div className="text-center">
                  <div className="text-4xl mb-2">📍</div>
                  <p className="text-gray-600 font-medium">Our Location</p>
                  <p className="text-sm text-gray-500 mt-2">SBI Bank back side, Hyder Nagar</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      SBI Bank back side, Srila Park Pride Road<br />
                      Hyder Nagar, Hafeezpet<br />
                      Hyderabad, Telangana 500085<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <PhoneIcon className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Call for Directions</h4>
                    <p className="text-gray-600">+91 77991 83334</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-2">Directions</h4>
                  <p className="text-gray-600 text-sm">
                    Located behind SBI Bank on Srila Park Pride Road. Easily accessible from Hafeezpet metro station.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-8 border border-orange-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What to Expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <span className="text-gray-700">Initial consultation with our design experts</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <span className="text-gray-700">Site visit and measurements (if required)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <span className="text-gray-700">Customized design proposal and quotation</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <span className="text-gray-700">Material selection and project timeline discussion</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-orange-200">
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold"
                >
                  Learn more about our process
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* How to Reach Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚇</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">By Metro</h3>
              <p className="text-gray-600">
                Nearest Metro: Hafeezpet Station<br />
                Walking distance: 10-15 minutes
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">By Car</h3>
              <p className="text-gray-600">
                Ample parking available<br />
                Near SBI Bank, Hyder Nagar
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚌</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">By Bus</h3>
              <p className="text-gray-600">
                Bus stop: Hyder Nagar<br />
                Buses: 217K, 226G, 286
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;