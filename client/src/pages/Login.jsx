import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email == "Test@test.com" || password === "Test") {
        localStorage.setItem("token", "token123");

        navigate("/dashboard");
      }
      else {
        setError("Please Correct Email and Password as given below");
        return;
      }


    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err.response);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6 text-center">
            Admin Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-400 text-white py-3 px-4 rounded-lg"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <p className="text-base">
              Test Email: <span className="font-bold ">Test@test.com</span>
            </p>
            <p className="text-base">
              Test Password: <span className="font-bold">Test</span>
            </p>
          </div>
        </div>
      </div>
    </>

  );
};

export default Login;
