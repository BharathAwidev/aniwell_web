// src/pages/About.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="h-8 w-64 bg-gray-200 animate-pulse rounded mb-6"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Aniwell Interiors</h1>
            <p className="text-xl text-orange-100 mb-8">
              Design-driven interior solutions creating functional, elegant, and deeply personal spaces since 2018.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Story */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">
                Aniwell Interiors is a design-driven interior solutions company committed to creating spaces 
                that are functional, elegant, and deeply personal. We believe that well-designed interiors 
                enhance everyday living, productivity, and wellbeing.
              </p>
              
              <p className="text-lg leading-relaxed">
                With a strong focus on quality, detail, and thoughtful design, we offer end-to-end interior 
                solutions for residential and commercial spaces. From concept development and 3D visualization 
                to precise execution and final handover, our process is seamless, transparent, and client-centric.
              </p>
              
              <p className="text-lg leading-relaxed">
                At Aniwell Interiors, every project begins with understanding your lifestyle, requirements, 
                and vision. Our team blends creativity with technical expertise to deliver interiors that are 
                timeless, practical, and tailored to your budget.
              </p>

              <p className="text-lg leading-relaxed">
                We work with trusted materials, skilled craftsmen, and reliable partners to ensure durability, 
                superior finishes, and long-term value. Whether it's a modern home, a functional workspace, or 
                a bespoke interior requirement, we are dedicated to delivering spaces that truly feel complete.
              </p>
              
              <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-orange-900 mb-3">Our Philosophy</h3>
                <p className="text-orange-800">
                  "Good design is not just about aesthetics; it's about creating functional spaces that 
                  enhance the quality of life. We believe in designs that are beautiful, practical, and timeless."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Values */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">By The Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">6+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
                  <div className="text-gray-600">Expert Designers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <span className="text-orange-600 font-semibold">01</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Client-Centric Approach</h4>
                    <p className="text-gray-600 text-sm">Your vision is our blueprint. We listen, understand, and deliver.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <span className="text-orange-600 font-semibold">02</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Quality Craftsmanship</h4>
                    <p className="text-gray-600 text-sm">Premium materials and skilled execution in every project.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <span className="text-orange-600 font-semibold">03</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">End-to-End Solutions</h4>
                    <p className="text-gray-600 text-sm">Seamless process from concept to completion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-white rounded-2xl p-8 lg:p-12 border border-orange-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Founder</h2>
              <h3 className="text-2xl font-semibold text-orange-700 mb-4">Anil Kumar Gudipudi</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Anil Kumar Gudipudi is the Founder of Aniwell Interiors, known for delivering well-executed 
                residential and commercial interior projects defined by quality craftsmanship, functional design, 
                and refined aesthetics.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                His experience spans end-to-end interior solutions, with a strong track record of projects 
                completed to high standards of precision and client satisfaction.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white text-4xl font-bold">AKG</span>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">2018</div>
                <div className="text-gray-600 font-medium">Company Founded</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of experienced designers and architects bring diverse perspectives 
              and specialized expertise to every project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Sarah Johnson", role: "Chief Design Officer", exp: "15+ years" },
              { name: "Michael Chen", role: "Head of Operations", exp: "12+ years" },
              { name: "Priya Sharma", role: "Creative Director", exp: "10+ years" }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-orange-100 hover:border-orange-200">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.exp} experience</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-12 text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create a space that reflects your personality and enhances your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
              >
                Get in Touch
              </Link>
              <Link 
                to="/projects" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;