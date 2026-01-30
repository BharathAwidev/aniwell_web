export const SERVICE_STYLES = {
  MODERN: "Modern",
  CONTEMPORARY: "Contemporary",
  MINIMAL: "Minimal",
} as const;

export type ServiceStyle =
  typeof SERVICE_STYLES[keyof typeof SERVICE_STYLES];

/* ---------------- Common Types ---------------- */

export type DynamicItem = {
  value: string;
};

export type KeyValueItem = {
  key: string;
  value: string;
};

/* ---------------- Form Payload ---------------- */

export type ServiceFormValues = {
    section_id: string | null;
  category_id: string | null;
  title: string;
  description: string;
  dimension: string;
  style: ServiceStyle;
  tags: DynamicItem[];
  designDetails: KeyValueItem[];   // ✅ fixed
  features: KeyValueItem[];
};

/* ---------------- API Model ---------------- */

export type Service = {
  id: string;
  title: string;
  description: string;
  dimension: string;
  style: ServiceStyle;
  tags: DynamicItem[];
  designDetails: KeyValueItem[];   // ✅ fixed
  features: KeyValueItem[];
};



