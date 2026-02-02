import "./index.css";
import { Suspense, lazy } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HomeLayout,
  Home,
  Signup,
  Login,
  Dashboard,
  Deposit,
  Error,
} from "./pages/";
import ForgotPassword from "./components/forgotPassword";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TermsAndCondition from "./pages/TermsAndCondition";
import FAQ from "./pages/FAQ";
import ProtectedRoute from "./components/ProtectRoute";
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'


const Verification = lazy(() => import('./pages/Verification'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Withdraw = lazy(() => import('./pages/Withdraw'));
const Transactions = lazy(() => import('./pages/Transactions'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "terms",
        element: <TermsAndCondition />
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "faq",
        element: <FAQ />
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />
      },
      {
        path: "account",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'deposit',
            element: <Deposit />,
          },
          {
            path: 'verification',
            element: (
              <Suspense fallback={null}>
                <Verification />
              </Suspense>
            ),
          },
          {
            path: 'profile',
            element: (
              <Suspense fallback={null}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: 'settings',
            element: (
              <Suspense fallback={null}>
                <Settings />
              </Suspense>
            ),
          },
          {
            path: 'withdraw',
            element: (
              <Suspense fallback={null}>
                <Withdraw />
              </Suspense>
            ),
          },
          {
            path: 'transactions',
            element: (
              <Suspense fallback={null}>
                <Transactions />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
function App() {

  return (
    <>
    
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
