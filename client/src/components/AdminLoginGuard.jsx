import { Navigate } from "react-router-dom";

function AdminLoginGuard({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // agar admin already login hai → dashboard
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // warna login page allow
  return children;
}

export default AdminLoginGuard;