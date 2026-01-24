// src/pages/Category/CategoryLayout.tsx
import { Outlet, useParams, Link } from 'react-router-dom';

const CategoryLayout = () => {
  const { category } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold capitalize">{category?.replace('-', ' ')}</span>
        </nav>
        
        <Outlet />
      </div>
    </div>
  );
};

export default CategoryLayout;