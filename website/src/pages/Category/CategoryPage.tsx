import { useParams, Link } from "react-router-dom"
import { useCategoryStore } from "../../store/categoryStore"
import { ChevronRight, Sparkles } from "lucide-react"

const CategoryPage = () => {

  const { category } = useParams()

  const { categories } = useCategoryStore()

  const categoryData = categories.find(
    c => c.slug === category
  )

  if (!categoryData) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Category not found
      </div>
    )

  }

  const isMore = categoryData.slug === "more"

  return (

    <div className="min-h-screen bg-white">

      <div className="container mx-auto px-4 py-10">

        {/* Breadcrumb */}

        <div className="flex items-center text-sm mb-8">

          <Link to="/" className="text-gray-500 hover:text-orange-600">
            Home
          </Link>

          <ChevronRight className="mx-2 w-4 h-4"/>

          <span className="font-semibold">
            {categoryData.name}
          </span>

        </div>


        {/* Hero */}

        <div className="bg-gray-50 rounded-xl p-8 mb-12">

          <div className="flex items-center gap-3 mb-4">

            <Sparkles className="w-5 h-5 text-orange-500"/>

            <h1 className="text-3xl font-bold">
              {categoryData.name}
            </h1>

          </div>

          <p className="text-gray-600 max-w-3xl">
            {categoryData.description}
          </p>

        </div>


        {/* Subcategories */}

        {categoryData.subCategories?.length ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {categoryData.subCategories.map(sub => (

              <Link
                key={sub.id}
                to={`/${categoryData.slug}/${sub.slug}`}
                className="group bg-white border rounded-xl overflow-hidden hover:shadow-lg transition"
              >

                <img
                  src={sub.image}
                  className="h-56 w-full object-cover group-hover:scale-105 transition"
                />

                <div className="p-6">

                  <div className="flex justify-between mb-2">

                    <h3 className="text-xl font-semibold group-hover:text-orange-600">
                      {sub.name}
                    </h3>

                    <ChevronRight className="w-5 h-5 text-gray-400"/>

                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {sub.description}
                  </p>

                  {!isMore && (
                    <span className="text-sm font-medium">
                      {sub.designs?.toLocaleString()} Designs
                    </span>
                  )}

                </div>

              </Link>

            ))}

          </div>

        ) : (

          <div className="text-center py-20 text-gray-500">
            Content coming soon
          </div>

        )}


        {/* Bottom CTA */}

        {!isMore && (

          <div className="text-center mt-16">

            <h3 className="text-2xl font-semibold mb-4">
              Need help with your interior design?
            </h3>

            <Link
              to="/get-quote"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
            >
              Book Free Consultation
            </Link>

          </div>

        )}

      </div>

    </div>

  )

}

export default CategoryPage