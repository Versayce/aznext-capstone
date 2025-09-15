import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../store/serviceSlice";
import { addWorkOrderItem } from "../store/workOrderSlice";

export default function Services() {
  const dispatch = useDispatch();
  const { items: services, status, error } = useSelector((state) => state.services);

  useEffect(() => {
    if (status === "idle") dispatch(fetchServices());
  }, [status, dispatch]);

  return (
    <div className="bg-gray-50 dark:bg-slate-650 px-4 md:px-8 lg:px-12 py-10">
      <h1 className="text-3xl font-bold mb-10 text-center dark:text-white">Explore Our Services</h1>
      <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
        Our shop specializes in a variety of car services to keep your vehicle in top condition. All prices are subject to change based on labor and parts. Prices shown are low-end estimates.
      </p>

      {status === "loading" && <p className="text-center text-slate-500 dark:text-slate-300">Loading services...</p>}
      {status === "failed" && <p className="text-center text-red-600 dark:text-red-400">Error: {error}</p>}

      {status === "succeeded" && (
        <div className="grid gap-6 md:gap-8 lg:gap-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-600 rounded-2xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
            >
              <div className="p-6 flex-1 space-y-2">
                <h2 className="text-xl font-semibold dark:text-white">{service.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                <p className="mt-2 font-bold dark:text-white">${service.price}</p>
              </div>
              <button
                onClick={() => dispatch(addWorkOrderItem(service))}
                className="w-full bg-rose-300 text-white py-3 hover:bg-rose-500 transition cursor-pointer"
              >
                Add to Work Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
