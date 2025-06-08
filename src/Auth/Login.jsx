import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Admin Logged In:", { email, password });

    try {
      const loginresponse = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      if (loginresponse) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }

    // You can store token here
    // localStorage.setItem("adminToken", "your-token-here");
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
          <FaUserShield className="text-blue-600 text-5xl mx-auto mb-2" />
          <h2 className="text-3xl font-extrabold text-blue-700">Admin Login</h2>
          <p className="text-gray-600 text-sm">Secure access panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span className="text-blue-500">
            <Link to="/signup">Signup</Link>
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
