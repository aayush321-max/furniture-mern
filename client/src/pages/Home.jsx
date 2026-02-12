

import "./Home.css";
import { useNavigate } from "react-router-dom";


function Home() {
  const navigate = useNavigate();

  // ✅ Shop Now — NO AUTH, direct preview
  const handleShopNow = () => {
    navigate("/preview-products");
  };

  return (
    <section className="home">
      <div className="home-overlay">
        <div className="home-content">
          <h1>
            Elevate Your <span>Living Space</span>
          </h1>

          <p>
            Discover premium furniture crafted for modern homes.
            Comfort, quality, and timeless design — all in one place.
          </p>

          <div className="home-buttons">
            <button className="primary-btn" onClick={handleShopNow}>
              Shop Now
            </button>

            {/* ✅ Explore Collection — Signup required */}
            <button
              className="secondary-btn"
              onClick={() => navigate("/products")}
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
