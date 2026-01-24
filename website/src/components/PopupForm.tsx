import { useState } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <span className="text-red-500 mr-1">*</span>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <span className="text-red-500 mr-1">*</span>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <span className="text-red-500 mr-1">*</span>
                📞 Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter 10-digit mobile number"
              />
              <p className="mt-2 text-sm text-gray-500">Please enter a valid mobile number</p>
            </div>

            {/* WhatsApp Updates */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sendUpdates"
                name="sendUpdates"
                checked={formData.sendUpdates}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="sendUpdates" className="ml-3 text-gray-700">
                Send me updates on WhatsApp
              </label>
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <span className="text-red-500 mr-1">*</span>
                Select City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
              >
                <option value="">Choose your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                isFormValid()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              BOOK CONSULTATION
            </button>

            {/* Terms and Conditions */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting this form, you agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800 underline">
                privacy policy
              </a>
              {' '}& terms and conditions
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;