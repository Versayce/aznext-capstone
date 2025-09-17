import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkOrders,
  deleteWorkOrder,
  deleteWorkOrderItem,
} from "../store/workOrderSlice";
import { Trash2 } from "lucide-react";

export default function AdminWorkOrders() {
  const dispatch = useDispatch();
  const { workOrders, loading, error } = useSelector(
    (state) => state.workOrders
  ); // correct slice

  useEffect(() => {
    dispatch(fetchWorkOrders());
  }, [dispatch]);

  const handleRemoveItem = (workOrderId, itemId) => {
    dispatch(deleteWorkOrderItem({ workOrderId, itemId }));
  };

  const handleDeleteOrder = (workOrderId) => {
    dispatch(deleteWorkOrder(workOrderId));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!workOrders || workOrders.length === 0)
    return <p className="text-center mt-10">No work orders found.</p>;

  return (
    <div className="bg-gray-50 dark:bg-slate-650 px-4 md:px-8 lg:px-12 py-10">
      <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-10">
        Work Orders
      </h1>

      <ul className="space-y-6 max-w-3xl mx-auto">
        {workOrders.map((wo) => (
          <li
            key={wo.id}
            className="flex flex-col p-4 rounded-2xl shadow-md bg-white dark:bg-slate-600"
          >
            {/* Customer name + status */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {wo.customerName}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-300">
                Status: {wo.status}
              </span>
            </div>

            {/* Email */}
            {wo.customerEmail && (
              <div className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                Email: {wo.customerEmail}
              </div>
            )}

            {/* Comments */}
            {wo.comments && (
              <div className="mb-3 p-3 rounded-md bg-slate-100 dark:bg-slate-550 text-slate-700 dark:text-slate-200 text-sm italic">
                “{wo.comments}”
              </div>
            )}

            {/* Items list */}
            <ul className="space-y-2">
              {wo.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-2 rounded-sm bg-slate-100 dark:bg-slate-550"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {item.service.name}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-slate-900 dark:text-slate-300">
                      ${item.service.price}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(wo.id, item.id)}
                      className="p-1 rounded-lg text-rose-400 hover:text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-300 transition cursor-pointer"
                      aria-label={`Remove ${item.service.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total */}
            <div className="text-right mt-3 font-semibold text-slate-800 dark:text-slate-200">
              {`Total: $${wo.items.reduce(
                (sum, item) => sum + item.service.price,
                0
              )}`}
            </div>

            {/* Delete button */}
            <button
              onClick={() => handleDeleteOrder(wo.id)}
              className="mt-3 w-full py-2 bg-rose-300 text-white font-medium hover:bg-rose-500 transition rounded-lg"
            >
              Delete Work Order
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
