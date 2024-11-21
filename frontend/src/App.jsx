import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./_components/Login.jsx"
import Register from "./_components/Register.jsx";
import RootOutlet from "./_components/outlets/RootOutlet.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootOutlet />,
        children: [
            {
                path: "/login",
                index:true,
                element: <Login />,
            },
            {
                path: "sign-up",
                element:<Register />,
            }
        ]
    },
]);
function App() {

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
