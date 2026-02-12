
import "./Auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= SEND OTP =================
  const sendOtp = async () => {
    if (!phone) {
      alert("Please enter registered mobile number");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ emailOrPhone: phone }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setOtpSent(true);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };
  // ================= RESET PASSWORD =================
  const resetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emailOrPhone:phone,
            otp,
            newPassword, // backend expects "password"
          }),
        }
      );
      const data = await res.json(); 
      if (res.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message || "Reset failed");
      }
    } catch {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        {!otpSent ? (
          <>
            <input
              type="text"
              placeholder="Registered Email or Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {!loading ? (
              <button onClick={sendOtp}>Send OTP</button>
            ) : (
              <div className="login-loader"></div>
            )}
          </>
        ) : (
          <>
            <input
            type="text"
              placeholder="Enter OTP"
              value={otp}
              maxLength={6}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => {
                const value=e.target.value.replace(/\D/g,"");
              setOtp(value);}}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!loading ? (
              <button onClick={resetPassword}>Reset Password</button>
            ) : (
              <div className="login-loader"></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default ForgotPassword;