import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import logo from "../../assets/logo.png"
import DesktopMenu from "./DesktopMenu"
import MobileMenu from "./MobileMenu"
import NavbarSkeleton from "./NavbarSkeleton"

import { useCategoryStore } from "../../store/categoryStore"

const Navbar = () => {
  const { categories, loading, fetchCategories } = useCategoryStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0)

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (loading) return <NavbarSkeleton />

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all ${
          scrolled
            ? "bg-white shadow-md border-b"
            : "bg-white/95 backdrop-blur"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-6">

          <Link to="/" className="flex items-center">
            <img src={logo} className="h-12 w-auto" alt="Aniwell Interiors"/>
          </Link>

          <DesktopMenu categories={categories} />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            ☰
          </button>

        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        categories={categories}
        onClose={() => setMobileOpen(false)}
      />

      <div className="h-16"/>
    </>
  )
}

export default Navbar