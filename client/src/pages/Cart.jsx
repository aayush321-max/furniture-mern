

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);

  // ---------------- STATES ----------------
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // ---------------- FETCH COUPONS ----------------
  useEffect(() => {
    fetch("http://localhost:5000/api/coupons")
      .then((res) => res.json())
      .then((data) => setCoupons(data))
      .catch((err) => console.error(err));
  }, []);

  // ---------------- SUBTOTAL ----------------
  const subtotal = cart.reduce((total, item) => {
    const priceNumber = Number(
      item.price.replace("₹", "").replace(/,/g, "")
    );
    return total + priceNumber * item.qty;
  }, 0);

  // ---------------- APPLY COUPON ----------------
  const applyCoupon = () => {
    const found = coupons.find(
      (c) => c.code === couponCode
    );

    if (!found) {
      alert("Invalid coupon");
      setDiscount(0);
      return;
    }

    if (subtotal < found.minOrderValue) {
      alert(`Minimum order ₹${found.minOrderValue}`);
      setDiscount(0);
      return;
    }

    setDiscount(found.discountAmount);
    alert(`₹${found.discountAmount} coupon applied`);
  };

  // ---------------- BILL CALCULATION ----------------
  const taxableAmount = subtotal - discount;
  const cgst = Math.round(taxableAmount * 0.09);
  const sgst = Math.round(taxableAmount * 0.09);
  const platformFee = cart.length > 0 ? 99 : 0;
  const totalPayable =
    taxableAmount + cgst + sgst + platformFee;

  return (
    <section className="cart">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.cartId}>
              <img
                src={item.images?.[0] || item.image}
                alt={item.name}
              />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>{item.price}</p>

                <div className="qty-controls">
                  <button
                    onClick={() =>
                      removeFromCart(item.cartId)
                    }
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* ---------------- BILL UI ---------------- */}
          <h3 className="cart-total">
            Subtotal: ₹{subtotal.toLocaleString()}
          </h3>

          {/* AVAILABLE COUPONS */}
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <b>Available Coupons</b>
            </p>

            <ul
              style={{
                fontSize: "14px",
                marginLeft: "18px",
              }}
            >
             
              {coupons.map((c) => {
  const isApplied = couponCode === c.code && discount > 0;

  return (
    <li
      key={c._id}
      onClick={() => {
        if (subtotal < c.minOrderValue) {
          alert(`Minimum order ₹${c.minOrderValue}`);
          return;
        }

        setCouponCode(c.code);
        setDiscount(c.discountAmount);
        alert(`₹${c.discountAmount} coupon applied`);
      }}
      style={{
        cursor: "pointer",
        padding: "6px",
        borderRadius: "4px",
        backgroundColor: isApplied ? "#d4edda" : "transparent",
        color: isApplied ? "green" : "black",
        fontWeight: isApplied ? "600" : "normal"
      }}
    >
      <b>{c.code}</b> – Get ₹{c.discountAmount} off above ₹{c.minOrderValue}

      {isApplied && (
        <span style={{ marginLeft: "10px", fontSize: "13px" }}>
          ✅ Applied
        </span>
      )}
    </li>
  );
})}
            </ul>
          </div>

          {/* COUPON INPUT */}
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) =>
                setCouponCode(
                  e.target.value.toUpperCase()
                )
              }
              style={{
                padding: "6px",
                marginRight: "8px",
              }}
            />
            <button onClick={applyCoupon}>
              Apply
            </button>
          </div>

          {/* DISCOUNT */}
          {discount > 0 && (
            <p style={{ color: "green" }}>
              Discount: -₹
              {discount.toLocaleString()}
            </p>
          )}

          {/* TAXES */}
          <p>
            CGST (9%): ₹{cgst.toLocaleString()}
          </p>
          <p>
            SGST (9%): ₹{sgst.toLocaleString()}
          </p>
          <p>
            Platform Fee: ₹{platformFee}
          </p>

          <hr />

          <h3>
            Total Payable: ₹
            {totalPayable.toLocaleString()}
          </h3>

          {/* ACTION BUTTONS */}
          <div className="empty-cart-btn-grp">
            <button
              className="empty-cart-btn"
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    couponCode,
                    discount,
                    finalTotal: totalPayable,
                  },
                })
              }
            >
              Proceed to Checkout
            </button>

            <button
              className="empty-cart-btn"
              onClick={() => {
                const confirmDelete =
                  window.confirm(
                    "Are you sure you want to empty the cart?"
                  );
                if (confirmDelete)
                  clearCart();
              }}
            >
              Empty Cart
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;