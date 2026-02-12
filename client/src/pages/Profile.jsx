

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token"); // ✅ TOKEN
  const navigate = useNavigate();

  const [name, setName] = useState(storedUser?.name || "");
  const [phone, setPhone] = useState(storedUser?.phone || "");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);

  // Safety check
  if (!storedUser || !token) {
    return <h2>Please login again</h2>;
  }

  // ===== UPDATE PROFILE =====
  const updateProfile = async () => {
    if (!password) {
      alert("Enter current password");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
          body: JSON.stringify({
            name,
            phone,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Profile updated");
        localStorage.setItem("user", JSON.stringify(data.user));
        setEditing(false);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div className="profile">
      <h2>My Profile</h2>

      <div className="profile-card">
        {!editing ? (
          <>
            <p><b>Name:</b> {storedUser.name}</p>
            <p><b>Email:</b> {storedUser.email}</p>
            <p><b>Phone:</b> {storedUser.phone}</p>

            <button onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
            />

            <input
              type="password"
              placeholder="Current Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={updateProfile}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        )}
      </div>

      {/* ===== MY ORDERS BUTTON ONLY ===== */}
      <button
        onClick={() => navigate("/my-orders")}
        style={{
          marginTop: "20px",
          padding: "12px 22px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        My Orders
      </button>
    </div>
  );
}

export default Profile;