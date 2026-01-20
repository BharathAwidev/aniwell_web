import { createBrowserRouter } from "react-router"
import AdminLayout from "./layouts/AdminLayout"
import Dashboard from "./pages/dashboard/Dashboard"
import NotFound from "./pages/NotFound"
import AuthLayout from "./pages/auth/AuthLayout"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import QuestionTable from "./pages/question/QuestionTable"
import EditQuestion from "./pages/question/EditQuestion"
import CreateQuestion from "./pages/question/CreateQuestion"


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
      { index: true, element: <Dashboard /> },
      {
        path: "settings/theme",
        element: <QuestionTable />,
      },
      {
        path: "/questions/:id/edit",
            element: <EditQuestion />
      }, {
        path: "/questions/new",
            element: <CreateQuestion />
      },
      //  {
      //   path: "settings/theme",
      //   element: <ThemeSettings />,
      // },
    //   { path: "products", element: <Products /> },
    //   { path: "orders", element: <Orders /> },
    //   { path: "customers", element: <Customers /> },

      // 👇 MUST be last
      { path: "*", element: <NotFound /> },

    ],
  },
])
