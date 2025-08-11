import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const signupValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "First Name must be at least 3 characters long")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Last Name must be at least 3 characters long")
    .required("Last Name is required"),
  dateofbirth:Yup.date()
  .nullable()
  .required("Date of Birth is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    confirmemail:Yup.string()
    .oneOf([Yup.ref("email")],"Emails do not match")
    .required("Please confirm your email"),
  country: Yup.string()
  .required("Country is required"),
  phone: Yup.string()
    .matches(/^\+\d{1,4}\d{7,11}$/, "Phone number must include a valid country code and contain 7 to 11 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Contain at least one uppercase letter")
    .matches(/[a-z]/, "Contain at least one lowercase letter")
    .matches(/[0-9]/, "Contain at least one number")
    .matches(/[@$!%*?&#]/, "Contain at least one special character")
    .required("Password is required"),
    confirmpassword:Yup.string()
    .oneOf([Yup.ref("password")],"Passwords do not match")
    .required("Please confirm your password"),
});



export const contactValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(
      /^\+\d{1,4}\d{7,11}$/,
      "Phone number must include a valid country code and contain 7 to 11 digits"
    )
    .required("Phone number is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters long")
    .required("Message is required"),
});





export const profileValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  contactNo: Yup.string()
    .matches(
      /^\+\d{1,4}\d{7,11}$/,
      "Phone number must include a valid country code and contain 7 to 11 digits"
    )
    .required("Phone number is required"),
  country: Yup.string().required("Country is required"),
  gender: Yup.string().required("Gender is required"),
});




export const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old password is required"),

  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Contain at least one uppercase letter")
    .matches(/[a-z]/, "Contain at least one lowercase letter")
    .matches(/[0-9]/, "Contain at least one number")
    .matches(/[@$!%*?&#]/, "Contain at least one special character")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm password is required"),
});



export const reviewValidationSchema = Yup.object().shape({
  title: Yup
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Review title is required"),
  content: Yup
    .string()
    .trim()
    .min(10, "Review content must be at least 10 characters")
    .max(1000, "Review content cannot exceed 1000 characters")
    .required("Review content is required"),
  rating: Yup
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),
});
