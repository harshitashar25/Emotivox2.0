import { useState, useEffect } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
      return localStorage.getItem("theme") === "dark";
    });
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    useEffect(() => {
      if (isDarkMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    }, [isDarkMode]);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  return (
    <header
    className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled ? "bg-white dark:bg-gray-900 shadow-md py-2" : "bg-transparent py-4"}
    `}
  >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* QuadraTech Name */}
          <h1
            className={`text-2xl font-bold flex space-x-1 ${
              isScrolled ? "text-gray-800 dark:text-white" : "text-white"
            }`}
          >
            <span className="text-white">Quadra</span>
            <span style={{ color: "#CFFF04" }}>Tech</span>
          </h1>

          {/* Navigation and Dark Mode Toggle */}
          <div className="flex items-center space-x-6">
            {/* Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {["Home", "About"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`
                        font-medium transition-colors duration-300
                        ${
                          isScrolled
                            ? "text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400"
                            : "text-teal-100 hover:text-white"
                        }
                      `}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`
                p-2 rounded-full transition-colors duration-300
                ${
                  isScrolled
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    : "bg-teal-700 text-teal-100 hover:bg-teal-600 hover:text-white"
                }
              `}
            >
              {isDarkMode ? (
                <HiOutlineSun className="w-5 h-5" />
              ) : (
                <HiOutlineMoon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
