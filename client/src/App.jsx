import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import WorkOrderForm from "./pages/WorkOrderForm";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="w-screen h-64 bg-black shadow-md"></div>
              <main className="min-h-screen p-6 bg-gray-50 text-gray-900 md:mx-4 lg:mx-8">
                <Home />
              </main>
            </>
          }
        />
        <Route
          path="/services"
          element={
            <main className="min-h-screen p-6 bg-gray-50 text-gray-900 md:mx-4 lg:mx-8">
              <Services />
            </main>
          }
        />
        <Route
          path="/work-order"
          element={
            <main className="min-h-screen p-6 bg-gray-50 text-gray-900 md:mx-4 lg:mx-8">
              <WorkOrderForm />
            </main>
          }
        />
      </Routes>
    </>
  );
}
