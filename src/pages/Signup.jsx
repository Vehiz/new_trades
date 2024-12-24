import { useState } from "react";
import { useFormik } from "formik";
import { userSchema } from "../validation/userValidation";
import { useNavigate } from "react-router-dom";
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
    },
    validationSchema: userSchema,
    onSubmit,
  });
if(loading){
  return <PreLoader/>
}
  return (
<section
      className="relative w-full h-screen flex flex-col items-center justify-center mt-[x]"
      style={{
        backgroundImage: `url(${jiggy_home})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >      <a href="/" className="absolute top-0 left-0 m-4">
        <p className="underline text-white text-[22px]">Home</p>
      </a>
      <div className="flex flex-col md:flex-row w-full lg:w-3/5 bg-transparent from-blue-600 via-blue-700 to-blue-900 bg-opacity-80 rounded-md items-center gap-5 justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 bg-white p-6 my-9 rounded-md"
        >
          <div className="text-center mb-6">
            <p className="text-2xl font-bold">Register</p>
          </div>
          <div className="space-y-4">
            <div>
              <input
                className={`shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.firstName && touched.firstName
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                type="text"
                placeholder="Firstname"
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && touched.firstName && (
                <p className="text-red-600 text-xs">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                className={`shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.lastName && touched.lastName
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                type="text"
                placeholder="Lastname"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && touched.lastName && (
                <p className="text-red-600 text-xs">{errors.lastName}</p>
              )}
            </div>
            <div>
              <input
                className={`shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email && touched.email
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <p className="text-red-600 text-xs">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                className={`shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password && touched.password
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <p className="text-red-600 text-xs">{errors.password}</p>
              )}
            </div>
            <div>
              <input
                className={`shadow appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-600"
                    : "border-gray-300"
                }`}
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-600 text-xs">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2 mt-4 text-sm">
            <input
              className="mt-1"
              id="acceptedTerms"
              name="acceptedTerms"
              type="checkbox"
              checked={values.acceptedTerms}
              onChange={handleChange}
            />
            <label htmlFor="acceptedTerms">
              I confirm that I am 18 years old or older and accept the 
              <a href="/terms" className="text-blue-500 hover:text-blue-700"> terms & conditions</a> and <a href="/terms" className="text-blue-500 hover:text-blue-700">privacy policy</a>
            </label>
          </div>
          {errors.acceptedTerms && touched.acceptedTerms && (
            <p className="text-red-600 text-xs">{errors.acceptedTerms}</p>
          )}
          <div className="flex flex-col gap-5 mt-5 items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isSubmitting || loading}
            >
              {loading ? <span className="">...</span> : "Register"}
            </button>
            <div className="flex items-center justify-center">
              <p className="text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:text-blue-700">
                  Signin
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

export default Signup;
