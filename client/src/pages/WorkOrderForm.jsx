import { useSelector, useDispatch } from "react-redux";
import { clearWorkOrder, removeWorkOrder } from "../store/workOrderSlice";
import { useState } from "react";
import { Trash2 } from "lucide-react";

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
    <div className="bg-gray-50 dark:bg-slate-650 px-4 md:px-8 lg:px-12 py-10">
      <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-10">
        Submit a Work Order
      </h1>

      {/* Scrollable service list */}
      {items.length > 0 ? (
        <ul className="space-y-3 max-w-lg mx-auto overflow-y-auto" style={{ maxHeight: '250px' }}>
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-3 rounded-sm shadow-md bg-white dark:bg-slate-600"
            >
              <div>
                <span className="font-medium text-slate-900 dark:text-slate-100">{item.name}</span>
                <span className="ml-3 font-medium text-slate-900 dark:text-slate-100">${item.price}</span>
              </div>
              <button
                onClick={() => dispatch(removeWorkOrder(item.id))}
                className="p-2 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-300 transition"
                aria-label={`Remove ${item.name}`}
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
          Please select a service from the Services page to add to your work order.
        </p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full mt-10 mx-auto rounded-2xl overflow-hidden shadow-md bg-white dark:bg-slate-600 flex flex-col"
      >
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-4 border-b border-slate-300 dark:border-slate-800 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-4 border-b border-slate-300 dark:border-slate-800 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-rose-300 text-white font-medium hover:bg-rose-400 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
