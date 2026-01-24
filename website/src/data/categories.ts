// src/data/categories.ts
export interface DesignItem {
  id: number;
  title: string;
  description: string;
  size?: string;
  image: string;
  style: string;
  features: string[];
}

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  designs: number;
  image: string;
  items?: DesignItem[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  hasDropdown: boolean;
  subCategories?: SubCategory[];
}

export const categoriesData: Category[] = [
  {
    id: 1,
    name: "Design Ideas",
    slug: "design-ideas",
    description: "We bring you carefully-curated interior design ideas, to give your home a brand new look.",
    hasDropdown: true,
    subCategories: [
      {
        id: 1,
        name: "Kitchen",
        slug: "kitchen",
        description: "Modular Kitchen Designs are a seamless fusion of functionality and style.",
        designs: 3044,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop",
        items: [
          {
            id: 1,
            title: "Modern Open Kitchen Design with Island Bar",
            description: "Seating and Herringbone Backsplash",
            size: "13x10 feet",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop",
            style: "Modern",
            features: ["Island Bar", "Herringbone Backsplash", "Smart Storage"]
          },
          {
            id: 2,
            title: "Cream Contemporary Parallel Kitchen Design",
            description: "with Matte Taupe Cabinets",
            size: "12x8 feet",
            image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop",
            style: "Contemporary",
            features: ["Parallel Layout", "Matte Finish", "Pull-out Drawers"]
          }
        ]
      },
      {
        id: 2,
        name: "Living Room",
        slug: "living-room",
        description: "Transform your living space with elegant and comfortable designs.",
        designs: 2164,
        image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&auto=format&fit=crop",
        items: [
          {
            id: 1,
            title: "Modern Living Room with Minimalist Design",
            description: "Open space with natural lighting",
            size: "20x15 feet",
            image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&auto=format&fit=crop",
            style: "Modern",
            features: ["Minimalist", "Natural Lighting", "Smart Storage"]
          }
        ]
      },
      {
        id: 3,
        name: "Master Bedroom",
        slug: "master-bedroom",
        description: "Create your perfect sanctuary with luxurious bedroom designs.",
        designs: 3202,
        image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop",
        items: [
          {
            id: 1,
            title: "Luxury Master Bedroom Suite",
            description: "Walk-in closet and attached bathroom",
            size: "18x15 feet",
            image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop",
            style: "Luxury",
            features: ["Walk-in Closet", "Attached Bathroom", "Sitting Area"]
          }
        ]
      },
      {
        id: 4,
        name: "Bathroom",
        slug: "bathroom",
        description: "Modern bathroom designs combining luxury and functionality.",
        designs: 1420,
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&auto=format&fit=crop"
      },
      {
        id: 5,
        name: "Wardrobe",
        slug: "wardrobe",
        description: "Custom wardrobe solutions for optimal storage.",
        designs: 1631,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop"
      },
      {
        id: 6,
        name: "Study Room",
        slug: "study-room-designs",
        description: "Productive and inspiring study room designs.",
        designs: 956,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop"
      },
      {
        id: 7,
        name: "Kid's Bedroom",
        slug: "kids-bedroom",
        description: "Fun and safe bedroom designs for children.",
        designs: 1308,
        image: "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=800&auto=format&fit=crop"
      },
      {
        id: 8,
        name: "TV Unit",
        slug: "tv-unit-designs",
        description: "Elegant TV unit designs for your living space.",
        designs: 892,
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop"
      },
      {
        id: 9,
        name: "Pooja Room",
        slug: "pooja-room",
        description: "Sacred and serene pooja room designs.",
        designs: 567,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: 2,
    name: "Magazine",
    slug: "magazine",
    description: "Latest interior design trends and inspiration.",
    hasDropdown: true,
    subCategories: [
      {
        id: 1,
        name: "Room Ideas",
        slug: "room-ideas",
        description: "Creative room design ideas",
        designs: 450,
        image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&auto=format&fit=crop"
      },
      {
        id: 2,
        name: "Decor & Inspiration",
        slug: "decor-inspiration",
        description: "Home decor tips and inspiration",
        designs: 320,
        image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: 3,
    name: "Cities",
    slug: "cities",
    description: "Our services across different cities",
    hasDropdown: true,
    subCategories: [
      {
        id: 1,
        name: "Hyderabad",
        slug: "hyderabad",
        description: "Interior design services in Hyderabad",
        designs: 450,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop"
      },
      {
        id: 2,
        name: "Bengaluru",
        slug: "bengaluru",
        description: "Interior design services in Bengaluru",
        designs: 520,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop"
      }
    ]
  },
  {
    id: 4,
    name: "Projects",
    slug: "projects",
    description: "Our completed projects portfolio",
    hasDropdown: false
  },
  {
    id: 5,
    name: "Store Locator",
    slug: "store-locator",
    description: "Find our stores near you",
    hasDropdown: false
  },
  {
    id: 6,
    name: "More",
    slug: "more",
    description: "Additional information about us",
    hasDropdown: true,
    subCategories: [
      {
        id: 1,
        name: "About Us",
        slug: "about-us",
        description: "Learn more about our company",
        designs: 0,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop"
      },
      {
        id: 2,
        name: "Contact Us",
        slug: "contact-us",
        description: "Get in touch with us",
        designs: 0,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop"
      }
    ]
  }
];

export const getCategoryBySlug = (slug: string) => {
  return categoriesData.find(category => category.slug === slug);
};

export const getSubCategory = (categorySlug: string, subCategorySlug: string) => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subCategories?.find(sub => sub.slug === subCategorySlug);
};