import { api } from "./client";

export const getSlides = (params?: any) =>
  api.get("/Slide/slideList", { params });

export const getSlide = (id: number) =>
  api.get("/Slide/getSlide", { params: { id } });

export const deleteSlide = (id: number) =>
  api.delete("/Slide/deleteSlide", { params: { id } });

export const saveSlideWithFile = (payload: any) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (key === "additionalInfo") {
      formData.append(key, JSON.stringify(value));
    } else if (key === "file") {
      if (value instanceof File) {
        formData.append("file", value);
      }
    } else {
      formData.append(key, String(value));
    }
  });

  return api.post("/Slide/slideSaveWithFile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export const restoreSlide = (id: number) =>
  api.post("/Slide/restoreSlide", null, { params: { id } });
