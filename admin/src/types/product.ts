// export interface ProductCategory {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ProductSubcategory {
//   id: string;
//   name: string;
//   description: string;
//   categoryId: string;
//   categoryName: string; // Changed from optional to required
//   createdAt: string;
//   updatedAt: string;
// }

// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   sku: string;
//   price: number;
//   cost: number;
//   stock: number;
//   categoryId: string;
//   subcategoryId: string;
//   categoryName: string; // Changed from optional to required
//   subcategoryName: string; // Changed from optional to required
//   isActive: boolean;
//   images: string[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ProductFormData {
//   name: string;
//   description: string;
//   sku: string;
//   price: number;
//   cost: number;
//   stock: number;
//   categoryId: string;
//   subcategoryId: string;
//   isActive: boolean;
//   images: string[];
// }



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