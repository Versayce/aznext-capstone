import { useSelector } from "react-redux";

export default function Orders() {
  const items = useSelector((state) => state.workOrder.items);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Current Work Order</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">No services added yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between bg-white p-3 rounded-lg shadow"
            >
              <span>{item.name}</span>
              <span className="font-medium">${item.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
