import { useState } from "react"
import { HelpCircle, ChevronDown } from "lucide-react"
import PopupForm from "../../components/PopupForm"

const FAQ = () => {

  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [showPopup, setShowPopup] = useState(false)

  const faqs = [
    {
      question: "What services does Aniwell Interior Design offer?",
      answer:
        "Aniwell Interior Design provides end-to-end interior solutions, including residential and commercial interiors, space planning, modular kitchens, wardrobes, custom furniture, lighting design, and turnkey execution."
    },
    {
      question: "Do you offer complete turnkey interior solutions?",
      answer:
        "Yes. We handle the entire process from design concept and material selection to execution, installation, and handover ensuring a seamless, stress-free experience."
    },
    {
      question: "How long does a typical interior project take?",
      answer:
        "Project timelines depend on scope and size. On average, residential projects take 90 days after design finalization."
    },
    {
      question: "Can I customize the designs as per my budget?",
      answer:
        "Absolutely. Every design is tailored to your lifestyle, aesthetic preferences, and budget without compromising quality."
    },
    {
      question: "Do you provide 3D designs before execution?",
      answer:
        "Yes. Detailed 3D visualizations are provided so you can clearly understand the final look before execution begins."
    }
  ]

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const handleContactExperts = () => {
    setShowPopup(true)
    document.body.style.overflow = "hidden"
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    document.body.style.overflow = "auto"
  }

  return (
    <>
      <section className="w-full py-16 bg-gray-100">

        <div className="container mx-auto px-4 md:px-8 lg:px-16">

          {/* Header */}

          <div className="max-w-4xl mx-auto text-center mb-10">

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              FAQs About Home Interior Design
            </h2>

            <p className="text-lg text-gray-700">
              Get answers to the most common questions about our services
            </p>

          </div>


          {/* FAQ List */}

          <div className="max-w-4xl mx-auto space-y-4">

            {faqs.map((faq, index) => (

              <div
                key={index}
                className={`rounded-lg border transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white border-orange-300 shadow-md"
                    : "bg-gray-50 border-gray-300 hover:border-gray-400"
                }`}
              >

                {/* Question */}

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >

                  <div className="flex items-center gap-4">

                    {/* Icon */}

                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">

                      <HelpCircle className="w-5 h-5 text-orange-600" />

                    </div>

                    <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>

                  </div>


                  {/* Arrow */}

                  <ChevronDown
                    className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180 text-orange-600" : ""
                    }`}
                  />

                </button>


                {/* Answer */}

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? "max-h-96 pb-6 px-6" : "max-h-0"
                  }`}
                >

                  <div className="pl-14 border-l-2 border-orange-500">

                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* CTA */}

          <div className="max-w-4xl mx-auto mt-10 text-center">

            <div className="bg-orange-100 border border-orange-200 rounded-xl p-8">

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Still have questions?
              </h3>

              <p className="text-gray-700 mb-4">
                Our design experts are here to help you.
              </p>

              <button
                onClick={handleContactExperts}
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all"
              >
                Contact Our Experts
              </button>

            </div>

          </div>

        </div>

      </section>

      {showPopup && (
        <PopupForm title="Talk to a designer" onClose={handleClosePopup} />
      )}
    </>
  )
}

export default FAQ