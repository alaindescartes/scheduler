import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainOutlet from "./_components/outlets/MainOutlet.jsx";
import RootOutlet from "./_components/outlets/RootOutlet.jsx";
import Login from "./_components/pages/Login.jsx";
import MainPage from "./_components/pages/MainPage.jsx";
import Register from "./_components/pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootOutlet />,
    children: [
      {
        //login page
        path: "login",
        index: true,
        element: <Login />,
      },
      {
        //register page
        path: "sign-up",
        element: <Register />,
      },
      {
        // main page
        path: "homepage",
        element: <MainOutlet />,
        children: [
          {
            element: <MainPage />,
            index: true,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
