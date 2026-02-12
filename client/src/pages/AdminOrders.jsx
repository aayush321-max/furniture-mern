

import { useEffect, useState } from "react";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // =========================
  // FETCH ALL ORDERS (ADMIN)
  // =========================
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("admin order data", data);

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
  // UPDATE STATUS (ADMIN)
  // =========================
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/orders/admin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update status");
        return;
      }

      fetchOrders(); // auto refresh
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-orders-container">
      <h2>Admin Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => {
        // 🔒 LOCK if cancelled by customer
        const isCustomerCancelled =
          order.status === "Cancelled" &&
          order.cancelledBy === "customer";

        return (
          <div key={order._id} className="order-card">
            <p><b>Order ID:</b> {order._id}</p>

            {/* ✅ CUSTOMER DETAILS */}
            <p><b>Customer:</b> {order.customer?.fullName}</p>
            <p><b>Phone:</b> {order.customer?.phone}</p>
            <p><b>Email:</b> {order.customer?.email}</p>

            <p>
              <b>Address:</b>{" "}
              {order.customer?.address?.house},{" "}
              {order.customer?.address?.street},{" "}
              {order.customer?.address?.city},{" "}
              {order.customer?.address?.state} -{" "}
              {order.customer?.address?.pincode}
            </p>

            <p><b>Total:</b> ₹{order.totalAmount}</p>

            {/* ✅ STATUS WITH OLD COLORS */}
            <p>
              <b>Status:</b>{" "}
              <span
                className={
                  order.status === "Delivered"
                    ? "status-delivered"
                    : order.status === "Shipped"
                    ? "status-shipped"
                    : order.status === "Processing"
                    ? "status-processing"
                    : "status-cancelled"
                }
              >
                {order.status}
              </span>
            </p>

            {/* ✅ NOTE IF CUSTOMER CANCELLED */}
            {isCustomerCancelled && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                ❌ Cancelled by Customer
              </p>
            )}

            {/* ✅ ADMIN BUTTONS (LOCKED IF CUSTOMER CANCELLED) */}
            <div className="admin-btn-group">
              <button
                className="processing-btn"
                disabled={isCustomerCancelled}
                onClick={() => updateStatus(order._id, "Processing")}
              >
                Processing
              </button>

              <button
                className="shipped-btn"
                disabled={isCustomerCancelled}
                onClick={() => updateStatus(order._id, "Shipped")}
              >
                Shipped
              </button>

              <button
                className="delivered-btn"
                disabled={isCustomerCancelled}
                onClick={() => updateStatus(order._id, "Delivered")}
              >
                Delivered
              </button>

              <button
                className="cancel-btn"
                disabled={isCustomerCancelled}
                onClick={() => updateStatus(order._id, "Cancelled")}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminOrders;