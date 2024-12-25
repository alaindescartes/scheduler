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
import DocumentationOutlet from './_components/outlets/DocumentationOutlet.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'sign-up',
    element: <Register />,
  },
  {
    path: 'homepage',
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
      {
        path: 'residence',
        element: (
          <ProtectedRoutes>
            <Residences />
          </ProtectedRoutes>
        ),
      },
      {
        path: 'visit_residence/:id',
        element: (
          <ProtectedRoutes>
            <ResidentOverview />
          </ProtectedRoutes>
        ),
        children: [
          {
            path: ':clientId',
            element: (
              <ProtectedRoutes>
                <ClientProfile />
              </ProtectedRoutes>
            ),
          },
        ],
      },
      {
        path: 'documentation/:type',
        element: (
          <ProtectedRoutes>
            <DocumentationOutlet />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
