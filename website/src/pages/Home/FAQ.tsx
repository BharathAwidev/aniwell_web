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
    <section className="w-full py-12 md:py-16 bg-[#ccc]"> {/* Changed to #ccc */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            FAQs About Home Interior Design
          </h2>
          <p className="text-lg md:text-xl text-gray-800"> {/* Changed to gray-800 for better contrast */}
            Get answers to the most common questions about our interior design services
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto mb-8 md:mb-10">
          <div className="border-t border-gray-400"></div> {/* Darkened divider */}
        </div>

        {/* FAQ Items - Numbered List */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`border border-gray-300 rounded-lg overflow-hidden transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-white shadow-md border-orange-300' 
                    : 'bg-gray-100 hover:bg-gray-200 hover:border-gray-400' /* Changed to lighter gray */
                }`}
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-5 md:px-6 py-5 md:py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    {/* Number */}
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center">
                      <span className="text-base md:text-lg font-bold">{index + 1}</span>
                    </div>
                    
                    {/* Question */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  
                  {/* Plus/Minus Icon */}
                  <div className="flex-shrink-0 ml-3">
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      activeIndex === index 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400' /* Changed to darker gray */
                    }`}>
                      {activeIndex === index ? (
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
                
                {/* Answer (Collapsible) */}
                <div 
                  className={`px-5 md:px-6 overflow-hidden transition-all duration-300 ${
                    activeIndex === index 
                      ? 'max-h-96 pb-5 md:pb-6' 
                      : 'max-h-0'
                  }`}
                >
                  <div className="pl-12 md:pl-14 pr-3">
                    <div className="border-l-2 border-orange-500 pl-4 md:pl-5 py-1">
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed"> {/* Changed to gray-700 */}
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
        <div className="max-w-4xl mx-auto mt-8 md:mt-10">
          <div className="border-t border-gray-400"></div> {/* Darkened divider */}
        </div>

        {/* Additional Help */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <div className="bg-orange-100 border border-orange-200 rounded-xl p-6 md:p-8"> {/* Lightened background */}
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            <p className="text-base md:text-lg text-gray-700 mb-4"> {/* Changed to gray-700 */}
              Our design experts are here to help you with all your interior design queries
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base md:text-lg font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Contact Our Experts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;