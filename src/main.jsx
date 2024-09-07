import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root/Root';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registraction/Registration';
import Order from './components/Order/Order';
import AuthContextProvider from './ContextProvider/AuthContextProvider';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Contact from './components/Contact/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/order",
        element: <PrivateRoute><Order></Order></PrivateRoute>
      },
      {
        path: "/contact",
        element: <PrivateRoute><Contact></Contact></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
    <ToastContainer></ToastContainer>
    
  </StrictMode>,
)
