import { Outlet } from "react-router"
import logo from "../../assets/logo.png"


export default function AuthLayout() {
  return (
<div className="min-h-screen grid md:grid-cols-2 bg-[hsl(var(--color-background))]">
      {/* =============================
          LEFT — Branding + Logo
      ============================== */}
      <div className="hidden md:flex flex-col justify-center px-12 bg-[hsl(var(--color-primary))] text-[hsl(var(--color-primary-foreground))]">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-3">
          <img
            src={logo}
            alt="E-Commerce Admin Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold">
            E-Commerce Admin
          </span>
        </div>

        {/* Tagline */}
        <p className="text-sm opacity-90 max-w-sm">
          Manage products, orders, customers, and analytics
          from one powerful dashboard.
        </p>

        {/* Value points */}
        <ul className="mt-8 space-y-3 text-sm">
          <li>✔ Inventory & Order Management</li>
          <li>✔ Real-time Analytics</li>
          <li>✔ Secure & Scalable</li>
        </ul>
      </div>


      {/* RIGHT — Form */}
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
