import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const signupresponse = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      if (signupresponse) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
    // Add real signup logic here
    console.log("Admin Signed Up:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/80 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100"
      >
        <div className="text-center mb-6">
          <FaUserPlus className="text-blue-600 text-5xl mx-auto mb-2" />
          <h2 className="text-3xl font-extrabold text-blue-700">
            Admin Signup
          </h2>
          <p className="text-gray-600 text-sm">Create a new admin account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="name"
            placeholder="Admin Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Admin Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span className="text-blue-500">
            <Link to="/login">Login</Link>
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
