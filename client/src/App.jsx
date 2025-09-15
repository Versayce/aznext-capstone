import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import WorkOrderForm from "./pages/WorkOrderForm";

export default function App() {
  return (
    <>
      <Navbar />

      {/* App background container */}
      <div className="bg-gray-50 dark:bg-slate-650 transition-colors duration-300 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>

                <div className="w-screen h-84 bg-slate-900 dark:bg-slate-700 shadow-md"></div>

                {/* Main Content */}
                <main className="min-h-screen p-6 md:mx-4 lg:mx-8">
                  <Home />
                </main>
              </>
            }
          />

          {/* Services Page */}
          <Route
            path="/services"
            element={
              <main className="min-h-screen p-6 md:mx-4 lg:mx-8">
                <Services />
              </main>
            }
          />

          {/* Work Order Page */}
          <Route
            path="/work-order"
            element={
              <main className="min-h-screen p-6 md:mx-4 lg:mx-8">
                <WorkOrderForm />
              </main>
            }
          />
        </Routes>
      </div>
    </>
  );
}
