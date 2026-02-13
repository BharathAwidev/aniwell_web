// src/pages/Policies.tsx
import { useState } from 'react';
import { DocumentTextIcon, ShieldCheckIcon, UserIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const Policies = () => {
  const [activeTab, setActiveTab] = useState('privacy');

  const policies = {
    privacy: {
      title: "Privacy Policy",
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      lastUpdated: "December 1, 2023",
      content: [
        {
          title: "Information We Collect",
          content: "We collect personal information that you provide directly to us, such as when you fill out a contact form, schedule a consultation, or communicate with us. This may include your name, email address, phone number, address, project details, and any other information you choose to provide."
        },
        {
          title: "How We Use Your Information",
          content: "We use the information we collect to provide, maintain, and improve our services, communicate with you about your projects, send you updates and marketing communications (where permitted), respond to your inquiries, and for other business purposes."
        },
        {
          title: "Information Sharing",
          content: "We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our business, conducting our business, or servicing you, so long as those parties agree to keep this information confidential."
        },
        {
          title: "Data Security",
          content: "We implement appropriate technical and organizational security measures designed to protect your personal information. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%."
        },
        {
          title: "Your Rights",
          content: "You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your information. To exercise these rights, please contact us using the information provided below."
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      icon: <DocumentTextIcon className="w-6 h-6" />,
      lastUpdated: "December 1, 2023",
      content: [
        {
          title: "Agreement to Terms",
          content: "By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
        },
        {
          title: "Services Description",
          content: "Aniwell Interiors provides interior design consultation, project management, and execution services. All designs, concepts, and proposals remain the intellectual property of Aniwell Interiors unless otherwise agreed in writing."
        },
        {
          title: "Consultation and Estimates",
          content: "Initial consultations may be free or charged depending on the scope. All estimates provided are based on current material costs and labor rates and are subject to change until a formal agreement is signed. Site visits may incur additional charges based on location."
        },
        {
          title: "Payment Terms",
          content: "Projects typically require a 30% advance payment before commencement, 40% upon material procurement, and 30% upon completion. All payments are non-refundable once work has commenced. Late payments may incur additional charges."
        },
        {
          title: "Project Timeline",
          content: "While we provide estimated timelines for project completion, these are subject to change due to material availability, site conditions, client decisions, and other factors beyond our control. We will communicate any delays promptly."
        },
        {
          title: "Warranty",
          content: "We provide a 1-year warranty on workmanship and materials from the date of project completion. This warranty covers defects in materials and workmanship but does not cover damage caused by misuse, accidents, or normal wear and tear."
        }
      ]
    },
    refund: {
      title: "Cancellation & Refund Policy",
      icon: <CreditCardIcon className="w-6 h-6" />,
      lastUpdated: "December 1, 2023",
      content: [
        {
          title: "Consultation Fees",
          content: "Paid consultation fees are non-refundable once the consultation has been conducted. If you need to reschedule, please notify us at least 24 hours in advance."
        },
        {
          title: "Project Cancellation",
          content: "If you cancel a project after the design phase has begun but before execution, you will be charged for work completed up to that point. Any remaining advance payment beyond work completed may be refunded at our discretion."
        },
        {
          title: "Material Orders",
          content: "Once materials are ordered specifically for your project, they cannot be returned or refunded unless defective. Custom-ordered materials are non-refundable."
        },
        {
          title: "Refund Processing",
          content: "Approved refunds will be processed within 15 business days using the original payment method. Bank transfer refunds may take additional time depending on your bank's processing times."
        }
      ]
    }
  };

  const TabButton = ({ id, label, icon }: { id: string; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 px-6 py-4 rounded-lg transition-all duration-300 ${
        activeTab === id
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md'
      }`}
    >
      <div className={`${activeTab === id ? 'text-white' : 'text-blue-600'}`}>
        {icon}
      </div>
      <span className="font-semibold">{label}</span>
    </button>
  );

  const activePolicy = policies[activeTab as keyof typeof policies];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Policies & Terms</h1>
            <p className="text-xl text-blue-100 mb-8">
              Transparency and clarity in all our interactions. Read about how we work and protect your interests.
            </p>
            <div className="flex items-center space-x-2 text-blue-200">
              <UserIcon className="w-5 h-5" />
              <span>Last updated: {activePolicy.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Policy Tabs */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TabButton
              id="privacy"
              label="Privacy Policy"
              icon={<ShieldCheckIcon className="w-6 h-6" />}
            />
            <TabButton
              id="terms"
              label="Terms of Service"
              icon={<DocumentTextIcon className="w-6 h-6" />}
            />
            <TabButton
              id="refund"
              label="Cancellation & Refund"
              icon={<CreditCardIcon className="w-6 h-6" />}
            />
          </div>
        </div>

        {/* Policy Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Policy Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 text-white p-3 rounded-xl">
                    {activePolicy.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{activePolicy.title}</h2>
                    <p className="text-gray-600">Last updated: {activePolicy.lastUpdated}</p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Version 2.1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Sections */}
            <div className="p-8">
              <div className="space-y-8">
                {activePolicy.content.map((section, index) => (
                  <div key={index} className="pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                        <div className="prose prose-blue max-w-none">
                          <p className="text-gray-700 leading-relaxed">{section.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Information for Policy Inquiries */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Questions About Our Policies?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Email Us</h4>
                      <p className="text-blue-600">legal@aniwellinteriors.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Write to Us</h4>
                      <p className="text-gray-600">
                        Legal Department<br />
                        Aniwell Interiors<br />
                        123 Design Avenue, Bangalore - 560001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div>
                  <p className="text-sm text-gray-600">
                    By using our services, you acknowledge that you have read and understood these policies.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Download PDF Version
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="text-sm text-gray-600 hover:text-gray-700 font-medium"
                  >
                    Print This Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <span className="text-gray-700">These policies are legally binding. Please read them carefully.</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <span className="text-gray-700">We reserve the right to update these policies periodically. Continued use of our services constitutes acceptance of updated policies.</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold">!</span>
                </div>
                <span className="text-gray-700">For project-specific terms, refer to your signed agreement with Aniwell Interiors.</span>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-blue-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Need clarification on any point? Contact our legal team.
                </p>
                <a 
                  href="mailto:legal@aniwellinteriors.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Get Clarification →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;