import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Login from "./_components/Login.jsx"
import Register from "./_components/Register.jsx";
import RootOutlet from "./_components/outlets/RootOutlet.jsx";
import MainOutlet from "./_components/outlets/MainOutlet.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RootOutlet />,
        children: [
            {
                //login page
                path: "login",
                index:true,
                element: <Login />,
            },
            {
                //register page
                path: "sign-up",
                element:<Register />,
            },
            {
                // main page
                path:"homepage",
                element: <MainOutlet />,
                children: [

                ]
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
