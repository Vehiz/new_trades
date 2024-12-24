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
import { useNavigate } from "react-router-dom";
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
      className="relative w-full min-h-screen  flex flex-col items-center justify-center "
      style={{
        backgroundImage: `url(${jiggy_home})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {" "}
      <a href="/" className="absolute top-0 left-0 m-4">
        <p className="underline text-white text-[22px]">Home</p>
      </a>
      <div className="flex flex-col md:flex-row w-full lg:w-3/5 bg-transparent from-blue-600 via-blue-700 to-blue-900 bg-opacity-80 rounded-md items-center gap-5 justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-white p-6 my-9 rounded-md"
        >
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
          </div>
          <div className="">
            <div className="mb-4">
              <input
                className={
                  errors.email && touched.email
                    ? "shadow appearance-none w-full border border-red-600 rounded placeholder- py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    : "shadow appearance-none w-full border rounded placeholder- py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                }
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <p className="text-[red] text-[12px]">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                className={
                  errors.password && touched.password
                    ? "shadow appearance-none w-full border border-red-600 rounded placeholder- py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    : "shadow appearance-none w-full border rounded placeholder- py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                }
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && touched.password && (
                <p className="text-[red] text-[12px]">{errors.password}</p>
              )}
            </div>
            <div className="mb-4 flex gap-[8px]">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={values.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            {errors.rememberMe && touched.rememberMe && (
              <p className="text-[red] text-[12px]">{errors.rememberMe}</p>
            )}
          </div>
          <div className="flex flex-col gap-[15px] mt-[15px] items-center justify-between">
            <button
              className="bg-blue-500 opacity-80 hover:bg-blue-700 w-full mt-[10px] text-[#fff] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting || loading}
            >
              {loading ? <span className="">...</span> : "Login"}
            </button>
            <div className="flex justify-center">
              <a
                href="/forgotpassword"
                className="text-blue-500 hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-[14px]">
                Don&rsquo;t have account ?{" "}
                <a href="/signup" className="text-blue-500 hover:text-blue-700">
                  Register
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="text-gray-400 mt-11">
        <p>Copyright © {new Date().getFullYear()} BlockMine</p>
      </div>
    </section>
  );
};

export default Login;
