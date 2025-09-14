import { NavLink } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
      <div className="flex space-x-6">
        <NavLink to="/" className="hover:text-gray-500 dark:hover:text-gray-300">Home</NavLink>
        <NavLink to="/services" className="hover:text-gray-500 dark:hover:text-gray-300">Services</NavLink>
        <NavLink to="/work-order" className="hover:text-gray-500 dark:hover:text-gray-300">Work Order</NavLink>
      </div>

      <div className="ml-auto flex items-center space-x-2">
        <span className={`text-sm transition-opacity duration-300 ${darkMode ? "opacity-0" : "opacity-100"}`}>Light</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? "bg-blue-600" : "bg-gray-400"}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`}
          />
        </button>
        <span className={`text-sm transition-opacity duration-300 ${darkMode ? "opacity-100" : "opacity-0"}`}>Dark</span>
      </div>
    </nav>
  );
}
