import { useNavigate } from "react-router-dom"
import { getRoute } from "../../utils"
import type { Category } from "../../types"

interface Props {
  categories: Category[]
}

const DesktopMenu = ({ categories }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="hidden lg:flex items-center space-x-6">

      {categories.map((cat) => (
        <div key={cat.id} className="relative group">

          {/* Menu button */}
          <button
            className="px-3 py-2 font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            {cat.name}
          </button>

          {/* Dropdown */}
          {cat.hasDropdown && (
            <div
              className="
              absolute top-full left-0 mt-2 w-64
              bg-white rounded-xl shadow-lg border border-gray-100
              opacity-0 invisible
              group-hover:opacity-100 group-hover:visible
              transition-all duration-200
              "
            >

              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">
                {cat.name}
              </div>

              {cat.subCategories?.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => navigate(getRoute(cat.slug, sub.slug))}
                  className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  {sub.name}
                </button>
              ))}

            </div>
          )}
        </div>
      ))}

    </div>
  )
}

export default DesktopMenu