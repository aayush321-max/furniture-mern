

import { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  // =========================
  // FETCH MY ORDERS
  // =========================
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://furniture-mern-tsaf.onrender.com/api/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error(error);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // =========================
  // CANCEL ORDER (USER)
  // =========================
  const cancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://furniture-mern-tsaf.onrender.com/api/orders/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to cancel order");
        return;
      }

      fetchOrders(); // ✅ refresh list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="myorders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p><b>Payment:</b> {order.paymentMethod}</p>
            <p><b>Status:</b> {order.status}</p>

            {/* ✅ Cancel only when allowed */}
            {order.status !== "Delivered" &&
              order.status !== "Cancelled" && (
                <button
                  className="cancel-btn"
                  onClick={() => cancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;





