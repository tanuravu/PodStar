import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import ErrorPage from "./ErrorPage";

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Values, setValues] = useState({
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
        "http://localhost:8080/api/v1/sign-in",
        Values,
        {
          withCredentials: true,
        }
      );
      dispatch(authActions.login());
      navigate("/profile");
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
          <div className="w-4/6 md:w-3/6 lg:w-2/6 bg-zinc-800 rounded-lg shadow-lg p-8 flex flex-col items-center shadow-[0_0_20px_5px_rgba(255,255,255,0.2)]">
            <Link
              to="/"
              className="text-3xl font-extrabold text-zinc-50 mb-8"
            >
              PodStar
            </Link>
            <div className="w-full">
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="email"
                  className="text-zinc-400 font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 px-4 py-3 bg-zinc-700 text-zinc-200 rounded-lg shadow-md shadow-[0_0_10px_rgba(255,255,255,0.1)] focus:ring-2 focus:ring-zinc-500 outline-none border-none"
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
                  className="text-zinc-400 font-medium"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="mt-2 px-4 py-3 bg-zinc-700 text-zinc-200 rounded-lg shadow-md shadow-[0_0_10px_rgba(255,255,255,0.1)] focus:ring-2 focus:ring-zinc-500 outline-none border-none"
                  required
                  placeholder="Enter your password"
                  name="password"
                  value={Values.password}
                  onChange={change}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-3 mt-8 bg-gradient-to-r from-zinc-600 to-zinc-500 text-white font-semibold rounded-lg shadow-lg shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Login
              </button>
              <p className="text-center text-zinc-400 mt-6">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-zinc-300 hover:text-zinc-100"
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
