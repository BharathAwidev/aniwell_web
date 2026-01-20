import { useState } from "react"
import { Outlet } from "react-router"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false)

  const closeSidebar = () => setIsOpen(false)
  const openSidebar = () => setIsOpen(true)

  return (
    <div className="
    flex h-screen
    bg-[hsl(var(--color-background))]
    text-[hsl(var(--text-secondary))]
  ">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <Sidebar mobile onNavigate={closeSidebar} />
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <Topbar onMenuClick={openSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
