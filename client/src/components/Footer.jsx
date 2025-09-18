import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100 py-6 px-4 sm:px-6 md:px-12 transition-colors ease-in-out">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} Timing Logic Race Shop.</p>
        <div className="flex space-x-4">
          <NavLink to="/about" className="hover:text-gray-500 dark:hover:text-gray-300">
            About Us
          </NavLink>
          <NavLink to="/work-order" className="hover:text-gray-500 dark:hover:text-gray-300">
            Schedule Service
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
