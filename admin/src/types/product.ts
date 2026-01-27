
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductSubcategory {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

export interface InteriorProject {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  categoryId: string;
  subcategoryId: string;
  categoryName: string;
  subcategoryName: string;
  isActive: boolean;
  images: string[];
  dimensions: string;
  material: string;
  style: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  categoryId: string;
  subcategoryId: string;
  isActive: boolean;
  images: string[];
  dimensions: string;
  material: string;
  style: string;
}