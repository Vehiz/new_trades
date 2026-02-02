import { useState } from "react";
import { useFormik } from "formik";
import { userSchema } from "../validation/userValidation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase-config.js";
import "react-phone-input-2/lib/style.css";
import jiggy_home from "../assets/jiggy_home.jpeg"
import PreLoader from "../components/PreLoader.jsx";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then(() => {
        const user = auth.currentUser;
        if (user) {
          setDoc(doc(db, "Users", user.email), {
            email: user.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            profit: values.profit,
            dashboardMessage: values.dashboardMessage
          });
        }

        sendEmailVerification(user);
        toast.success("email verification sent");
      });
      toast.success("registration successful");
      actions.resetForm();
      setTimeout(() => {
        navigate("/account/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("registration failed");
    } finally {
      setLoading(false);
    }
  };

  const {
    values,
    handleBlur,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
      profit: 0.0,
      dashboardMessage: ""
    },
    validationSchema: userSchema,
    onSubmit,
  });
if(loading){
  return <PreLoader/>
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
                Get started
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-bold">
                Create your BlockTrade account
              </h1>
              <p className="mt-3 text-sm text-white/70">
                Join thousands of traders using real-time insights, automated
                strategies, and secure portfolio management.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Secure onboarding with verification
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Access advanced trading tools
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Track performance in one dashboard
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-slate-900/80 p-6 sm:p-10 text-white"
          >
            <div className="mb-6 text-center">
              <p className="text-2xl font-bold">Create account</p>
              <p className="mt-1 text-sm text-white/60">
                Start trading in minutes.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="text-sm font-medium text-white/80">
                  First name
                </label>
                <input
                  className={`mt-2 w-full rounded-lg border bg-slate-900/60 px-3 py-2 text-sm text-white shadow-sm focus:border-emerald-300 focus:outline-none ${
                    errors.firstName && touched.firstName
                      ? "border-red-400"
                      : "border-white/10"
                  }`}
                  type="text"
                  placeholder="Jane"
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && (
                  <p className="mt-1 text-xs text-red-300">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="text-sm font-medium text-white/80">
                  Last name
                </label>
                <input
                  className={`mt-2 w-full rounded-lg border bg-slate-900/60 px-3 py-2 text-sm text-white shadow-sm focus:border-emerald-300 focus:outline-none ${
                    errors.lastName && touched.lastName
                      ? "border-red-400"
                      : "border-white/10"
                  }`}
                  type="text"
                  placeholder="Doe"
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && (
                  <p className="mt-1 text-xs text-red-300">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-white/80">
                  Email address
                </label>
                <input
                  className={`mt-2 w-full rounded-lg border bg-slate-900/60 px-3 py-2 text-sm text-white shadow-sm focus:border-emerald-300 focus:outline-none ${
                    errors.email && touched.email
                      ? "border-red-400"
                      : "border-white/10"
                  }`}
                  type="email"
                  placeholder="you@email.com"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  className={`mt-2 w-full rounded-lg border bg-slate-900/60 px-3 py-2 text-sm text-white shadow-sm focus:border-emerald-300 focus:outline-none ${
                    errors.password && touched.password
                      ? "border-red-400"
                      : "border-white/10"
                  }`}
                  type="password"
                  placeholder="Create a password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-xs text-red-300">{errors.password}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-white/80">
                  Confirm password
                </label>
                <input
                  className={`mt-2 w-full rounded-lg border bg-slate-900/60 px-3 py-2 text-sm text-white shadow-sm focus:border-emerald-300 focus:outline-none ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-400"
                      : "border-white/10"
                  }`}
                  type="password"
                  placeholder="Confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-xs text-red-300">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 text-sm text-white/70">
              <input
                className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent"
                id="acceptedTerms"
                name="acceptedTerms"
                type="checkbox"
                checked={values.acceptedTerms}
                onChange={handleChange}
              />
              <label htmlFor="acceptedTerms">
                I confirm that I am 18 years old or older and accept the
                <Link to="/terms" className="ml-1 text-emerald-200 hover:text-emerald-100">
                  terms &amp; conditions
                </Link>
                <span className="mx-1">and</span>
                <Link to="/terms" className="text-emerald-200 hover:text-emerald-100">
                  privacy policy
                </Link>
              </label>
            </div>
            {errors.acceptedTerms && touched.acceptedTerms && (
              <p className="mt-1 text-xs text-red-300">{errors.acceptedTerms}</p>
            )}

            <div className="mt-6 space-y-4">
              <button
                className="w-full rounded-lg bg-emerald-500/20 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500/30"
                type="submit"
                disabled={isSubmitting || loading}
              >
                {loading ? <span>...</span> : "Create account"}
              </button>
              <p className="text-center text-sm text-white/70">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-emerald-200 hover:text-emerald-100">
                  Sign in
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

export default Signup;
