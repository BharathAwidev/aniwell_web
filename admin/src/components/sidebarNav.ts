import {
  LayoutDashboard,
  Package,
  PlusSquare,
  ShoppingCart,
  Settings,
  Palette,
} from "lucide-react"

export type SidebarItem = {
  label: string
  to?: string
  icon?: React.ElementType
  /** paths this item should be active for */
  match?: string[]
  children?: SidebarItem[]
}

export type SidebarSection = {
  section: string
  items: SidebarItem[]
}

export const sidebarNav: SidebarSection[] = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", to: "/" , match: ["/"],  icon: LayoutDashboard,},
    ],
  },
  {
    section: "Catalog",
    items: [
      {
        label: "Products",
        // to: "/products",
        children: [
          { label: "All Products", to: "/products", match: ["/products"], icon: Package, },
          { label: "Add Product", to: "/products/create",match: ["/products/create"],icon: PlusSquare,  },
        ],
      },
    ],
  },
  {
    section: "Sales",
    items: [
      {
        label: "Orders",
        // to: "/orders",
        children: [
          { label: "All Orders", to: "/orders", icon: ShoppingCart, },
          { label: "Pending", to: "/orderview" },
        ],
      },
    ],
  },
  {
    section: "Settings",
    items: [
      {
        label: "Settings",
        to: "/settings",
        children: [
          { label: "General", to: "/settings",match: ["/settings"], icon: Palette, },
          { label: "Theme", to: "/settings/theme",match: ["/settings/theme"], icon: Settings, },
        ],
      },
    ],
  },
]
