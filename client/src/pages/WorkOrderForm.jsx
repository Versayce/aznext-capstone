import { useSelector, useDispatch } from "react-redux";
import { removeWorkOrder, clearWorkOrder } from "../store/workOrderSlice";
import { useState } from "react";

export default function WorkOrderForm() {
  const items = useSelector((state) => state.workOrder.items);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Work order submitted for ${form.name} (${form.email})`);
    dispatch(clearWorkOrder());
    setForm({ name: "", email: "" });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Submit Work Order</h1>

      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No services selected yet.</p>
      ) : (
        <ul className="mb-6 space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow"
            >
              <span>{item.name}</span>
              <span className="font-medium">${item.price}</span>
              <button
                onClick={() => dispatch(removeWorkOrder(item.id))}
                className="ml-4 px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600"
          required
        />
        <button
          type="submit"
          className="w-full px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
