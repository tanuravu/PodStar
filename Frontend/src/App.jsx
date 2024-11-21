import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from './layout/MainLayout';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login.jsx";
import Categories from "./pages/Categories";

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          {/* Main Layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<Categories />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
