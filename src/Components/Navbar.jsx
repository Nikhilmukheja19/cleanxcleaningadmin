import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-r from-white to-blue-50 shadow-md fixed top-0 left-0 w-full z-50 transition duration-300">
        <div className="max-w-8xl px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-extrabold text-blue-700 tracking-wide">
                CaneX Admin
              </span>
              <span className="text-sm text-gray-500 font-medium">
                Dashboard Panel
              </span>
            </div>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex space-x-4">
            {isLoggedIn ? (
              <button
                onClick={() => handlelogout()}
                className="px-5 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-100 font-semibold transition duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-100 font-semibold transition duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-semibold transition duration-200"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-700 hover:text-blue-900"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-3 shadow-inner rounded-b-lg">
            {isLoggedIn ? (
              <button
                onClick={() => handlelogout()}
                className="px-5 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-100 font-semibold transition duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-center text-blue-600 border border-blue-600 rounded-full py-2 hover:bg-blue-50 font-medium transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block text-center text-white bg-blue-600 rounded-full py-2 hover:bg-blue-700 font-medium transition"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden behind navbar */}
      <div className="h-[80px]" />
    </>
  );
};

export default Navbar;
