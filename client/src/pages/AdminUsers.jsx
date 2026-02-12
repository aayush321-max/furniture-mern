








import { useEffect, useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("✅ AdminUsers useeffect run");

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ No token found");
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    fetch("https://furniture-mern-tsaf.onrender.com/api/auth/admin/user-login-stats", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`HTTP ${res.status}: ${msg}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("📦 USERS FROM API:", data);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ FETCH ERROR:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ padding: 40 }}>Loading users...</h2>;
  }

  if (error) {
    return (
      <div style={{ padding: 40, color: "red" }}>
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>All Users</h2>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Signup At</th>
              <th>Login Count</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {u.signupAt
                    ? new Date(u.signupAt).toLocaleString()
                    : "-"}
                </td>
                <td>{u.loginCount ?? 0}</td>
                <td>
                  {u.lastLoginAt
                    ? new Date(u.lastLoginAt).toLocaleString()
                    : "Never"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminUsers;












