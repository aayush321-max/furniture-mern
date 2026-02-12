import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <section className="success">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>
          Thank you for shopping with <b>FurniLux</b>.
        </p>
        <p>
          Your order has been confirmed and will be delivered soon.
        </p>

        <Link to="/products">
          <button>Continue Shopping</button>
        </Link>
      </div>
    </section>
  );
}

export default OrderSuccess;
