import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage.jsx";

const Signup = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Basic validation for empty fields
    if (!values.username || !values.email || !values.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      // Ensure your backend is running at the correct URL and port
      const res = await axios.post("http://localhost:8080/api/v1/sign-up", values); 
      
      // Show success message if signup is successful
      toast.success(res.data.message || "Signup successful!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Signup error:", error);

      // Check if error.response exists and if it contains a message
      const errorMsg =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Something went wrong. Please try again.";
      toast.error(errorMsg); // Show error message if the signup fails
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ErrorPage />
      ) : (
        <div className="h-screen bg-green-100 flex items-center justify-center">
          <ToastContainer position="top-center" draggable />
          <div className="w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center">
            <Link to="/" className="text-2xl font-bold">
              PodDeck
            </Link>
            <form className="mt-6 w-full items-center" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-2 px-2 py-2 rounded outline-none border border-black"
                  required
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-2 px-2 py-2 rounded outline-none border border-black"
                  required
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-2 px-2 py-2 rounded outline-none border border-black"
                  required
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex flex-col mt-2">
                <button
                  type="submit"
                  className="bg-green-900 font-semibold text-xl text-white rounded py-2 mt-4"
                >
                  Signup
                </button>
              </div>
            </form>
            <div className="w-full flex flex-col mt-4">
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold hover:text-blue-600">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
