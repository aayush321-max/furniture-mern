





import { useEffect, useState } from "react";

function SalesStats() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://furniture-mern-tsaf.onrender.com/api/orders/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Sales Stats</h2>

      <h3>Total Orders: {stats.totalOrders}</h3>

      <h3>Processing Orders: {stats.processingOrders}</h3>

      <h3>Shipped Orders: {stats.shippedOrders}</h3>

      <h3>Delivered Orders: {stats.deliveredOrders}</h3>

      <h3>Cancelled by Customer: {stats.cancelledByCustomer}</h3>

      <h3>Cancelled by Admin: {stats.cancelledByAdmin}</h3>

      <h3>Total Revenue: ₹{stats.totalRevenue}</h3>
    </div>
  );
}

export default SalesStats;