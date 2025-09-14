import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../store/serviceSlice";

export default function Services() {
  const dispatch = useDispatch();
  const { items: services, status, error } = useSelector((state) => state.services);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchServices());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p className="text-gray-600">Loading services...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-600">Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              {service.description}
            </p>
            <p className="mt-2 font-bold">${service.price}</p>
            <button
              className="mt-6 w-full px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Add to Work Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
