import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* QuadraTech Name */}
          <h1
            className={`text-2xl font-bold flex space-x-1 ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <span className="text-white">Quadra</span>
            <span style={{ color: "#CFFF04" }}>Tech</span>
          </h1>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className={`font-medium transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-600 hover:text-teal-600"
                      : "text-teal-100 hover:text-white"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`font-medium transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-600 hover:text-teal-600"
                      : "text-teal-100 hover:text-white"
                  }`}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
