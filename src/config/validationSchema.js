import * as Yup from "yup";

export const name = Yup.string()
  .min(2, "Too Short!")
  .max(50, "Too Long!")
  .required("Name is required");

export const description = Yup.string()
  .min(20, "Too Short!")
  .max(10000, "Too Long!")
  .required("Description is required");

export const username = Yup.string()
  .min(4, "Too Short!")
  .max(50, "Too Long!")
  .required("Username is required");

export const password = Yup.string()
  .min(6, "Password must be atleast 6 characters long!")
  .required("Password is required");

export const email = Yup.string()
  .required("Email is required")
  .email("Invalid Email")
  .label("Email");

export const price = Yup.number()
  .min(0.000000000000000001, "Price should be greater than 0")
  .required("Price is required");
