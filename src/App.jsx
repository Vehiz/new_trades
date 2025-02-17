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
import PreLoader from "./components/PreLoader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TermsAndCondition from "./pages/TermsAndCondition";
import FAQ from "./pages/FAQ";
import ProtectedRoute from "./components/ProtectRoute";
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'


const Verification = lazy(() => import('./pages/Verification'));
const Profile = lazy(() => import('./pages/Profile'));
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
        element: (
          <Suspense fallback={<PreLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<PreLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "services",
        element: (
          <Suspense fallback={<PreLoader />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<PreLoader />}>
            <Contact />
          </Suspense>
        ),
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
            element: (
              <Suspense fallback={<PreLoader />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: 'dashboard',
            element: (
              <Suspense fallback={<PreLoader />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: 'deposit',
            element: (
              <Suspense fallback={<PreLoader />}>
                <Deposit />
              </Suspense>
            ),
          },
          {
            path: 'verification',
            element: (
              <Suspense fallback={<PreLoader />}>
                <Verification />
              </Suspense>
            ),
          },
          {
            path: 'profile',
            element: (
              <Suspense fallback={<PreLoader />}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: 'withdraw',
            element: (
              <Suspense fallback={<PreLoader />}>
                <Withdraw />
              </Suspense>
            ),
          },
          {
            path: 'transactions',
            element: (
              <Suspense fallback={<PreLoader />}>
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
