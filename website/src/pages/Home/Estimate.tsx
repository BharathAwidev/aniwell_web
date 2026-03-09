import { useState, useEffect } from "react"
import { Home, ChefHat, DoorOpen } from "lucide-react"

const Estimate = () => {

  const estimateOptions = [
    {
      title: "Full Home Interior",
      description: "Know the estimate price for your full home interiors",
      buttonText: "CALCULATE",
      icon: Home
    },
    {
      title: "Kitchen",
      description: "Get an approximate costing for your kitchen interior",
      buttonText: "CALCULATE",
      icon: ChefHat
    },
    {
      title: "Wardrobe",
      description: "Our estimate for your dream wardrobe",
      buttonText: "CALCULATE",
      icon: DoorOpen
    }
  ]

  const rotatingTexts = ["Full Home", "Kitchen", "Wardrobe"]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % rotatingTexts.length)
    }, 2000)

    return () => clearInterval(interval)

  }, [])

  return (

    <section className="w-full py-16 md:py-20 bg-white">

      <div className="container mx-auto px-4 md:px-8 lg:px-16">

        {/* Header */}

        <div className="max-w-4xl mx-auto text-center mb-12">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">

            Get the estimate for your{" "}

            <span className="text-orange-500 inline-block min-w-[140px] text-center transition-all duration-500">
              {rotatingTexts[currentIndex]}
            </span>

          </h2>

          <p className="text-lg md:text-xl text-gray-600">
            Calculate the approximate cost of doing up your home interiors
          </p>

        </div>


        {/* Cards */}

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {estimateOptions.map((option, index) => {

            const Icon = option.icon

            return (

              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 flex flex-col"
              >

                {/* Icon */}

                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-100 flex items-center justify-center">

                  <Icon className="w-8 h-8 text-orange-600" />

                </div>

                {/* Title */}

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {option.title}
                </h3>

                <div className="w-10 h-1 bg-orange-500 rounded-full mx-auto mb-4"></div>

                {/* Description */}

                <p className="text-gray-600 mb-6 flex-grow">
                  {option.description}
                </p>

                {/* Button */}

                <button className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                  {option.buttonText}
                </button>

              </div>

            )

          })}

        </div>


        {/* Footer note */}

        <div className="max-w-4xl mx-auto mt-12 text-center">

          <p className="text-gray-500 text-sm">
            *All estimates are indicative and subject to final measurement and customization
          </p>

        </div>

      </div>

    </section>

  )

}

export default Estimate