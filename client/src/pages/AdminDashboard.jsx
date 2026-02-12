











import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-buttons">
        <button onClick={() => navigate("/admin/orders")}>
          Manage Orders
        </button>

        <button onClick={() => navigate("/admin/products")}>
          Manage Products
        </button>

        <button onClick={() => navigate("/admin/stats")}>
          Sales Stats
        </button>
        <button onClick={()=> navigate("/admin/users")}>Users</button>
      </div>
    </div>
  );
}

export default AdminDashboard;