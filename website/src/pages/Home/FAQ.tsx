// import { useState } from "react";
// import PopupForm from "../../components/PopupForm"; // Adjust the import path as needed

// const FAQ = () => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const [showPopup, setShowPopup] = useState<boolean>(false);

//   const faqs = [
//     {
//       question: "What services does Aniwell Interior Design offer?",
//       answer: "Aniwell Interior Design provides end-to-end interior solutions, including residential and commercial interiors, space planning, modular kitchens, wardrobes, custom furniture, lighting design, and turnkey execution."
//     },
//     {
//       question: "Do you offer complete turnkey interior solutions?",
//       answer: "Yes. We handle the entire process from design concept and material selection to execution, installation, and handover ensuring a seamless, stress-free experience."
//     },
//     {
//       question: "How long does a typical interior project take?",
//       answer: "Project timelines depend on scope and size. On average, residential projects take 90 days after design finalization. Exact timelines are shared before execution begins."
//     },
//     {
//       question: "Can I customize the designs as per my budget and preferences?",
//       answer: "Absolutely. Every design is tailored to your lifestyle, aesthetic preferences, and budget without compromising on quality or functionality."
//     },
//     {
//       question: "Do you provide 3D designs before execution?",
//       answer: "Yes. Detailed 3D visualizations are provided so you can clearly understand the final look before we begin execution."
//     },
//     {
//       question: "What materials and brands do you use?",
//       answer: "We use high-quality, durable materials sourced from trusted brands. Material specifications are transparently shared with clients during the design phase."
//     },
//     {
//       question: "Is there a warranty on interiors done by Aniwell?",
//       answer: "Yes. We offer warranties on modular furniture and fittings as per brand standards, along with post-installation support."
//     },
//     {
//       question: "How is pricing calculated for interior projects?",
//       answer: "Pricing is based on design complexity, materials selected, area, and scope of work. A detailed cost breakdown is provided before project confirmation."
//     },
//     {
//       question: "Will I have a single point of contact during the project?",
//       answer: "Yes. A dedicated project manager will coordinate all stages and keep you updated throughout the project lifecycle."
//     },
//     {
//       question: "Do you offer after-completion support?",
//       answer: "Yes. We provide post-handover support to address any concerns and ensure long-term satisfaction."
//     }
//   ];

//   const toggleFAQ = (index: number) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const handleContactExperts = () => {
//     setShowPopup(true);
//     // Prevent background scrolling when popup is open
//     document.body.style.overflow = 'hidden';
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     // Restore scrolling when popup is closed
//     document.body.style.overflow = 'auto';
//   };

//   return (
//     <>
//       <section className="w-full py-12 md:py-16 bg-[#ccc]">
//         <div className="container mx-auto px-4 md:px-8 lg:px-16">
//           {/* Header Section */}
//           <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
//             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//               FAQs About Home Interior Design
//             </h2>
//             <p className="text-lg md:text-xl text-gray-800">
//               Get answers to the most common questions about our interior design services
//             </p>
//           </div>

//           {/* Divider */}
//           <div className="max-w-4xl mx-auto mb-8 md:mb-10">
//             <div className="border-t border-gray-400"></div>
//           </div>

//           {/* FAQ Items - Numbered List */}
//           <div className="max-w-4xl mx-auto">
//             <div className="space-y-4">
//               {faqs.map((faq, index) => (
//                 <div 
//                   key={index}
//                   className={`border border-gray-300 rounded-lg overflow-hidden transition-all duration-300 ${
//                     activeIndex === index 
//                       ? 'bg-white shadow-md border-orange-300' 
//                       : 'bg-gray-100 hover:bg-gray-200 hover:border-gray-400'
//                   }`}
//                 >
//                   {/* Question Row */}
//                   <button
//                     onClick={() => toggleFAQ(index)}
//                     className="w-full px-5 md:px-6 py-5 md:py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-lg"
//                   >
//                     <div className="flex items-center space-x-3 md:space-x-4">
//                       {/* Number */}
//                       <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center">
//                         <span className="text-base md:text-lg font-bold">{index + 1}</span>
//                       </div>
                      
//                       {/* Question */}
//                       <h3 className="text-lg md:text-xl font-semibold text-gray-900">
//                         {faq.question}
//                       </h3>
//                     </div>
                    
//                     {/* Plus/Minus Icon */}
//                     <div className="flex-shrink-0 ml-3">
//                       <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
//                         activeIndex === index 
//                           ? 'bg-orange-500 text-white' 
//                           : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
//                       }`}>
//                         {activeIndex === index ? (
//                           <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"></path>
//                           </svg>
//                         ) : (
//                           <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
//                           </svg>
//                         )}
//                       </div>
//                     </div>
//                   </button>
                  
