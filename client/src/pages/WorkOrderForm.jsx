import { useSelector, useDispatch } from "react-redux";
import { clearWorkOrder } from "../store/workOrderSlice";
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
    <div className="p-4 md:p-8 lg:p-12 space-y-8">
      <h1 className="text-3xl font-bold text-center text-chatgpt-text-dark dark:text-slate-200">
        Submit Work Order
      </h1>

      {/* Selected Services */}
      {items.length === 0 ? (
        <p className="text-center text-slate-600 dark:text-slate-400">No services selected yet.</p>
      ) : (
        <ul className="space-y-4 max-w-lg mx-auto">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-4 rounded-2xl shadow-md bg-chatgpt-light dark:bg-slate-600"
            >
              <span className="font-medium text-slate-900 dark:text-slate-100">{item.name}</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">${item.price}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto rounded-2xl overflow-hidden shadow-md bg-chatgpt-light dark:bg-slate-600 flex flex-col"
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
          className="w-full px-4 py-3 bg-rose-300 dark:bg-rose-300 text-white hover:bg-rose-400 transition cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
