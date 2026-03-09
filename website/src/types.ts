export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  hasDropdown: boolean
  subCategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  description?: string
  status?: string
}