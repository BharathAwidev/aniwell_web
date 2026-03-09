import { useNavigate } from "react-router-dom"
import type { Category } from "../../types"
import { getRoute } from "../../utils"

interface Props {
  open: boolean
  onClose: () => void
  categories: Category[]
}

const MobileMenu = ({ open, onClose, categories }: Props) => {
  const navigate = useNavigate()

  return (
    <div
      className={`fixed inset-0 bg-white transform transition-transform duration-300 lg:hidden ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6">

        <button onClick={onClose}>Close</button>

        <ul className="mt-6 space-y-4">

          {categories.map((cat) => (
            <li key={cat.id}>

              <p className="font-semibold">{cat.name}</p>

              {cat.subCategories?.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    navigate(getRoute(cat.slug, sub.slug))
                    onClose()
                  }}
                  className="block text-left pl-4 py-2"
                >
                  {sub.name}
                </button>
              ))}

            </li>
          ))}

        </ul>

      </div>
    </div>
  )
}

export default MobileMenu