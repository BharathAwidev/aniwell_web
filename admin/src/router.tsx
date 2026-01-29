import { createBrowserRouter } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProducts";
import Categories from "./pages/products/Categories";
import Subcategories from "./pages/products/Subcategories";
import FlowBuilderPage from "./flow-builder/FlowBuilderPage";
import RuntimeStepperPage from "./flow-builder/RuntimeStepperPage";
import FlowListPage from "./pages/flow/FlowListPage";
import BannerCarousel from "./pages/banners/BannerCarousel";

export const router = createBrowserRouter([
  {
    path: "/Auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <RuntimeStepperPage /> },
      // {
      //   path: "settings/theme",
      //   element: <QuestionTable />,
      // },
      // {
      //   path: "/questions/:id/edit",
      //       element: <EditQuestion />
      // }, {
      //   path: "/questions/new",
      //       element: <CreateQuestion />
      // },
      //  {
      //   path: "settings/theme",
      //   element: <ThemeSettings />,
      // },
      //   { path: "products", element: <Products /> },
      //   { path: "orders", element: <Orders /> },
      //   { path: "customers", element: <Customers /> },

      // ✅ PRODUCTS ROUTES
      // { path: "products", element: <Products /> },
      // { path: "products/create", element: <AddProduct /> },
      // { path: "products/categories", element: <FlowBuilderPage mode="create" /> },
      // { path: "/flows", element: <FlowListPage /> },
      // { path: "/flows/:id/edit", element: <FlowBuilderPage mode="edit" />  },
      { path: "products", element: <Products /> },
      { path: "products/create", element: <AddProduct /> },
      { path: "products/categories", element: <Categories /> },
      { path: "products/subcategories", element: <Subcategories /> },

       // ✅ BANNER ROUTE
      { path: "banners", element: <BannerCarousel /> },

      // 👇 MUST be last
      { path: "*", element: <NotFound /> },
    ],
  },
]);
