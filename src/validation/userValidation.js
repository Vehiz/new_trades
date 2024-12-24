import * as Yup from "yup";


export const userSchema = Yup.object().shape({
    firstName: Yup.string().required("please enter your first name"),
    lastName: Yup.string().required("please enter your last name"),
    email: Yup.string().email("Invalid email format").required("please enter a valid email"),
    phoneNumber: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      ,
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("please enter a password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("please confirm your password"),
      acceptedTerms: Yup.boolean().oneOf([true], "You must accept the terms and conditions").required("Required"),
  });

  export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("please enter a valid email"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("please enter a password"),
      rememberMe: Yup.boolean()
  });