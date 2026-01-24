import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why do I need an interior designer?",
      answer: "Interior designers bring professional expertise in space planning, material selection, color schemes, and furniture arrangement to create functional, beautiful spaces that reflect your personal style while maximizing your budget and avoiding costly mistakes."
    },
    {
      question: "Why is Livspace perfect for your home interior design?",
      answer: "Livspace offers end-to-end interior solutions with a seamless process, 3D visualization before execution, vetted vendors, quality materials, and project management from start to finish, ensuring a stress-free experience."
    },
    {
      question: "What services are included under home interior design?",
      answer: "Our services include space planning, 3D design visualization, furniture selection, material sourcing, lighting design, project management, installation, and final styling - covering everything from concept to completion."
    },
    {
      question: "How much does home interiors cost?",
      answer: "The cost varies based on area, scope, materials, and customization. We offer transparent pricing with detailed estimates after understanding your requirements. Typically, home interiors start from ₹1,200 per square foot."
    },
    {
      question: "What will be the timelines for my project completion?",
      answer: "Standard projects take 45-60 days for completion, depending on size and complexity. We provide a detailed project timeline upfront and maintain regular updates throughout the process."
    },
    {
      question: "What are the trending interior design styles?",
      answer: "Current trends include minimalist contemporary, modern Indian, Scandinavian, industrial, Japandi (Japanese-Scandinavian fusion), and biophilic design that incorporates natural elements and sustainable materials."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            FAQs About Home Interior Design
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            Get answers to the most common questions about our interior design services
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* FAQ Items - Numbered List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-white shadow-lg border-orange-200' 
                    : 'bg-gray-50 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 md:px-8 py-6 md:py-8 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-xl"
                >
                  <div className="flex items-center space-x-4 md:space-x-6">
                    {/* Number */}
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-lg md:text-xl font-bold">{index + 1}</span>
                    </div>
                    
                    {/* Question */}
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Plus/Minus Icon */}
                  <div className="flex-shrink-0 ml-4">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}>
                      {activeIndex === index ? (
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Answer (Collapsible) */}
                <div 
                  className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ${
                    activeIndex === index 
                      ? 'max-h-96 pb-6 md:pb-8' 
                      : 'max-h-0'
                  }`}
                >
                  <div className="pl-16 md:pl-20 pr-4">
                    <div className="border-l-2 border-orange-500 pl-6 md:pl-8 py-2">
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="max-w-4xl mx-auto mt-16 md:mt-20">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* Additional Help */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Our design experts are here to help you with all your interior design queries
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;