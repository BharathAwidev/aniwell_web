import React from "react";

const NavbarSkeleton = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="hidden sm:block space-y-1">
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Desktop Menu Skeleton */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Mobile Button Skeleton */}
          <div className="lg:hidden">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavbarSkeleton;