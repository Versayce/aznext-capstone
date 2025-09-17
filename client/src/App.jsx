import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import WorkOrderForm from "./pages/WorkOrderForm";
import AdminWorkOrders from "./pages/AdminWorkOrders";
import About from "./pages/About";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-650 transition-colors duration-500 ease-in-out">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work-order" element={<WorkOrderForm />} />
          <Route path="/admin" element={<AdminWorkOrders />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
