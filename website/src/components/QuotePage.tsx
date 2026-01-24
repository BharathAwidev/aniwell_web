// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface Room {
//   id: number;
//   name: string;
//   count: number;
//   icon: string;
// }

// interface PackageType {
//   id: number;
//   name: string;
//   description: string;
//   features: string[];
//   priceLevel: 'Affordable' | 'Mid-range' | 'Elite';
// }

// interface FormData {
//   scopeOfWork: 'new' | 'renovation' | '';
//   bhkType: string;
//   rooms: Room[];
//   selectedPackage: number;
//   name: string;
//   email: string;
//   phone: string;
//   city: string;
//   sendUpdates: boolean;
// }

// const QuotePage = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showScopePopup, setShowScopePopup] = useState(false);
//   const [showBHKPopup, setShowBHKPopup] = useState(false);
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState<FormData>({
//     scopeOfWork: '',
//     bhkType: '',
//     rooms: [
//       { id: 1, name: 'Living Room', count: 1, icon: '🛋️' },
//       { id: 2, name: 'Kitchen', count: 1, icon: '🍳' },
//       { id: 3, name: 'Bedroom', count: 1, icon: '🛏️' },
//       { id: 4, name: 'Bathroom', count: 1, icon: '🚿' },
//       { id: 5, name: 'Dining', count: 1, icon: '🍽️' },
//     ],
//     selectedPackage: 0,
//     name: '',
//     email: '',
//     phone: '',
//     city: '',
//     sendUpdates: false,
//   });

//   const totalSteps = 4; // 4 steps total
//   const cities = [
//     "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
//     "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
//   ];

//   const packages: PackageType[] = [
//     {
//       id: 1,
//       name: 'Essentials',
//       description: 'Our base package with essential solutions for all your home interiors needs.',
//       features: ['Affordable pricing', 'Convenient designs', 'Basic accessories'],
//       priceLevel: 'Affordable'
//     },
//     {
//       id: 2,
//       name: 'Premium',
//       description: 'Our superior package offering solutions to take your interiors to the next level.',
//       features: ['Mid-range pricing', 'Premium designs', 'Wide range of accessories'],
//       priceLevel: 'Mid-range'
//     },
//     {
//       id: 3,
//       name: 'Luxe',
//       description: 'Our high-end package for the ultimate home interiors experience.',
//       features: ['Elite pricing', 'Lavish designs', 'Extensive range of accessories'],
//       priceLevel: 'Elite'
//     }
//   ];

//   const handleNext = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleScopeChange = (scope: 'new' | 'renovation') => {
//     setFormData({ ...formData, scopeOfWork: scope });
//   };

//   const handleBHKChange = (bhk: string) => {
//     setFormData({ ...formData, bhkType: bhk });
//   };

//   const handleRoomCountChange = (roomId: number, increment: boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       rooms: prev.rooms.map(room =>
//         room.id === roomId
//           ? { ...room, count: increment ? room.count + 1 : Math.max(1, room.count - 1) }
//           : room
//       )
//     }));
//   };

//   const handlePackageSelect = (packageId: number) => {
//     setFormData({ ...formData, selectedPackage: packageId });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     if (type === 'checkbox') {
//       const checkbox = e.target as HTMLInputElement;
//       setFormData({
//         ...formData,
//         [name]: checkbox.checked
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Quote form submitted:', formData);
//     alert('Thank you! Your quote request has been submitted. We will contact you shortly.');
//     navigate('/');
//   };

//   const isStepValid = () => {
//     switch (currentStep) {
//       case 1:
//         return formData.scopeOfWork !== '';
//       case 2:
//         return formData.bhkType !== '';
//       case 3:
//         return formData.selectedPackage !== 0;
//       case 4:
//         return formData.name.trim() !== '' &&
//                formData.email.trim() !== '' &&
//                formData.phone.trim() !== '' &&
//                formData.city.trim() !== '';
//       default:
//         return false;
//     }
//   };

//   const getStepTitle = () => {
//     const titles = [
//       'Select your scope of work',
//       'Select your BHK type',
//       'Pick your package',
//       'Please share your details so we can send you the estimate'
//     ];
//     return titles[currentStep - 1] || '';
//   };

//   const getStepNumber = () => {
//     const numbers = ['1', '2', '3', '4'];
//     const stepNames = ['SCOPE OF WORK', 'ROOMS TO DESIGN', 'PACKAGE', 'GET QUOTE'];
//     return {
//       number: numbers[currentStep - 1] || '',
//       name: stepNames[currentStep - 1] || ''
//     };
//   };

//   const StepIndicator = () => {
//     const current = getStepNumber();
//     return (
//       <div className="mb-8">
//         <div className="flex items-center space-x-2 mb-4">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center font-bold text-white">
//             {current.number}
//           </div>
//           <div>
//             <div className="text-sm text-gray-500 uppercase tracking-wide">STEP {current.number}</div>
//             <div className="text-xl font-bold text-gray-900">{current.name}</div>
//           </div>
//         </div>
//         <div className="text-left">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{getStepTitle()}</h2>
//           {currentStep === 1 && (
//             <p className="text-gray-600 mt-2">
//               To know more about this, 
//               <button 
//                 onClick={() => setShowScopePopup(true)}
//                 className="text-blue-600 hover:text-blue-800 hover:underline ml-1 font-medium"
//               >
//                 click here
//               </button>
//             </p>
//           )}
//           {currentStep === 2 && (
//             <p className="text-gray-600 mt-2">
//               To know more about this, 
//               <button 
//                 onClick={() => setShowBHKPopup(true)}
//                 className="text-blue-600 hover:text-blue-800 hover:underline ml-1 font-medium"
//               >
//                 click here
//               </button>
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Popup Components
//   const ScopePopup = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-bold text-gray-900">Scope of Work Details</h3>
//             <button
//               onClick={() => setShowScopePopup(false)}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <h4 className="font-bold text-blue-900 mb-2">Interiors for new home</h4>
//               <p className="text-gray-700">
//                 Includes modular kitchen, modular wardrobes, modular storage and services (such as false ceiling, painting, wallpaper, tiling, electrical, plumbing, flooring, wall design, etc.)
//               </p>
//             </div>
            
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//               <h4 className="font-bold text-green-900 mb-2">Renovation of existing home</h4>
//               <p className="text-gray-700">
//                 Everything in full home interiors along with any additional demolition and civil work required.
//               </p>
//             </div>
//           </div>
          
//           <button
//             onClick={() => setShowScopePopup(false)}
//             className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
//           >
//             Got it
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const BHKPopup = () => (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-bold text-gray-900">Why BHK Type Matters</h3>
//             <button
//               onClick={() => setShowBHKPopup(false)}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//               </svg>
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
//               <h4 className="font-bold text-indigo-900 mb-2">Why it matters</h4>
//               <p className="text-gray-700">
//                 The configuration and size of your home gives us a better idea of the magnitude of the project and helps us calculate the full home interior cost.
//               </p>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
//               {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK+'].map((bhk) => (
//                 <div key={bhk} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
//                   <div className="font-bold text-gray-900">{bhk}</div>
//                   <div className="text-xs text-gray-600 mt-1">Approx. {parseInt(bhk) * 500} sq.ft</div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <button
//             onClick={() => setShowBHKPopup(false)}
//             className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
//           >
//             Got it
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 md:py-12">
//       {/* Popups */}
//       {showScopePopup && <ScopePopup />}
//       {showBHKPopup && <BHKPopup />}

//       <div className="container mx-auto px-4">
//         <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
//           {/* Step Progress Bar */}
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
//             <div className="flex justify-between items-center">
//               {['SCOPE OF WORK', 'ROOMS TO DESIGN', 'PACKAGE', 'GET QUOTE'].map((step, index) => (
//                 <div key={step} className="flex flex-col items-center">
//                   <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold ${
//                     currentStep > index + 1 ? 'bg-white text-purple-600' :
//                     currentStep === index + 1 ? 'bg-white text-purple-600 border-2 border-white' :
//                     'bg-white/30 text-white'
//                   }`}>
//                     {index + 1}
//                   </div>
//                   <span className={`text-xs md:text-sm mt-2 font-medium hidden sm:block ${
//                     currentStep >= index + 1 ? 'text-white' : 'text-white/70'
//                   }`}>
//                     {step}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
//               <div 
//                 className="h-full bg-white transition-all duration-500"
//                 style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
//               ></div>
//             </div>
//           </div>

//           <div className="p-6 md:p-8">
//             <StepIndicator />

//             <form onSubmit={handleSubmit}>
//               {/* Step 1: Scope of Work */}
//               {currentStep === 1 && (
//                 <div className="space-y-6 mt-8">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div 
//                       className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
//                         formData.scopeOfWork === 'new' 
//                           ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-md' 
//                           : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                       }`}
//                       onClick={() => handleScopeChange('new')}
//                     >
//                       <div className="flex items-start space-x-4">
//                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                           formData.scopeOfWork === 'new' ? 'border-purple-500' : 'border-gray-300'
//                         }`}>
//                           {formData.scopeOfWork === 'new' && (
//                             <div className="w-3 h-3 rounded-full bg-purple-500"></div>
//                           )}
//                         </div>
//                         <div>
//                           <h3 className="text-xl font-bold text-gray-900 mb-2">Interiors for new home</h3>
//                         </div>
//                       </div>
//                     </div>

//                     <div 
//                       className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
//                         formData.scopeOfWork === 'renovation' 
//                           ? 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md' 
//                           : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                       }`}
//                       onClick={() => handleScopeChange('renovation')}
//                     >
//                       <div className="flex items-start space-x-4">
//                         <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                           formData.scopeOfWork === 'renovation' ? 'border-green-500' : 'border-gray-300'
//                         }`}>
//                           {formData.scopeOfWork === 'renovation' && (
//                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
//                           )}
//                         </div>
//                         <div>
//                           <h3 className="text-xl font-bold text-gray-900 mb-2">Renovation of existing home</h3>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Step 2: BHK Type */}
//               {currentStep === 2 && (
//                 <div className="space-y-6 mt-8">
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//                     {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK+'].map((bhk) => (
//                       <div
//                         key={bhk}
//                         className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
//                           formData.bhkType === bhk 
//                             ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-md' 
//                             : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                         }`}
//                         onClick={() => handleBHKChange(bhk)}
//                       >
//                         <div className="flex flex-col items-center space-y-3">
//                           <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                             formData.bhkType === bhk ? 'border-purple-500' : 'border-gray-300'
//                           }`}>
//                             {formData.bhkType === bhk && (
//                               <div className="w-3 h-3 rounded-full bg-purple-500"></div>
//                             )}
//                           </div>
//                           <span className="font-bold text-gray-900 text-lg">{bhk}</span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Step 3: Package Selection */}
//               {currentStep === 3 && (
//                 <div className="space-y-6 mt-8">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {packages.map((pkg) => (
//                       <div
//                         key={pkg.id}
//                         className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 h-full flex flex-col ${
//                           formData.selectedPackage === pkg.id 
//                             ? `border-purple-500 shadow-lg ${
//                                 pkg.id === 1 ? 'bg-gradient-to-br from-blue-50 to-cyan-50' :
//                                 pkg.id === 2 ? 'bg-gradient-to-br from-purple-50 to-pink-50' :
//                                 'bg-gradient-to-br from-amber-50 to-orange-50'
//                               }` 
//                             : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
//                         }`}
//                         onClick={() => handlePackageSelect(pkg.id)}
//                       >
//                         <div className="flex flex-col h-full">
//                           <div className="flex items-start justify-between mb-4">
//                             <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
//                             <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
//                               formData.selectedPackage === pkg.id ? 'border-purple-500' : 'border-gray-300'
//                             }`}>
//                               {formData.selectedPackage === pkg.id && (
//                                 <div className="w-3 h-3 rounded-full bg-purple-500"></div>
//                               )}
//                             </div>
//                           </div>
//                           <p className="text-gray-600 mb-4 flex-grow">{pkg.description}</p>
//                           <ul className="space-y-2 mb-4">
//                             {pkg.features.map((feature, index) => (
//                               <li key={index} className="flex items-start">
//                                 <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                                 </svg>
//                                 <span className="text-gray-700">{feature}</span>
//                               </li>
//                             ))}
//                           </ul>
//                           <div className="mt-4 pt-4 border-t border-gray-200">
//                             <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                               pkg.priceLevel === 'Affordable' ? 'bg-green-100 text-green-800' : 
//                               pkg.priceLevel === 'Mid-range' ? 'bg-yellow-100 text-yellow-800' : 
//                               'bg-purple-100 text-purple-800'
//                             }`}>
//                               {pkg.priceLevel} pricing
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Step 4: Contact Details */}
//               {currentStep === 4 && (
//                 <div className="space-y-6 mt-8">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-gray-700 font-semibold mb-2">
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
//                         placeholder="Enter your full name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-semibold mb-2">
//                         Email ID
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
//                         placeholder="Enter your email"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-semibold mb-2">
//                         📞 Phone number
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         required
//                         pattern="[0-9]{10}"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
//                         placeholder="Enter 10-digit mobile number"
//                       />
//                       <div className="mt-3 flex items-center">
//                         <input
//                           type="checkbox"
//                           id="sendUpdates"
//                           name="sendUpdates"
//                           checked={formData.sendUpdates}
//                           onChange={handleInputChange}
//                           className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
//                         />
//                         <label htmlFor="sendUpdates" className="ml-3 text-gray-700">
//                           Send me updates on WhatsApp
//                         </label>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-gray-700 font-semibold mb-2">
//                         Select City
//                       </label>
//                       <div className="relative">
//                         <select
//                           name="city"
//                           value={formData.city}
//                           onChange={handleInputChange}
//                           required
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors appearance-none bg-white pr-10"
//                         >
//                           <option value="">Choose your city</option>
//                           {cities.map((city) => (
//                             <option key={city} value={city}>
//                               {city}
//                             </option>
//                           ))}
//                         </select>
//                         <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                           <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-8 space-y-4">
//                     <p className="text-xs text-gray-500">
//                       By submitting this form, you agree to the{' '}
//                       <a href="#" className="text-purple-600 hover:underline font-medium">privacy policy</a>
//                       {' '}& terms and conditions
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       This site is protected by reCAPTCHA and the Google{' '}
//                       <a href="#" className="text-purple-600 hover:underline font-medium">Privacy Policy</a> and{' '}
//                       <a href="#" className="text-purple-600 hover:underline font-medium">Terms of Service</a> apply.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Navigation Buttons */}
//               <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={handleBack}
//                   disabled={currentStep === 1}
//                   className={`px-8 py-3 rounded-lg font-medium transition-colors ${
//                     currentStep === 1 
//                       ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
//                       : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300'
//                   }`}
//                 >
//                   ← BACK
//                 </button>

//                 {currentStep < 4 ? (
//                   <button
//                     type="button"
//                     onClick={handleNext}
//                     disabled={!isStepValid()}
//                     className={`px-8 py-3 rounded-lg font-medium transition-colors ${
//                       !isStepValid() 
//                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//                         : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     NEXT →
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     disabled={!isStepValid()}
//                     className={`px-8 py-3 rounded-lg font-medium transition-colors ${
//                       !isStepValid() 
//                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//                         : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     SUBMIT QUOTE REQUEST
//                   </button>
//                 )}
//               </div>
//             </form>

//             {/* Progress Indicator */}
//             <div className="mt-8">
//               <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
//                 <span className="font-medium">Step {currentStep} of 4</span>
//                 <span className="font-medium">{Math.round((currentStep / 4) * 100)}% Complete</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2.5">
//                 <div 
//                   className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full transition-all duration-500"
//                   style={{ width: `${(currentStep / 4) * 100}%` }}
//                 ></div>
//               </div>
//             </div>

//             {/* Summary Preview */}
//             {currentStep > 1 && (
//               <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                 <h4 className="font-bold text-gray-900 mb-3 flex items-center">
//                   <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                   Your Selection Summary:
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.scopeOfWork && (
//                     <span className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
//                       {formData.scopeOfWork === 'new' ? 'New Home' : 'Renovation'}
//                     </span>
//                   )}
//                   {formData.bhkType && (
//                     <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
//                       {formData.bhkType}
//                     </span>
//                   )}
//                   {formData.selectedPackage > 0 && (
//                     <span className="bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-sm font-medium">
//                       {packages.find(p => p.id === formData.selectedPackage)?.name} Package
//                     </span>
//                   )}
//                   <span className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm font-medium">
//                     {formData.rooms.reduce((total, room) => total + room.count, 0)} Rooms
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuotePage;





import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Room {
  id: number;
  name: string;
  count: number;
  icon: string;
}

interface PackageType {
  id: number;
  name: string;
  description: string;
  features: string[];
  priceLevel: 'Affordable' | 'Mid-range' | 'Elite';
}

interface FormData {
  scopeOfWork: 'new' | 'renovation' | '';
  bhkType: string;
  rooms: Room[];
  selectedPackage: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  sendUpdates: boolean;
}

const QuotePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showScopePopup, setShowScopePopup] = useState(false);
  const [showBHKPopup, setShowBHKPopup] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    scopeOfWork: '',
    bhkType: '',
    rooms: [
      { id: 1, name: 'Living Room', count: 1, icon: '🛋️' },
      { id: 2, name: 'Kitchen', count: 1, icon: '🍳' },
      { id: 3, name: 'Bedroom', count: 1, icon: '🛏️' },
      { id: 4, name: 'Bathroom', count: 1, icon: '🚿' },
      { id: 5, name: 'Dining', count: 1, icon: '🍽️' },
    ],
    selectedPackage: 0,
    name: '',
    email: '',
    phone: '',
    city: '',
    sendUpdates: false,
  });

  const totalSteps = 4;
  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const packages: PackageType[] = [
    {
      id: 1,
      name: 'Essentials',
      description: 'Our base package with essential solutions for all your home interiors needs.',
      features: ['Affordable pricing', 'Convenient designs', 'Basic accessories'],
      priceLevel: 'Affordable'
    },
    {
      id: 2,
      name: 'Premium',
      description: 'Our superior package offering solutions to take your interiors to the next level.',
      features: ['Mid-range pricing', 'Premium designs', 'Wide range of accessories'],
      priceLevel: 'Mid-range'
    },
    {
      id: 3,
      name: 'Luxe',
      description: 'Our high-end package for the ultimate home interiors experience.',
      features: ['Elite pricing', 'Lavish designs', 'Extensive range of accessories'],
      priceLevel: 'Elite'
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleScopeChange = (scope: 'new' | 'renovation') => {
    setFormData({ ...formData, scopeOfWork: scope });
  };

  const handleBHKChange = (bhk: string) => {
    setFormData({ ...formData, bhkType: bhk });
  };

  const handleRoomCountChange = (roomId: number, increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      rooms: prev.rooms.map(room =>
        room.id === roomId
          ? { ...room, count: increment ? room.count + 1 : Math.max(1, room.count - 1) }
          : room
      )
    }));
  };

  const handlePackageSelect = (packageId: number) => {
    setFormData({ ...formData, selectedPackage: packageId });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    console.log('Quote form submitted:', formData);
    alert('Thank you! Your quote request has been submitted. We will contact you shortly.');
    navigate('/');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.scopeOfWork !== '';
      case 2:
        return formData.bhkType !== '';
      case 3:
        return formData.selectedPackage !== 0;
      case 4:
        return formData.name.trim() !== '' &&
               formData.email.trim() !== '' &&
               formData.phone.trim() !== '' &&
               formData.city.trim() !== '';
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    const titles = [
      'Select your scope of work',
      'Select your BHK type',
      'Pick your package',
      'Please share your details so we can send you the estimate'
    ];
    return titles[currentStep - 1] || '';
  };

  const StepIndicator = () => {
    return (
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          {['SCOPE OF WORK', 'ROOMS TO DESIGN', 'PACKAGE', 'GET QUOTE'].map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                currentStep > index + 1 ? 'bg-teal-100 text-teal-700' :
                currentStep === index + 1 ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md' :
                'bg-gray-100 text-gray-400'
              }`}>
                {index + 1}
              </div>
              <span className={`text-xs md:text-sm mt-2 font-medium ${
                currentStep >= index + 1 ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>
        </div>
        <div className="text-left mt-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Get Your Quote</h1>
          <p className="text-gray-600 text-lg mb-4">Fill in the details below to get an instant estimate</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">{getStepTitle()}</h2>
          {currentStep === 1 && (
            <p className="text-gray-600 mt-2">
              To know more about this, 
              <button 
                onClick={() => setShowScopePopup(true)}
                className="text-teal-600 hover:text-teal-800 hover:underline ml-1 font-medium"
              >
                click here
              </button>
            </p>
          )}
          {currentStep === 2 && (
            <p className="text-gray-600 mt-2">
              To know more about this, 
              <button 
                onClick={() => setShowBHKPopup(true)}
                className="text-teal-600 hover:text-teal-800 hover:underline ml-1 font-medium"
              >
                click here
              </button>
            </p>
          )}
        </div>
      </div>
    );
  };

  // Popup Components
  const ScopePopup = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Scope of Work Details</h3>
            <button
              onClick={() => setShowScopePopup(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
              <h4 className="font-bold text-teal-800 mb-2">Interiors for new home</h4>
              <p className="text-gray-700">
                Includes modular kitchen, modular wardrobes, modular storage and services (such as false ceiling, painting, wallpaper, tiling, electrical, plumbing, flooring, wall design, etc.)
              </p>
            </div>
            
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h4 className="font-bold text-amber-800 mb-2">Renovation of existing home</h4>
              <p className="text-gray-700">
                Everything in full home interiors along with any additional demolition and civil work required.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowScopePopup(false)}
            className="mt-6 w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );

  const BHKPopup = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Why BHK Type Matters</h3>
            <button
              onClick={() => setShowBHKPopup(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-xl p-4">
              <h4 className="font-bold text-teal-800 mb-2">Why it matters</h4>
              <p className="text-gray-700">
                The configuration and size of your home gives us a better idea of the magnitude of the project and helps us calculate the full home interior cost.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK+'].map((bhk) => (
                <div key={bhk} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center hover:bg-white transition-colors">
                  <div className="font-bold text-gray-900">{bhk}</div>
                  <div className="text-xs text-gray-600 mt-1">Approx. {parseInt(bhk) * 500} sq.ft</div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setShowBHKPopup(false)}
            className="mt-6 w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Popups */}
      {showScopePopup && <ScopePopup />}
      {showBHKPopup && <BHKPopup />}

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <StepIndicator />

          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Scope of Work */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div 
                      className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        formData.scopeOfWork === 'new' 
                          ? 'border-teal-400 bg-gradient-to-br from-teal-50 to-white shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                      onClick={() => handleScopeChange('new')}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          formData.scopeOfWork === 'new' ? 'border-teal-500 bg-teal-500' : 'border-gray-300 bg-white'
                        }`}>
                          {formData.scopeOfWork === 'new' && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">Interiors for new home</h3>
                          <div className="flex items-center text-teal-600">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="font-medium">Includes modular kitchen, wardrobes, storage & services</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        formData.scopeOfWork === 'renovation' 
                          ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-white shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                      onClick={() => handleScopeChange('renovation')}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          formData.scopeOfWork === 'renovation' ? 'border-amber-500 bg-amber-500' : 'border-gray-300 bg-white'
                        }`}>
                          {formData.scopeOfWork === 'renovation' && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">Renovation of existing home</h3>
                          <div className="flex items-center text-amber-600">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="font-medium">Full interiors + demolition & civil work</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: BHK Type */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK+'].map((bhk) => (
                      <div
                        key={bhk}
                        className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-md ${
                          formData.bhkType === bhk 
                            ? 'border-teal-400 bg-gradient-to-br from-teal-50 to-white shadow-sm' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => handleBHKChange(bhk)}
                      >
                        <div className="flex flex-col items-center space-y-3">
                          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                            formData.bhkType === bhk ? 'border-teal-500 bg-teal-500' : 'border-gray-300 bg-white'
                          }`}>
                            {formData.bhkType === bhk ? (
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            ) : (
                              <span className="text-gray-400 text-lg">○</span>
                            )}
                          </div>
                          <span className="font-bold text-gray-900 text-xl">{bhk}</span>
                          <div className="text-sm text-gray-500">Approx. {parseInt(bhk) * 500} sq.ft</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Package Selection */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 h-full flex flex-col hover:shadow-xl ${
                          formData.selectedPackage === pkg.id 
                            ? `border-teal-400 shadow-lg ${
                                pkg.id === 1 ? 'bg-gradient-to-b from-teal-50 to-white' :
                                pkg.id === 2 ? 'bg-gradient-to-b from-emerald-50 to-white' :
                                'bg-gradient-to-b from-amber-50 to-white'
                              }` 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => handlePackageSelect(pkg.id)}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                pkg.priceLevel === 'Affordable' ? 'bg-teal-100 text-teal-800' : 
                                pkg.priceLevel === 'Mid-range' ? 'bg-emerald-100 text-emerald-800' : 
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {pkg.priceLevel} pricing
                              </span>
                            </div>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                              formData.selectedPackage === pkg.id ? 'border-teal-500 bg-teal-500' : 'border-gray-300 bg-white'
                            }`}>
                              {formData.selectedPackage === pkg.id && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-6 flex-grow">{pkg.description}</p>
                          <ul className="space-y-3 mb-6">
                            {pkg.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-gray-700">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Contact Details */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-gray-800 font-semibold mb-3 text-lg">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors text-lg bg-white"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-800 font-semibold mb-3 text-lg">
                          Email ID
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors text-lg bg-white"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-800 font-semibold mb-3 text-lg">
                          📞 Phone number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          pattern="[0-9]{10}"
                          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors text-lg bg-white"
                          placeholder="Enter 10-digit mobile number"
                        />
                        <div className="mt-4 flex items-center">
                          <input
                            type="checkbox"
                            id="sendUpdates"
                            name="sendUpdates"
                            checked={formData.sendUpdates}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-teal-600 rounded focus:ring-teal-400"
                          />
                          <label htmlFor="sendUpdates" className="ml-3 text-gray-700">
                            Send me updates on WhatsApp
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-800 font-semibold mb-3 text-lg">
                          Select City
                        </label>
                        <div className="relative">
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-colors appearance-none bg-white pr-12 text-lg"
                          >
                            <option value="">Choose your city</option>
                            {cities.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 space-y-4 pt-8 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        By submitting this form, you agree to the{' '}
                        <a href="#" className="text-teal-600 hover:text-teal-800 hover:underline font-medium">privacy policy</a>
                        {' '}& terms and conditions
                      </p>
                      <p className="text-sm text-gray-600">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a href="#" className="text-teal-600 hover:text-teal-800 hover:underline font-medium">Privacy Policy</a> and{' '}
                        <a href="#" className="text-teal-600 hover:text-teal-800 hover:underline font-medium">Terms of Service</a> apply.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-16 pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`px-10 py-4 rounded-xl font-medium transition-colors text-lg ${
                    currentStep === 1 
                      ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  ← BACK
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`px-10 py-4 rounded-xl font-medium transition-colors text-lg ${
                      !isStepValid() 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    NEXT →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepValid()}
                    className={`px-10 py-4 rounded-xl font-medium transition-colors text-lg ${
                      !isStepValid() 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    SUBMIT QUOTE REQUEST
                  </button>
                )}
              </div>
            </form>

            {/* Progress Summary */}
            <div className="mt-10">
              <div className="flex items-center justify-between text-lg text-gray-700 mb-4">
                <span className="font-medium">Step {currentStep} of 4</span>
                <span className="font-medium">{Math.round((currentStep / 4) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-teal-400 to-emerald-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Summary Preview */}
            {currentStep > 1 && (
              <div className="mt-10 p-8 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-xl mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Your Selection Summary:
                </h4>
                <div className="flex flex-wrap gap-3">
                  {formData.scopeOfWork && (
                    <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-base font-medium">
                      {formData.scopeOfWork === 'new' ? 'New Home' : 'Renovation'}
                    </span>
                  )}
                  {formData.bhkType && (
                    <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-base font-medium">
                      {formData.bhkType}
                    </span>
                  )}
                  {formData.selectedPackage > 0 && (
                    <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-base font-medium">
                      {packages.find(p => p.id === formData.selectedPackage)?.name} Package
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-base font-medium">
                    {formData.rooms.reduce((total, room) => total + room.count, 0)} Rooms
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotePage;