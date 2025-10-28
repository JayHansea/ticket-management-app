import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const signupSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .max(255, "Email must be less than 255 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
