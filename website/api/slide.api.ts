// slide.api.ts
import { api } from "./client";

export interface AdditionalInfo {
  text: string;
  isActive: boolean;
}

export interface SlideData {
  id: string;
  type: "image" | "video";
  title: string;
  caption: string;
  description: string;
  file_path: string;
  file_type: string;
  file_size: string;
  video_length: number | null;
  additional_info: AdditionalInfo[];
  show_book_consultation: string;
  button_text: string;
  is_active: string;
  sort_order: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface SlidesResponse {
  status: boolean;
  statusCode: number;
  responseCode: number;
  result: {
    data: SlideData[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      total_pages: number;
    };
  };
  message: string;
}

// Get all slides with optional query parameters
export const getSlides = (params?: any): Promise<{ data: SlidesResponse }> =>
  api.get("/Slide/slideList", { params });

// Get single slide by ID
export const getSlide = (id: number): Promise<{ data: SlidesResponse }> =>
  api.get("/Slide/getSlide", { params: { id } });