export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")

export const getRoute = (mainSlug: string, subSlug: string) => {
  const STATIC_PAGE_MAP: Record<string, string> = {
    about: "/about",
    "about-us": "/about",
    contact: "/contact",
    "contact-us": "/contact",
    policies: "/policies",
    policy: "/policies",
    terms: "/policies",
    privacy: "/policies"
  }

  const moreCategorySlugs = ["more", "information", "company"]

  if (moreCategorySlugs.includes(mainSlug)) {
    return STATIC_PAGE_MAP[subSlug] ?? `/${mainSlug}/${subSlug}`
  }

  return `/${mainSlug}/${subSlug}`
}

export const extractArrayFromResponse = <T>(response: any): T[] => {
  if (!response) return [];

  if (Array.isArray(response)) return response;

  if (Array.isArray(response.data)) return response.data;

  if (Array.isArray(response.results)) return response.results;

  if (Array.isArray(response.items)) return response.items;

  return [];
};