import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../store/serviceSlice";
import { addWorkOrderItem, removeWorkOrderItem } from "../store/workOrderSlice";

export default function Services() {
  const dispatch = useDispatch();
  const { items: services, status, error } = useSelector((state) => state.services);
  const workOrderItems = useSelector((state) => state.workOrders.items);

  const [clickedId, setClickedId] = useState(null);
  const [isAdding, setIsAdding] = useState(true);

  useEffect(() => {
    if (status === "idle") dispatch(fetchServices());
  }, [status, dispatch]);

  const isInWorkOrder = (serviceId) =>
    workOrderItems.some((item) => item.id === serviceId);

  const handleToggle = (service) => {
    const adding = !isInWorkOrder(service.id);
    setClickedId(service.id);
    setIsAdding(adding);

    setTimeout(() => setClickedId(null), 500); // animation duration

    if (adding) dispatch(addWorkOrderItem(service));
    else dispatch(removeWorkOrderItem(service.id));
  };

  return (
    <div className="bg-gray-50 mt-30 dark:bg-slate-650 px-4 md:px-8 lg:px-10 py-10 2xl:px-60">
      <h1 className="text-3xl font-bold mb-10 text-center dark:text-white">
        Explore Our Services
      </h1>
      <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
        Our shop specializes in a variety of car services to keep your vehicle in top condition. All prices are subject to change based on labor and parts. Prices shown are low-end estimates.
      </p>

      {status === "loading" && (
        <p className="text-center text-slate-500 dark:text-slate-300">Loading services...</p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-600 dark:text-red-400">Error: {error}</p>
      )}

      {status === "succeeded" && (
        <div className="grid gap-6 mt-25 md:gap-8 lg:gap-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map((service) => {
            const added = isInWorkOrder(service.id);
            const isAnimating = clickedId === service.id;

            const gradient = isAdding
              ? "linear-gradient(to right, #B91C1C, #EF4444)"
              : "linear-gradient(to left, #15803D, #22C55E)";

            const animation = isAdding ? "swipe-left-to-right" : "swipe-right-to-left";

            return (
              <div
                key={service.id}
                className="bg-white dark:bg-slate-600 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col overflow-hidden"
              >
                <div className="p-6 flex-1 space-y-2">
                  <h2 className="text-xl font-semibold dark:text-white">{service.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                  <p className="mt-2 font-bold dark:text-white">${service.price}</p>
                </div>

                <button
                  onClick={() => handleToggle(service)}
                  className={`w-full py-3 font-medium transition relative overflow-hidden rounded-b-lg cursor-pointer ${
                    added
                      ? "bg-rose-300 text-white hover:bg-rose-500"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {isAnimating && (
                    <span
                      className="absolute inset-0 pointer-events-none rounded-lg"
                      style={{
                        background: gradient,
                        animation: `${animation} 0.5s forwards`,
                      }}
                    ></span>
                  )}
                  <span className="relative z-10">
                    {added ? "Remove from Order" : "Add to Order"}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
