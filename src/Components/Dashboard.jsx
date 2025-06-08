import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaLock, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Today");
  const isLoggedIn = true;
  const BASE_URL = "https://cleanxcleaningbackend.onrender.com";

  const filterLabels = {
    Today: "Today",
    Last7: "Last 7 Days",
    LastMonth: "Last Month",
    All: "All",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/order/fetchorder`);
        const sortedData = response.data.sort(
          (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
        );
        setOrders(sortedData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const toggleStatus = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === id
          ? {
              ...order,
              status: order.status === "Fulfilled" ? "Pending" : "Fulfilled",
            }
          : order
      )
    );
  };

  const filterOrders = (orders) => {
    const now = new Date();

    switch (filter) {
      case "Today":
        return orders.filter((order) => {
          const orderDate = new Date(order.dateTime);
          return (
            orderDate.getDate() === now.getDate() &&
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getFullYear() === now.getFullYear()
          );
        });

      case "Last7": {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        return orders.filter(
          (order) => new Date(order.dateTime) >= sevenDaysAgo
        );
      }

      case "LastMonth": {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        return orders.filter((order) => new Date(order.dateTime) >= lastMonth);
      }

      default:
        return orders;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full"
        >
          <div className="flex justify-center mb-4">
            <FaLock className="text-blue-600 text-4xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Hey Admin,
          </h2>
          <p className="text-gray-600">Please login to see the dashboard.</p>
        </motion.div>
      </div>
    );
  }

  const filteredOrders = filterOrders(orders);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        🧼 Admin Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 overflow-x-auto">
        <div className="flex flex-wrap gap-4 justify-end mb-6">
          {Object.keys(filterLabels).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-md text-white ${
                filter === f ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>

        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-blue-100 text-gray-800">
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Date & Time</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border">#{order.orderId}</td>
                <td className="px-4 py-2 border">{order.fullName}</td>
                <td className="px-4 py-2 border">{order.email}</td>
                <td className="px-4 py-2 border">{order.phone}</td>
                <td className="px-4 py-2 border">
                  {new Date(order.dateTime).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-4 py-2 border">
                  {order.street}, {order.city}, {order.state} - {order.zip}
                </td>
                <td
                  className="px-4 py-2 border cursor-pointer"
                  onClick={() => toggleStatus(order.orderId)}
                >
                  {order.status === "Fulfilled" ? (
                    <span className="flex items-center text-green-600">
                      <FaCheckCircle className="mr-1" /> Fulfilled
                    </span>
                  ) : (
                    <span className="flex items-center text-yellow-600">
                      <FaHourglassHalf className="mr-1" /> Pending
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
