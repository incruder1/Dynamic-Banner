import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login"); }
  return (
  <>
  <nav className='bg-black p-6 '>
  <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Home
        </Link>
        <div className="flex space-x-4">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-teal-200 transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-teal-200 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white hover:text-teal-200 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
  </nav>
  </>
  )
}

export default Navbar