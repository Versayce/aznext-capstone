import { useSelector, useDispatch } from "react-redux";
import { createWorkOrder, removeWorkOrderItem } from "../store/workOrderSlice";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function WorkOrderForm() {
  const items = useSelector((state) => state.workOrders.items);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", comments: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Please add at least one service before submitting.");
      return;
    }

    dispatch(
      createWorkOrder({
        customerName: form.name,
        customerEmail: form.email,
        comments: form.comments,
        items: items.map((i) => ({
          id: i.id,
          quantity: i.quantity || 1,
        })),
      })
    )
      .unwrap()
      .then(() => {
        setForm({ name: "", email: "", comments: "" });
        alert("Work order submitted successfully!");
      })
      .catch((err) => {
        alert("Failed to submit work order: " + err);
      });
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price * (item.quantity || 1)),
    0
  );

  return (
    <div className="bg-gray-50 dark:bg-slate-650 px-4 md:px-8 lg:px-12 pt-40">
      <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-10">
        Submit a Work Order
      </h1>

      {items.length > 0 ? (
        <div className="max-w-lg mx-auto">
          <ul
            className="space-y-3 overflow-y-auto"
            style={{ maxHeight: "250px" }}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-3 rounded-sm shadow-md bg-white dark:bg-slate-600"
              >
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {item.name}
                </span>

                <div className="flex items-center space-x-3">
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => dispatch(removeWorkOrderItem(item.id))}
                    className="p-2 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-300 transition cursor-pointer"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right font-semibold text-slate-900 dark:text-slate-100 mt-4">
            Total: ${totalPrice.toFixed(2)}
          </div>
        </div>
      ) : (
        <p className="text-center text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
          Please select a service or services from the Services page to add to
          your work order. Please keep in mind that our hourly labor rate is
          $120 per hour.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full mt-10 mx-auto rounded-2xl overflow-hidden shadow-md bg-white dark:bg-slate-600 flex flex-col space-y-4 p-6"
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-4 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none rounded-lg"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-4 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none rounded-lg"
          required
        />

        <textarea
          placeholder="Comments"
          value={form.comments}
          onChange={(e) => setForm({ ...form, comments: e.target.value })}
          className="w-full p-4 border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none rounded-lg resize-none"
          rows="4"
        />

        <button
          type="submit"
          className="w-full py-3 bg-rose-300 text-white font-medium hover:bg-rose-400 transition cursor-pointer rounded-lg"
        >
          Submit
        </button>
      </form>

      <p className="text-center text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-6">
        Once submitted, our team will review your work order and contact you to confirm details
        and schedule an appointment.
      </p>
    </div>
  );
}
