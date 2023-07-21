import * as yup from "yup";

export const registrationSchema = yup.object().shape({
  surname: yup.string().required("Surname name is required."),
  firstname: yup.string().required("Last name is required."),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  dob: yup.string().required("dob is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .matches(/[0-9]/, "Password requires a number.")
    .matches(/[a-z]/, "Password requires a lowercase letter.")
    .matches(/[A-Z]/, "Password requires an uppercase letter.")
    .matches(/[^\w]/, "Password requires a symbol.")
    .required("Password is required."),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match.")
    .required("Confirm password is required."),
  phone_number: yup
    .string()
    .matches(/^\d{14}$/, "Invalid phone number.")
    .required("Phone number is required."),
  state_of_origin: yup.string().required("State is required."),
  gender: yup
    .string()
    .oneOf(["male", "female", "nonbinary"], "Invalid gender.")
    .required("Gender is required."),
  // image: yup
  //   .mixed()
  //   .test("fileSize", "Image must be less than 1 MB.", (value) =>
  //     value ? value.size <= 1000000 : true
  //   )
  //   .test("fileType", "Invalid file type. Only JPEG, PNG, and GIF are allowed.", (value) =>
  //     value ? ["image/jpeg", "image/png", "image/gif"].includes(value.type) : true
  //   ),
  craft: yup.string().required("Craft is required."),
  years_of_experience: yup
    .number()
    .min(0, "Years of experience must be a positive number.")
    .required("Years of experience is required."),
  skills_description: yup.string().required("Skills description is required."),
  home_address: yup.string().required("Home address is required."),
  image: yup.string().required("Please upload a profile picture."),
});
