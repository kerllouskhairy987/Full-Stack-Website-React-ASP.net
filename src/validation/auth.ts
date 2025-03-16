import * as yup from "yup";

export const validationSchemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const validationSchemaRegister = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, "Mobile number must be between 10 and 15 digits")
    .required("Mobile number is required"),
  BirthOD: yup
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
  national_id: yup
    .string()
    .matches(/^\d{14}$/, "National number must be 14 digits")
    .required("National number is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "Password must be at least 8 characters long, contain at least one lowercase letter and one number"
    )
    .required("Password is required"),
});

