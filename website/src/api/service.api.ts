// // api/service.api.ts
// import { api } from './client';

// export interface ServiceData {
//   id: string;
//   section_id: string;
//   section_name: string;
//   category_id: string;
//   category_name: string;
//   title: string;
//   description: string;
//   dimension: string;
//   style: string;
//   created_at: string;
//   // Additional fields that might be needed
//   images?: string[];
//   features?: string[];
//   ideal_for?: string;
//   color?: string;
//   layout?: string;
// }

// export interface ServiceResponse {
//   data: ServiceData[];
//   pagination: {
//     page: number;
//     limit: number;
//     total: number;
//     total_pages: number;
//   };
// }

// export interface SingleServiceResponse {
//   data: ServiceData;
// }

// export const ServiceAPI = {
//   // Get all services with optional filtering
//   getAll: (params?: {
//     page?: number;
//     limit?: number;
//     section_id?: string | number;
//     category_id?: string | number;
//     search?: string;
//   }) => api.get<{ result: ServiceResponse }>("/Service/serviceList", { params }),
  
//   // Get single service by ID
//   getById: (id: string | number) => 
//     api.get<{ result: SingleServiceResponse }>("/Service/getService", { 
//       params: { id } 
//     }),
  
//   // Helper function to extract service images (mock for now)
//   getServiceImages: (serviceId: string): string[] => {
//     // This should come from API, using mock for now
//     const imageMap: Record<string, string[]> = {
//       '1': [
//         "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//         "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//         "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
//       ],
//       '2': [
//         "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&auto=format&fit=crop",
//         "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop"
//       ],
//       '3': [
//         "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop"
//       ]
//     };
//     return imageMap[serviceId] || [
//       "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop"
//     ];
//   }
// };



// api/service.api.ts
import { api } from './client';

export interface ServiceData {
  id: string;
  section_id: string;
  section_name: string;
  category_id: string;
  category_name: string;
  title: string;
  description: string;
  dimension: string;
  style: string;
  created_at: string;
  // Additional fields that might be needed
  images?: string[];
  features?: string[];
  ideal_for?: string;
  color?: string;
  layout?: string;
}

export interface ServiceResponse {
  data: ServiceData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface SingleServiceResponse {
  data: ServiceData;
}

// Update this interface to match your actual API response
export interface ApiResponse<T> {
  status: boolean;
  statusCode: number;
  responseCode: number;
  result: T;
  message: string;
}

export const ServiceAPI = {
  // Get all services with optional filtering
  getAll: (params?: {
    page?: number;
    limit?: number;
    section_id?: string | number;
    category_id?: string | number;
    search?: string;
  }) => api.get<ApiResponse<ServiceResponse>>("/Service/serviceList", { params }),
  
  // Get single service by ID
  getById: (id: string | number) => 
    api.get<ApiResponse<SingleServiceResponse>>("/Service/getService", { 
      params: { id } 
    }),
  
  // Helper function to extract service images (mock for now)
  getServiceImages: (serviceId: string): string[] => {
    // This should come from API, using mock for now
    const imageMap: Record<string, string[]> = {
      '1': [
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      '2': [
        "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop"
      ],
      '3': [
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop"
      ]
    };
    return imageMap[serviceId] || [
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop"
    ];
  }
};