import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../validation/userValidation";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PreLoader from "../components/PreLoader";
import jiggy_home from "../assets/jiggy_home.jpeg";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      // Set persistence based on rememberMe value
      const persistence = values.rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(auth, persistence);

      // Sign in the user
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Login successful");
      actions.resetForm();
      setTimeout(() => {
        navigate("/account/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const { values, handleChange, errors, touched, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        rememberMe: false,
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  if (loading) {
    return <PreLoader />;
  }

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url(${jiggy_home})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1226]/90 via-[#0b1226]/85 to-[#0b1226]/95" />

      <Link
        to="/"
        className="absolute top-6 left-6 z-10 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
      >
        Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="grid w-full items-stretch gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur md:grid-cols-2">
          <div className="flex flex-col justify-center gap-6 p-6 sm:p-10 text-white">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
                Welcome back
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-bold">
                Log in to your BlockTrade account
              </h1>
              <p className="mt-3 text-sm text-white/70">
                Access your portfolio, manage trades, and monitor real-time market
                signals all in one place.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Real-time analytics and alerts
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Secure withdrawals and deposits
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                24/7 automated trading tools
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-slate-900/80 p-6 sm:p-10 text-white"
          >
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">Login</h2>
              <p className="mt-1 text-sm text-white/60">
                Welcome back, please enter your details.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-white/80">
                  Email address
                </label>
                <input
                  className={
                    errors.email && touched.email
                      ? "mt-2 w-full rounded-lg border border-red-400 bg-slate-900/60 px-3 py-2 text-sm text-white shadow-sm focus:border-emerald-300 focus:outline-none"
                      : "mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white shadow-sm focus:border-emerald-300 focus:outline-none"
                  }
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-xs text-red-300">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium text-white/80">
                  Password
                </label>
                <input
                  className={
                    errors.password && touched.password
                      ? "mt-2 w-full rounded-lg border border-red-400 bg-slate-900/60 px-3 py-2 text-sm text-white shadow-sm focus:border-emerald-300 focus:outline-none"
                      : "mt-2 w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white shadow-sm focus:border-emerald-300 focus:outline-none"
                  }
                  placeholder="••••••••"
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs text-red-300">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-white/70">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={values.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-white/30 bg-transparent"
                  />
                  Remember me
                </label>
                <Link to="/forgotpassword" className="text-emerald-200 hover:text-emerald-100">
                  Forgot password?
                </Link>
              </div>
              {errors.rememberMe && touched.rememberMe && (
                <p className="text-xs text-red-300">{errors.rememberMe}</p>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <button
                className="w-full rounded-lg bg-emerald-500/20 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500/30"
                type="submit"
                disabled={isSubmitting || loading}
              >
                {loading ? <span>...</span> : "Login"}
              </button>
              <p className="text-center text-sm text-white/70">
                Don&rsquo;t have an account?{" "}
                <Link to="/signup" className="font-semibold text-emerald-200 hover:text-emerald-100">
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-white/60">
          Copyright © {new Date().getFullYear()} Blocktrade
        </div>
      </div>
    </section>
  );
};

export default Login;
