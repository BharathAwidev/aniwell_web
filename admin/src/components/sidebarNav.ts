import {
  LayoutDashboard,
  Package,
  PlusSquare,
  ShoppingCart,
  Settings,
  Palette,
   Tags,
  Layers,
   Building2,
  MapPin,
  GitBranch,
  Users,
  UserCog,
  UserCheck,
  User,
  Briefcase,
  FolderKanban,
  ClipboardList,
  MessageSquare,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  to?: string;
  icon?: React.ElementType;
  /** paths this item should be active for */
  match?: string[];
  children?: SidebarItem[];
};

export type SidebarSection = {
  section: string;
  items: SidebarItem[];
};

export const sidebarNav: SidebarSection[] = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", to: "/", match: ["/"], icon: LayoutDashboard },
    ],
  },
  {
    section: "Catalog",
    items: [
      {
        label: "Services",
        // to: "/products",
        children: [
          {
            label: "All Services",
            to: "/products",
            match: ["/products"],
            icon: Package,
          },
          {
            label: "Add Service ",
            to: "/products/create",
            match: ["/products/create"],
            icon: PlusSquare,
          },
          {
            label: "Categories",
            to: "/products/categories",
            match: ["/products/categories"],
            icon: Tags,
          },
           {
            label: "Subcategories",
            to: "/products/subcategories",
            match: ["/products/subcategories"],
            icon: Layers,
          },
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
          { label: "All Orders", to: "/orders", icon: ShoppingCart },
          { label: "Pending", to: "/orderview" },
        ],
      },
    ],
  },
      /* ✅ FIXED BUSINESS SECTION */
  {
    section: "Business",
    items: [
      {
        label: "Business",
        icon: Building2,
        children: [
          { label: "Locations", to: "/business/locations", icon: MapPin },
          { label: "Branches", to: "/business/branches", icon: GitBranch },
          { label: "Departments", to: "/business/departments", icon: Users },
        ],
      },
    ],
  },

  {
    section: "Users",
    items: [
      {
        label: "Users",
        icon: Users,
        children: [
          { label: "Admin", to: "/users/admin", icon: UserCog },
          { label: "Managers", to: "/users/managers", icon: UserCheck },
          { label: "Team Members", to: "/users/team", icon: User },
        ],
      },
    ],
  },

  /* ✅ WORKS: CLIENTS IS A SEPARATE PAGE */
  {
    section: "Works",
    items: [
      {
        label: "Works",
        icon: Briefcase,
        children: [
          { label: "Clients", to: "/works/clients", icon: Users },
          { label: "Projects", to: "/works/projects", icon: FolderKanban },
          { label: "Task Updates", to: "/works/tasks", icon: ClipboardList },
          {
            label: "Project Enquiries",
            to: "/works/enquiries",
            icon: MessageSquare,
          },
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
          {
            label: "General",
            to: "/settings",
            match: ["/settings"],
            icon: Palette,
          },
          {
            label: "Theme",
            to: "/settings/theme",
            match: ["/settings/theme"],
            icon: Settings,
          },
        ],
      },
    ],
  },
];
