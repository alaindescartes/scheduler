import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import MainOutlet from "./_components/outlets/MainOutlet.jsx"
import Login from "./_components/pages/Login.jsx"
import MainPage from "./_components/pages/MainPage.jsx"
import Register from "./_components/pages/Register.jsx"
import ProtectedRoutes from "./_components/outlets/ProtectedRoutes.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    // Login page
    path: "login",
    element: <Login />,
  },
  {
    // Register page
    path: "sign-up",
    element: <Register />,
  },
  {
    // Main page
    path: "homepage",
    element: <MainOutlet />,
    children: [
      {
        element: (
          <ProtectedRoutes>
            <MainPage />
          </ProtectedRoutes>
        ),
        index: true,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
