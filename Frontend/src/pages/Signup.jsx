import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./ErrorPage.jsx";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/sign-up",
        Values
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ErrorPage />
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <ToastContainer position="top-center" draggable />
          <div className="w-4/6 md:w-3/6 lg:w-2/6 bg-zinc-800 rounded-lg shadow-2xl p-8 flex flex-col items-center transform transition-transform duration-500 hover:scale-105 h:shadow-[0_0_25px_5px_rgba(255,255,255,0.3)]">
            <Link
              to="/"
              className="text-3xl font-extrabold text-zinc-50 mb-8 hover:animate-pulse"
            >
              PodStar
            </Link>
            <div className="w-full">
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="username"
                  className="text-zinc-400 font-medium transition-transform duration-300 hover:text-zinc-200"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="mt-2 px-4 py-3 bg-zinc-700 text-zinc-200 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] focus:ring-2 focus:ring-zinc-500 outline-none border-none transform transition-transform duration-300 focus:scale-105"
                  required
                  placeholder="Enter your username"
                  name="username"
                  value={Values.username}
                  onChange={change}
                />
              </div>
              <div className="flex flex-col mt-6">
                <label
                  htmlFor="email"
                  className="text-zinc-400 font-medium transition-transform duration-300 hover:text-zinc-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 px-4 py-3 bg-zinc-700 text-zinc-200 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] focus:ring-2 focus:ring-zinc-500 outline-none border-none transform transition-transform duration-300 focus:scale-105"
                  required
                  placeholder="Enter your email"
                  name="email"
                  value={Values.email}
                  onChange={change}
                />
              </div>
              <div className="flex flex-col mt-6">
                <label
                  htmlFor="password"
                  className="text-zinc-400 font-medium transition-transform duration-300 hover:text-zinc-200"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="mt-2 px-4 py-3 bg-zinc-700 text-zinc-200 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] focus:ring-2 focus:ring-zinc-500 outline-none border-none transform transition-transform duration-300 focus:scale-105"
                  required
                  placeholder="Enter your password"
                  name="password"
                  value={Values.password}
                  onChange={change}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-3 mt-8 bg-gradient-to-r from-zinc-600 to-zinc-500 text-white font-semibold rounded-lg hover:from-zinc-500 hover:to-zinc-400 transform transition-transform duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Signup
              </button>
              <p className="text-center text-zinc-400 mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-zinc-300 hover:text-zinc-100 transition-transform duration-300 hover:scale-105"
                >
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
