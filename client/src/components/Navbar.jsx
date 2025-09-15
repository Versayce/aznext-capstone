import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  return (
    <nav className="bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
      {/* Left links */}
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className="hover:text-gray-500 dark:hover:text-gray-300"
        >
          Home
        </NavLink>
        <NavLink
          to="/services"
          className="hover:text-gray-500 dark:hover:text-gray-300"
        >
          Services
        </NavLink>
        <NavLink
          to="/work-order"
          className="hover:text-gray-500 dark:hover:text-gray-300"
        >
          Work Order
        </NavLink>
      </div>

      {/* Toggle */}
      <div className="ml-auto flex items-center space-x-2">
        <span
          className={`text-sm transition-opacity duration-300 ${
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
        <span
          className={`text-sm transition-opacity duration-300 ${
            darkMode ? "opacity-100" : "opacity-0"
          }`}
        >
          Dark
        </span>
      </div>
    </nav>
  );
}
