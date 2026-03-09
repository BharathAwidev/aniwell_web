import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import PopupForm from "../../components/PopupForm"
import { ServiceAPI } from "../../api/service.api"
import { useCategoryStore } from "../../store/categoryStore"
import { ChevronRight } from "lucide-react"

interface Feature {
  key: string
  value: string
}

interface DesignDetail {
  id: string
  title: string
  description: string
  images: string[]
  dimension: string
  style: string
  tags: string[]
  designDetails: Feature[]
  features: Feature[]
}

const fallbackImages = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
  "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800"
]

const DesignDetailPage = () => {

  const { category, subCategory, designId } = useParams()
  const navigate = useNavigate()

  const { categories } = useCategoryStore()

  const [designData, setDesignData] = useState<DesignDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const currentCategory = categories.find(c => c.slug === category)
  const currentSubCategory = currentCategory?.subCategories.find(
    s => s.slug === subCategory
  )

  useEffect(() => {

    const fetchDesign = async () => {

      if (!designId) return

      try {

        setLoading(true)

        const res = await ServiceAPI.getById(designId)

        const api = res?.data?.result

        if (!api?.service) return

        const service = api.service

        const tags =
          api.tags?.map((t: any) => t.value) ?? []

        const images =
          api.images
            ?.map((img: any) => img.image_path)
            .filter(Boolean) ?? []

        const designDetails =
          api.designDetails?.map((d: any) => ({
            key: d.key,
            value: d.value
          })) ?? []

        const features =
          api.features?.map((f: any) => ({
            key: f.key,
            value: f.value
          })) ?? []

        const transformed: DesignDetail = {

          id: service.id,
          title: service.title,
          description: service.description,
          dimension: service.dimension,
          style: service.style,

          images: images.length > 0 ? images : fallbackImages,

          tags,
          designDetails,
          features

        }

        setDesignData(transformed)

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    fetchDesign()

  }, [designId])


  const nextImage = () => {

    if (!designData) return

    setCurrentImageIndex(
      currentImageIndex === designData.images.length - 1
        ? 0
        : currentImageIndex + 1
    )

  }

  const prevImage = () => {

    if (!designData) return

    setCurrentImageIndex(
      currentImageIndex === 0
        ? designData.images.length - 1
        : currentImageIndex - 1
    )

  }


  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-500">
          Loading design...
        </div>
      </div>

    )

  }


  if (!designData) {

    return (

      <div className="min-h-screen flex items-center justify-center">
        Design not found
      </div>

    )

  }


  return (

    <div className="min-h-screen bg-gray-100">

      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

      <div className="container mx-auto px-4 py-12">


        {/* Breadcrumb */}

        <div className="flex items-center text-sm mb-6 flex-wrap">

          <Link to="/" className="text-gray-600 hover:text-orange-600">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to={`/${category}`}
            className="capitalize text-gray-600 hover:text-orange-600"
          >
            {currentCategory?.name}
          </Link>

          <span className="mx-2">/</span>

          <Link
            to={`/${category}/${subCategory}`}
            className="capitalize text-gray-600 hover:text-orange-600"
          >
            {currentSubCategory?.name}
          </Link>

          <span className="mx-2">/</span>

          <span className="font-semibold text-gray-900">
            {designData.title}
          </span>

        </div>


        <div className="flex flex-col lg:flex-row gap-12">


          {/* Image Section */}

          <div className="lg:w-1/2">

            <div className="sticky top-6">


              {/* Main Image */}

              <div className="relative">

                <img
                  src={designData.images[currentImageIndex]}
                  loading="lazy"
                  className="w-full h-[450px] object-cover rounded-xl"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
                >
                  <ChevronRight className="rotate-180"/>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow"
                >
                  <ChevronRight/>
                </button>

              </div>


              {/* Thumbnails */}

              <div className="flex gap-3 mt-4 overflow-x-auto">

                {designData.images.map((img, index) => (

                  <img
                    key={index}
                    src={img}
                    loading="lazy"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                      currentImageIndex === index
                        ? "border-orange-500"
                        : "border-gray-200"
                    }`}
                  />

                ))}

              </div>

            </div>

          </div>


          {/* Details */}

          <div className="lg:w-1/2 space-y-6">

            <h1 className="text-4xl font-bold">
              {designData.title}
            </h1>


            <div className="text-gray-500">
              Dimension: {designData.dimension}
            </div>


            <p className="text-gray-700">
              {designData.description}
            </p>


            {/* Tags */}

            {designData.tags.length > 0 && (

              <div className="flex flex-wrap gap-2">

                {designData.tags.map((tag, i) => (

                  <span
                    key={i}
                    className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>

                ))}

              </div>

            )}


            {/* Design Details */}

            {designData.designDetails.length > 0 && (

              <div>

                <h2 className="text-xl font-semibold mb-2">
                  Design Details
                </h2>

                <div className="space-y-2">

                  {designData.designDetails.map((d, i) => (

                    <div key={i}>

                      <span className="font-medium">
                        {d.key}
                      </span>

                      <p className="text-gray-600">
                        {d.value}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            )}


            {/* Features */}

            {designData.features.length > 0 && (

              <div>

                <h2 className="text-xl font-semibold mb-2">
                  Features
                </h2>

                <ul className="space-y-2">

                  {designData.features.map((f, i) => (

                    <li key={i} className="flex gap-2">

                      <span className="text-orange-500">•</span>

                      <span>
                        <b>{f.key}</b>: {f.value}
                      </span>

                    </li>

                  ))}

                </ul>

              </div>

            )}


            {/* CTA Buttons */}

            <div className="flex gap-4 sticky bottom-4 bg-gray-100 pt-4">

              <button
                onClick={() => setShowPopup(true)}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg"
              >
                Book Consultation
              </button>

              <button
                onClick={() => navigate("/get-quote")}
                className="flex-1 border border-orange-500 text-orange-600 py-3 rounded-lg"
              >
                Get Quote
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default DesignDetailPage