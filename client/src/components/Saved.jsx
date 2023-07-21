import { useFormik } from "formik";
import "../app.css";
import { registrationSchema } from "../schema/register";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavBar2 from "./NavBar2";
import axios from "axios";

// const onSubmit = async (values, actions) => {
//   console.log("submitted");
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   actions.resetForm();
// };

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formValues, setFormValues] = useState({
    surname: "",
    firstname: "",
    email: "",
    dob: "",
    password: "",
    password2: "",
    phone_number: "",
    state_of_origin: "",
    gender: "",
    craft: "",
    years_of_experience: "",
    skills_description: "",
    home_address: "",
    image: "",
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { values, errors, touched, handleBlur } = useFormik({
    initialValues: {
      surname: "",
      firstname: "",
      email: "",
      dob: "",
      password: "",
      password2: "",
      phone_number: "",
      state_of_origin: "",
      gender: "",
      craft: "",
      years_of_experience: "",
      skills_description: "",
      home_address: "",
      image: "",
    },
    validationSchema: registrationSchema,
    // onSubmit,
  });

  // console.log(errors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/artisan/signup", formValues);
      console.log(response, "User created successfully");
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid">
      <NavBar2 />
      <div className="flex justify-center items-center  min-h-screen bg-[#f7f7f7] bg">
        <form
          onSubmit={handleSubmit}
          action=""
          method="POST"
          className="bg-[#fff] p-10 shadow shadow-[#040c16] w-96 md:w-[530px] mt-20"
        >
          <div className="pb-10">
            <p className="text-3xl font-bold text-[#FCD12A]">Welcome!</p>
            <p>Enter your sign up details </p>
          </div>

          <div className="flex space-x-7 md:w-[1000px] ">
            <div className="pb-4">
              <label htmlFor="surname"></label>
              <input
                value={formValues.surname}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                id="surname"
                placeholder="Surname"
                className={
                  errors.surname && touched.surname
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              />
              {errors.surname && touched.surname && (
                <p className="text-red-600 text-xs space-x-7  ">
                  {errors.surname}
                </p>
              )}
            </div>

            <div className="pb-4">
              <label htmlFor="firstname"></label>
              <input
                value={formValues.firstname}
                onChange={handleChange}
                // onBlur={handleBlur}
                type="text"
                id="firstname"
                placeholder="firstname"
                className={
                  errors.firstname && touched.firstname
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              />
              {errors.firstname && touched.firstname && (
                <p className="text-red-600 text-xs ">{errors.firstname}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-7 md:w-[1000px]">
            <div className="pb-4">
              <label htmlFor="email"></label>
              <input
                value={formValues.email}
                onChange={handleChange}
                // onBlur={handleBlur}
                type="text"
                id="email"
                placeholder="email"
                className={
                  errors.email && touched.email
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              />
              {errors.email && touched.email && (
                <p className="text-red-600 text-xs ">{errors.email}</p>
              )}
            </div>
            <div className="pb-4 md:w-[210px]">
              <label htmlFor="dob"></label>
              <input
                value={formValues.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                type="date"
                id="dob"
                placeholder="Date of Birth"
                className={
                  errors.dob && touched.dob
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              />
              {errors.dob && touched.dob && (
                <p className="text-red-600 text-xs ">{errors.dob}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-7 md:w-[1000px]">
            <div className="pb-4 relative">
              <label htmlFor="password"></label>
              <input
                value={formValues.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="password"
                className={
                  errors.password && touched.password
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full pr-12"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full pr-12"
                }
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute md:top-6 md:right-4 top-4 right-2  cursor-pointer"
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="absolute md:top-6 md:right-4  top-4 right-2 cursor-pointer"
                  onClick={handlePasswordVisibility}
                />
              )}
              {errors.password && touched.password && (
                <p className="text-red-600 text-xs ">{errors.password}</p>
              )}
            </div>

            <div className="pb-4 relative">
              <label htmlFor="password2"></label>
              <input
                value={formValues.password2}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                id="password2"
                placeholder="password2"
                className={
                  errors.password2 && touched.password2
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full pr-12"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full pr-12"
                }
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute md:top-6 md:right-4 top-4 right-2 cursor-pointer"
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="absolute md:top-6 md:right-4 top-4 right-2  cursor-pointer"
                  onClick={handlePasswordVisibility}
                />
              )}
              {errors.password2 && touched.password2 && (
                <p className="text-red-600 text-xs ">{errors.password2}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-7 md:w-[1000px]">
            <div className="pb-4">
              <label htmlFor="phone_number"></label>
              <input
                value={formValues.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                id="phone_number"
                placeholder="phone_number"
                className={
                  errors.phone_number && touched.phone_number
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              />
              {errors.phone_number && touched.phone_number && (
                <p className="text-red-600 text-xs ">{errors.phone_number}</p>
              )}
            </div>
            <div className="pb-4 md:w-[210px]">
              <label htmlFor="state_of_origin"></label>
              <select
                id="state_of_origin"
                name="state_of_origin"
                value={formValues.state_of_origin}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.state_of_origin && touched.state_of_origin
                    ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              >
                <option value="">Select State of Origin</option>
                <option value="Abia">Abia</option>
                <option value="Adamawa">Adamawa</option>
                <option value="Akwa Ibom">Akwa Ibom</option>
                <option value="Anambra">Anambra</option>
                <option value="Bauchi">Bauchi</option>
                <option value="Bayelsa">Bayelsa</option>
                <option value="Benue">Benue</option>
                <option value="Borno">Borno</option>
                <option value="Cross River">Cross River</option>
                <option value="Delta">Delta</option>
                <option value="Ebonyi">Ebonyi</option>
                <option value="Edo">Edo</option>
                <option value="Ekiti">Ekiti</option>
                <option value="Enugu">Enugu</option>
                <option value="FCT">Federal Capital Territory</option>
                <option value="Gombe">Gombe</option>
                <option value="Imo">Imo</option>
                <option value="Jigawa">Jigawa</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Kano">Kano</option>
                <option value="Katsina">Katsina</option>
                <option value="Kebbi">Kebbi</option>
                <option value="Kogi">Kogi</option>
                <option value="Kwara">Kwara</option>
                <option value="Lagos">Lagos</option>
                <option value="Nasarawa">Nasarawa</option>
                <option value="Niger">Niger</option>
                <option value="Ogun">Ogun</option>
                <option value="Ondo">Ondo</option>
                <option value="Osun">Osun</option>
                <option value="Oyo">Oyo</option>
                <option value="Plateau">Plateau</option>
                <option value="Rivers">Rivers</option>
                <option value="Sokoto">Sokoto</option>
                <option value="Taraba">Taraba</option>
                <option value="Yobe">Yobe</option>
                <option value="Zamfara">Zamfara</option>
              </select>
              {errors.state_of_origin && touched.state_of_origin && (
                <p className="text-red-600 text-xs">{errors.state_of_origin}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-7 md:w-[1000px]">
            <div className="pb-4 md:w-[210px]">
              <label htmlFor="gender"></label>
              <select
                id="gender"
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.gender && touched.gender
                    ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              >
                <option value="">Select a gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && touched.gender && (
                <p className="text-red-600 text-xs ">{errors.gender}</p>
              )}
            </div>

            <div className="pb-4">
              <label htmlFor="craft"></label>
              <input
                value={formValues.craft}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                id="craft"
                placeholder="craft"
                className={
                  errors.craft && touched.craft
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              />
              {errors.craft && touched.craft && (
                <p className="text-red-600 text-xs ">{errors.craft}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-7 md:w-[1000px]">
            <div className="pb-4">
              <label htmlFor="years_of_experience"></label>
              <input
                value={formValues.years_of_experience}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                id="years_of_experience"
                placeholder="years_of_experience"
                className={
                  errors.years_of_experience && touched.years_of_experience
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              />
              {errors.years_of_experience && touched.years_of_experience && (
                <p className="text-red-600 text-xs ">
                  {errors.years_of_experience}
                </p>
              )}
            </div>

            <div className="pb-4">
              <label htmlFor="skills_description"></label>
              <input
                value={formValues.skills_description}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                id="skills_description"
                placeholder="skills_description"
                className={
                  errors.skills_description && touched.skills_description
                    ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                    : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                }
              />
              {errors.skills_description && touched.skills_description && (
                <p className="text-red-600 text-xs ">
                  {errors.skills_description}
                </p>
              )}
            </div>
          </div>

          <div className="pb-4">
            <label htmlFor="home_address"></label>
            <input
              value={formValues.home_address}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="home_address"
              placeholder="home_address"
              className={
                errors.home_address && touched.home_address
                  ? " input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                  : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
              }
            />
            {errors.home_address && touched.home_address && (
              <p className="text-red-600 text-xs ">{errors.home_address}</p>
            )}
          </div>

          <div className="pb-4">
            <label
              htmlFor="image"
              className="bg-gray-200 py-2 px-4 rounded-md cursor-pointer"
            >
              Choose File
            </label>
            <input
              value={formValues.image}
              onChange={handleChange}
              onBlur={handleBlur}
              type="file"
              id="image"
              className={
                errors.image && touched.image ? "input-error hidden" : "hidden"
              }
            />
            {errors.image && touched.image && (
              <p className="text-red-600 text-xs mt-5">{errors.image}</p>
            )}
          </div>

          <div className="pb-4 text-[#39CDCC]">
            <p>
              <a href="./login.jsx">Already signed up? Login</a>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FCD12A] text-[#fff] p-4 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
