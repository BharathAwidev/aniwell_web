import type { ServiceFormValues } from "../types/service.types";
import { api } from "./client";

/* ===============================
   SERVICE APIS
================================ */

export const getServices = (params?: {
  page?: number;
  limit?: number;
  section_id?: string | number;
  category_id?: string | number;
  search?: string;
}) =>
  api.get("/Service/serviceList", {
    params,
  });

export const getService = (id: number) =>
  api.get("/Service/getService", {
    params: { id },
  });

export const saveService = (payload: ServiceFormValues & { id?: number }) =>
  api.post("/Service/serviceSave", payload);

export const deleteService = (id: number) =>
  api.delete("/Service/deleteService", {
    params: { id },
  });
