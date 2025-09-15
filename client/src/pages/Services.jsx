import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../store/serviceSlice";
import { addWorkOrder } from "../store/workOrderSlice";

export default function Services() {
  const dispatch = useDispatch();
  const { items: services, status, error } = useSelector((state) => state.services);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchServices());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p className="text-gray-600 dark:text-gray-300">Loading services...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-600 dark:text-red-400">Error: {error}</p>;
  }

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl font-bold mb-10 text-center dark:text-white">Our Services</h1>

      <div className="grid gap-6 md:gap-8 lg:gap-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-slate-600 rounded-2xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
          >
            {/* Content with padding */}
            <div className="p-6 flex-1 space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">{service.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              <p className="mt-2 font-bold dark:text-white">${service.price}</p>
            </div>

            {/* Full-width, flush button */}
            <button
              onClick={() => dispatch(addWorkOrder(service))}
              className="w-full bg-rose-250 text-white py-3 hover:bg-rose-500 transition"
            >
              Add to Work Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
