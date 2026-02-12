









import "./Auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);


const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("https://furniture-mern-tsaf.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        role,
      }),
    });

    const data = await res.json();

    // ❗ IMPORTANT SAFETY CHECK
    if (!res.ok || !data.user) {
      alert(data.message || "Login failed");
      setLoading(false);
      return;
    }

    // ✅ SAFE STORAGE
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ SAFE ROLE CHECK
    if (data.user.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/");
    }
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};






  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Login to your FurniLux account</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {!loading ? (
            <button type="submit">Login</button>
          ) : (
            <div className="login-loader"></div>
          )}
        </form>
   <p className="forgot-password">
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
        <span>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;