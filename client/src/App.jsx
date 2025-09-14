import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50 text-gray-900 md:mx-4 lg:mx-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>
    </>
  );
}
