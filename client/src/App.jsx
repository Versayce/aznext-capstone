import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import WorkOrderForm from "./pages/WorkOrderForm";
import AdminWorkOrders from "./pages/AdminWorkOrders";

export default function App() {
  return (
    <div className="bg-gray-50 dark:bg-slate-650 transition-colors duration-800">
      <Navbar />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work-order" element={<WorkOrderForm />} />
          <Route path="/admin" element={<AdminWorkOrders />} />
        </Routes>
      
    </div>
  );
}
