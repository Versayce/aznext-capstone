import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className="bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Left links */}
      <div className="flex flex-wrap md:flex-nowrap space-x-4 md:space-x-6">
        <NavLink
          to="/"
          className="hover:text-gray-500 dark:hover:text-gray-300 whitespace-nowrap"
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          className="hover:text-gray-500 dark:hover:text-gray-300 whitespace-nowrap"
        >
          Services
        </NavLink>
        <NavLink
          to="/work-order"
          className="hover:text-gray-500 dark:hover:text-gray-300 whitespace-nowrap"
        >
          Work Order
        </NavLink>
        <NavLink
          to="/admin"
          className="hover:text-gray-500 dark:hover:text-gray-300 whitespace-nowrap"
        >
          Admin
        </NavLink>
      </div>

      {/* Dark mode toggle */}
      <div className="ml-auto flex items-center space-x-2">
        {/* Light label */}
        <span
          className={`hidden sm:inline text-sm transition-opacity duration-300 ${
            darkMode ? "opacity-0" : "opacity-100"
          }`}
        >
          Light
        </span>

        <button
          onClick={toggleDarkMode}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            darkMode ? "bg-slate-500" : "bg-slate-250"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-gray-50 transition-transform dark:bg-slate-400 ${
              darkMode ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>

        {/* Dark label */}
        <span
          className={`hidden sm:inline text-sm transition-opacity duration-300 ${
            darkMode ? "opacity-100" : "opacity-0"
          }`}
        >
          Dark
        </span>
      </div>
    </nav>
  );
}
