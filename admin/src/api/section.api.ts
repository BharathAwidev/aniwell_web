import { api } from "./client"

export interface SectionData {
  id?: string
  name: string
  description?: string
  status?: "YES" | "NO"
  home_category?: "YES" | "NO"
  image_path?: string
  store_category_id?: string
}

// ✅ UPDATED: Changed from section_id to sectionId
export interface SubcategoryData {
  id?: string
  name: string
  description?: string
  status?: "YES" | "NO" | string
  sectionId?: string  // ✅ CHANGED from section_id to sectionId
  sectionName?: string
}

export const SectionAPI = {
  getAll: () => api.get("/Section/list").then((r) => r.data),
  
  save: (data: SectionData) => 
    api.post("/Section/update", data).then((r) => r.data),
  
  delete: (id: string) => 
    api.delete(`/Section/delete/${id}`).then((r) => r.data),
  
  toggleStatus: (id: string, currentStatus: string) => 
    api.post("/Section/update", { 
      id, 
      status: currentStatus === "YES" ? "NO" : "YES" 
    }).then((r) => r.data),
  
  getAllSubcategories: () => 
    api.get("/category/list").then((r) => r.data),
  
  saveSubcategory: (data: SubcategoryData) => 
    api.post("/category/update", data).then((r) => r.data),
  
  deleteSubcategory: (id: string) => 
    api.delete(`/category/delete/${id}`).then((r) => r.data),
}