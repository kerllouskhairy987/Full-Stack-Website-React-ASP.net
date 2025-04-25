import * as yup from "yup";

// Register Schema Validation
export const registerSchema = yup.object().shape({

  nationalNo: yup
    .string()
    .matches(/^\d{14}$/, "National number must be 14 digits")
    .required("National number is required"),

  fname: yup.string().required("First name is required"),
  sname: yup.string().required("second name is required"),
  tname: yup.string().required("third name is required"),
  lname: yup.string().required("last name is required"),


  phonenumber: yup
    .string()
    .matches(/^\d{10,15}$/, "Mobile number must be between 10 and 15 digits")
    .required("Mobile number is required"),

  birthDate: yup
    .string()
    .required("Birthdate is required")
    .test(
      "is-valid-date",
      "Birthdate must be a valid date",
      (value) => !isNaN(new Date(value || "").getTime())
    )
    .test(
      "is-not-in-future",
      "Birthdate cannot be in the future",
      (value) => new Date(value || "") <= new Date()
    ),

  address: yup.string().required("address location is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, "Invalid email address")
    .required("Email is required"),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one lowercase letter and one number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, "Invalid email address")
    .required("Email is required"),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one lowercase letter and one number"
    )
    .required("Password is required"),
});


export const emailSchema = yup
  .object({
    email: yup.string().required("Invalid email address").email("Invalid email address").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address example:'email@email.com'")
  })
  .required()

export const resetPasswordSchema = yup
  .object({
    password: yup.string().required().matches(
      /^(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one lowercase letter and one number"
    )
  })
  .required()