//                   {/* Answer (Collapsible) */}
//                   <div 
//                     className={`px-5 md:px-6 overflow-hidden transition-all duration-300 ${
//                       activeIndex === index 
//                         ? 'max-h-96 pb-5 md:pb-6' 
//                         : 'max-h-0'
//                     }`}
//                   >
//                     <div className="pl-12 md:pl-14 pr-3">
//                       <div className="border-l-2 border-orange-500 pl-4 md:pl-5 py-1">
//                         <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//                           {faq.answer}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Bottom Divider */}
//           <div className="max-w-4xl mx-auto mt-8 md:mt-10">
//             <div className="border-t border-gray-400"></div>
//           </div>

//           {/* Additional Help */}
//           <div className="max-w-4xl mx-auto mt-8 text-center">
//             <div className="bg-orange-100 border border-orange-200 rounded-xl p-6 md:p-8">
//               <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
//                 Still have questions?
//               </h3>
//               <p className="text-base md:text-lg text-gray-700 mb-4">
//                 Our design experts are here to help you with all your interior design queries
//               </p>
//               <button 
//                 onClick={handleContactExperts}
//                 className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base md:text-lg font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
//               >
//                 Contact Our Experts
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Popup Form */}
//       {showPopup && (
//         <PopupForm 
//           title="Talk to a designer"
//           onClose={handleClosePopup}
//         />
//       )}
//     </>
//   );
// };

// export default FAQ;



import { useState } from "react";
import PopupForm from "../../components/PopupForm"; // Adjust the import path as needed

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const faqs = [
    {
      question: "What services does Aniwell Interior Design offer?",
      answer: "Aniwell Interior Design provides end-to-end interior solutions, including residential and commercial interiors, space planning, modular kitchens, wardrobes, custom furniture, lighting design, and turnkey execution."
    },
    {
      question: "Do you offer complete turnkey interior solutions?",
      answer: "Yes. We handle the entire process from design concept and material selection to execution, installation, and handover ensuring a seamless, stress-free experience."
    },
    {
      question: "How long does a typical interior project take?",
      answer: "Project timelines depend on scope and size. On average, residential projects take 90 days after design finalization. Exact timelines are shared before execution begins."
    },
    {
      question: "Can I customize the designs as per my budget and preferences?",
      answer: "Absolutely. Every design is tailored to your lifestyle, aesthetic preferences, and budget without compromising on quality or functionality."
    },
    {
      question: "Do you provide 3D designs before execution?",
      answer: "Yes. Detailed 3D visualizations are provided so you can clearly understand the final look before we begin execution."
    },
    {
      question: "What materials and brands do you use?",
      answer: "We use high-quality, durable materials sourced from trusted brands. Material specifications are transparently shared with clients during the design phase."
    },
    {
      question: "Is there a warranty on interiors done by Aniwell?",
      answer: "Yes. We offer warranties on modular furniture and fittings as per brand standards, along with post-installation support."
    },
    {
      question: "How is pricing calculated for interior projects?",
      answer: "Pricing is based on design complexity, materials selected, area, and scope of work. A detailed cost breakdown is provided before project confirmation."
    },
    {
      question: "Will I have a single point of contact during the project?",
      answer: "Yes. A dedicated project manager will coordinate all stages and keep you updated throughout the project lifecycle."
    },
    {
      question: "Do you offer after-completion support?",
      answer: "Yes. We provide post-handover support to address any concerns and ensure long-term satisfaction."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleContactExperts = () => {
    setShowPopup(true);
    // Prevent background scrolling when popup is open
    document.body.style.overflow = 'hidden';
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Restore scrolling when popup is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section className="w-full py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              FAQs About Home Interior Design
            </h2>
            <p className="text-lg md:text-xl text-gray-800">
              Get answers to the most common questions about our interior design services
            </p>
          </div>

          {/* Divider */}
          <div className="max-w-4xl mx-auto mb-8 md:mb-10">
            <div className="border-t border-gray-400"></div>
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
                      : 'bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
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
                          : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
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
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
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
            <div className="border-t border-gray-400"></div>
          </div>

          {/* Additional Help */}
          <div className="max-w-4xl mx-auto mt-8 text-center">
            <div className="bg-orange-100 border border-orange-200 rounded-xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Still have questions?
              </h3>
              <p className="text-base md:text-lg text-gray-700 mb-4">
                Our design experts are here to help you with all your interior design queries
              </p>
              <button 
                onClick={handleContactExperts}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base md:text-lg font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Form */}
      {showPopup && (
        <PopupForm 
          title="Talk to a designer"
          onClose={handleClosePopup}
        />
      )}
    </>
  );
};

export default FAQ;