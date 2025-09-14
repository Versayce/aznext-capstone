import { useSelector, useDispatch } from "react-redux";
import { addWorkOrder } from "../store/workOrderSlice"; // make sure this import exists

export default function Services() {
  const services = useSelector((state) => state.services.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-600">{service.description}</p>
            <p className="mt-2 font-bold">${service.price}</p>

            {/* Center the button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => dispatch(addWorkOrder(service))}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                More Info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
