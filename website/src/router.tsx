// // src/router.tsx
// import { createBrowserRouter } from "react-router-dom";

// /* Layout */
// import MainLayout from "./components/MainLayout";

// /* Pages */
// import Home from "./pages/Home/Home";
// import CategoryPage from "../src/pages/Category/CategoryPage";
// import SubCategoryPage from "./pages/Category/SubCategoryPage";

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
//         path: "/:category",
//         element: <CategoryPage />,
//       },
//       {
//         path: "/:category/:subCategory",
//         element: <SubCategoryPage />,
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
import QuotePage from "./pages/QuotePage"; // Add this import

/* Dummy pages */
const About = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">About Page</h1></div>;
const Contact = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">Contact Page</h1></div>;
const NotFound = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-bold">404 - Page Not Found</h1></div>;

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
        path: "/get-quote", // Add this route
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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;