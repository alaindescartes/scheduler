import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import MainOutlet from './_components/outlets/MainOutlet.jsx';
import Login from './_components/pages/Login.jsx';
import MainPage from './_components/pages/MainPage.jsx';
import Register from './_components/pages/Register.jsx';
import ProtectedRoutes from './_components/outlets/ProtectedRoutes.jsx';
import Residences from './_components/pages/Residences.jsx';
import ResidentOverview from '@/_components/pages/ResidenceOverview.jsx';
import ClientProfile from './_components/clientComponents/ClientProfile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    // Login page
    path: 'login',
    element: <Login />,
  },
  {
    // Register page
    path: 'sign-up',
    element: <Register />,
  },
  {
    // Main page
    path: 'homepage',
    element: <MainOutlet />,
    children: [
      {
        //Main page route
        element: (
          <ProtectedRoutes>
            <MainPage />
          </ProtectedRoutes>
        ),
        index: true,
      },
      {
        //residence route
        element: (
          <ProtectedRoutes>
            <Residences />
          </ProtectedRoutes>
        ),
        path: 'residence',
      },
      {
        element: (
          <ProtectedRoutes>
            <ResidentOverview />
          </ProtectedRoutes>
        ),
        path: 'visit_residence/:id',
        children: [{ element: <ClientProfile />, path: ':clientId' }],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
