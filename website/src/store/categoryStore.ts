import { create } from "zustand"
import { SectionAPI } from "../api/section.api"

export interface SubCategory {
  id: string
  name: string
  slug: string
}

export interface Category {
  id: string
  name: string
  slug: string
  hasDropdown: boolean
  subCategories: SubCategory[]
}

interface CategoryStore {
  categories: Category[]
  loading: boolean
  fetchCategories: () => Promise<void>
}

const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/\s+/g, "-")

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,

  fetchCategories: async () => {
    try {
      set({ loading: true })

      const res = await SectionAPI.getAll()
      const sections = res?.result ?? []

      const transformed: Category[] = sections
        .filter((sec: any) => sec.status === "YES")
        .map((sec: any) => ({
          id: sec.id,
          name: sec.name,
          slug: slugify(sec.name),
          hasDropdown: (sec.categories ?? []).length > 0,
          subCategories: (sec.categories ?? []).map((sub: any) => ({
            id: sub.id,
            name: sub.name,
            slug: slugify(sub.name)
          }))
        }))

      set({ categories: transformed, loading: false })
    } catch (error) {
      console.error("Category fetch error:", error)
      set({ loading: false })
    }
  }
}))