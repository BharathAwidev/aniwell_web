import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import PopupForm from "../../components/PopupForm"
import { ServiceAPI, type ServiceData } from "../../api/service.api"
import { useCategoryStore } from "../../store/categoryStore"

import { ChevronRight } from "lucide-react"

interface DesignItem {
  id: string
  title: string
  description: string
  style: string
  size: string
  image: string
  features: string[]
}

const DesignCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 animate-pulse">
      <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
        <div className="h-10 bg-gray-200 rounded flex-1"></div>
      </div>
    </div>
  )
}

const SubCategoryPage = () => {

  const { category, subCategory } = useParams()
  const navigate = useNavigate()

  const { categories } = useCategoryStore()

  const [items, setItems] = useState<DesignItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [activeTab, setActiveTab] = useState(subCategory || "")

  const currentCategory = categories.find(c => c.slug === category)

  const currentSubCategory = currentCategory?.subCategories.find(
    s => s.slug === subCategory
  )

  useEffect(() => {

    const fetchServices = async () => {

      if (!currentSubCategory) return

      try {

        setLoading(true)

        const res = await ServiceAPI.getAll()

        const services: ServiceData[] =
          res?.data?.result?.data ??
          res?.result?.data ??
          res?.data ??
          res ??
          []

        const filtered = services.filter(
          s => String(s.category_id) === String(currentSubCategory.id)
        )

        const transformed: DesignItem[] = filtered.map((service, index) => ({
          id: service.id,
          title: service.title || `${currentSubCategory.name} Design ${index + 1}`,
          description: service.description || `Beautiful ${currentSubCategory.name} design`,
          style: service.style || "Contemporary",
          size: service.dimension || "Custom Size",
          image:
            ServiceAPI.getServiceImages(service.id)[0] ||
            "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800",
          features: ["Modern Design", "High Quality", "Customizable"]
        }))

        setItems(transformed)

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }
    }

    fetchServices()

  }, [currentSubCategory])


  if (!currentCategory || !currentSubCategory) {
    return <div className="p-20 text-center">Page not found</div>
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}

      <div className="container mx-auto px-4 py-12">

        {/* Breadcrumb */}

        <div className="flex items-center text-sm mb-8">

          <Link to="/" className="text-gray-500 hover:text-orange-600">
            Home
          </Link>

          <span className="mx-2 text-gray-400">/</span>

          <Link
            to={`/${category}`}
            className="capitalize text-gray-600 hover:text-orange-600"
          >
            {category}
          </Link>

          <span className="mx-2 text-gray-400">/</span>

          <span className="font-semibold text-gray-900">
            {currentSubCategory.name}
          </span>

        </div>


        {/* Subcategory Tabs */}

 <div className="flex space-x-6 border-b mb-10 overflow-x-auto">

  {currentCategory.subCategories.map(sub => {

    const slug = sub.slug

    return (

      <button
        key={sub.id}
        onClick={() => navigate(`/${category}/${slug}`)}
        className={`pb-3 whitespace-nowrap transition ${
          subCategory === slug
            ? "border-b-2 border-orange-500 text-gray-900 font-semibold"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >

        {sub.name}

      </button>

    )

  })}

</div>


        {/* Page Title */}

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-4xl font-bold text-gray-900">
            {currentSubCategory.name} Designs
          </h1>

          <button className="flex items-center px-5 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">

            View All Designs

            <ChevronRight className="ml-2 w-4 h-4"/>

          </button>

        </div>


        {/* Design Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <DesignCardSkeleton key={i}/>
              ))

            : items.map(item => (

                <div
                  key={item.id}
                  onClick={() =>
                    navigate(`/${category}/${subCategory}/${item.id}`)
                  }
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                >

                  <img
                    src={item.image}
                    className="h-72 w-full object-cover group-hover:scale-105 transition-transform"
                  />

                  <div className="p-6">

                    <h3 className="text-xl font-bold mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex gap-3">

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowPopup(true)
                        }}
                        className="flex-1 bg-orange-500 text-white py-2 rounded-lg"
                      >
                        Book Consultation
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate("/get-quote")
                        }}
                        className="flex-1 border border-orange-500 text-orange-600 py-2 rounded-lg"
                      >
                        Get Quote
                      </button>

                    </div>

                  </div>

                </div>

              ))
          }

        </div>

      </div>

    </div>

  )
}

export default SubCategoryPage