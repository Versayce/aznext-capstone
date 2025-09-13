import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex gap-6">
      <Link to="/" className="font-semibold hover:text-blue-600">Home</Link>
      <Link to="/services" className="hover:text-blue-600">Services</Link>
    </nav>
  );
}
