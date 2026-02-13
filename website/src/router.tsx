// // src/router.tsx
// import { createBrowserRouter } from "react-router-dom";

// /* Layout */
// import MainLayout from "./components/MainLayout";

// /* Pages */
// import Home from "./pages/Home/Home";
// import CategoryPage from "../src/pages/Category/CategoryPage";
// import SubCategoryPage from "./pages/Category/SubCategoryPage";
// import DesignDetailPage from "./pages/Category/DesignDetailPage"; // Add this import
// import QuotePage from "./pages/QuotePage";

// /* Dummy pages */
// const About = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">About Page</h1></div>;
// const Contact = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Contact Page</h1></div>;
// const NotFound = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">404 - Page Not Found</h1></div>;

// const router = createBrowserRouter([
//   {
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       },
//       {
//         path: "/get-quote",
//         element: <QuotePage />,
//       },
//       {
//         path: "/:category",
//         element: <CategoryPage />,
//       },
//       {
//         path: "/:category/:subCategory",
//         element: <SubCategoryPage />,
//       },
//       {
//         path: "/:category/:subCategory/:designId", // Add this route
//         element: <DesignDetailPage />,
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <NotFound />,
//   },
// ]);

// export default router;




// src/router.tsx
import { createBrowserRouter } from "react-router-dom";

/* Layout */
import MainLayout from "./components/MainLayout";

/* Pages */
import Home from "./pages/Home/Home";
import CategoryPage from "../src/pages/Category/CategoryPage";
import SubCategoryPage from "./pages/Category/SubCategoryPage";
import DesignDetailPage from "./pages/Category/DesignDetailPage";

/* Static Pages */
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";
import QuotePage from "./pages/QuotePage";

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
      <a 
        href="/" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
      >
        Go Back Home
      </a>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/policies",
        element: <Policies />,
      },
      {
        path: "/get-quote",
        element: <QuotePage />,
      },
      {
        path: "/:category",
        element: <CategoryPage />,
      },
      {
        path: "/:category/:subCategory",
        element: <SubCategoryPage />,
      },
      {
        path: "/:category/:subCategory/:designId",
        element: <DesignDetailPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;