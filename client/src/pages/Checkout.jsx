

import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { State, City } from "country-state-city";
import { useNavigate, useLocation } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ MUST be before using location

  const { cart, clearCart } = useContext(CartContext);

  // ✅ SAFE state receive from Cart
  const stateData = location.state || {};
  const finalTotal = stateData.finalTotal || null;
  const couponCode = stateData.couponCode || null;
  // const discount = stateData.discount || 0;

  const indianStates = State.getStatesOfCountry("IN");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    house: "",
    street: "",
    state: "",
    stateCode: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const stateObj = indianStates.find(
      (state) => state.isoCode === stateCode
    );

    setAddress({
      ...address,
      state: stateObj?.name || "",
      stateCode,
      city: "",
    });
  };

  const cities = address.stateCode
    ? City.getCitiesOfState("IN", address.stateCode)
    : [];

  // ✅ Fallback subtotal (if user direct checkout open kare)
  const subtotal = cart.reduce((total, item) => {
    const priceNumber = Number(
      item.price.replace("₹", "").replace(/,/g, "")
    );
    return total + priceNumber * item.qty;
  }, 0);

  const displayTotal = finalTotal || subtotal;

  // ================= PLACE ORDER =================
  const placeOrder = async () => {
    const {
      fullName,
      phone,
      email,
      house,
      street,
      state,
      city,
      pincode,
    } = address;

    if (!/^[A-Za-z ]+$/.test(fullName)) return alert("Enter valid full name");
    if (!/^[0-9]{10}$/.test(phone)) return alert("Enter valid phone number");
    if (!/^\S+@\S+\.\S+$/.test(email)) return alert("Enter valid email");
    if (house.length < 3 || street.length < 3)
      return alert("Enter valid address");
    if (!state || !city) return alert("Select state & city");
    if (!/^[0-9]{6}$/.test(pincode))
      return alert("Enter valid pincode");
    if (!paymentMethod) return alert("Select payment method");
    if (cart.length === 0) return alert("Cart is empty");

    const orderData = {
      customer: {
        fullName,
        phone,
        email,
        address: { house, street, city, state, pincode },
      },
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: Number(item.price.replace("₹", "").replace(/,/g, "")),
        qty: item.qty,
      })),
      couponCode,
      paymentMethod,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    const saveOrder = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Order failed");
          return;
        }

        clearCart();
        navigate("/order-success");
      } catch (err) {
        console.error(err);
        alert("Server error");
      }
    };

    // ✅ FAKE ONLINE PAYMENT FLOW
    if (paymentMethod === "ONLINE") {
      alert("Redirecting to payment gateway...");
      setTimeout(() => {
        alert("✅ Payment Successful");
        saveOrder();
      }, 1500);
    } else {
      saveOrder();
    }
  };

  return (
    <section className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-container">
        <div className="checkout-form">
          <h3>Delivery Address</h3>

          <div className="form-row">
            <input name="fullName" placeholder="Full Name" onChange={handleChange} />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} />
          </div>

          <input name="email" placeholder="Email Address" onChange={handleChange} />
          <input name="house" placeholder="House / Flat" onChange={handleChange} />
          <input name="street" placeholder="Street / Area" onChange={handleChange} />

          <select onChange={handleStateChange}>
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>

          <select name="city" onChange={handleChange}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>

          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.name} × {item.qty}</span>
              <span>{item.price}</span>
            </div>
          ))}

          <hr />

          {/* ✅ Correct Final Total */}
          <h4>Total Amount: ₹{displayTotal.toLocaleString()}</h4>

          <div style={{ marginTop: "20px" }}>
            <label>
              <input
                type="radio"
                name="payment"
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="payment"
                onChange={() => setPaymentMethod("ONLINE")}
              />
              Online Payment
            </label>
          </div>

          <button onClick={placeOrder} style={{ marginTop: "20px" }}>
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}

export default Checkout;