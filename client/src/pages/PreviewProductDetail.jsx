




import "./PreviewProductDetail.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import previewProductsData from "../data/previewProductsData";
import { CartContext } from "../context/CartContext";
import { useEffect } from "react";

function PreviewProductDetail() {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = previewProductsData.find(
    (p) => p.id === Number(id)
  );
  const [index, setIndex] = useState(0);

const nextImage = () => {
  setIndex((prev) =>
    prev === product.images.length - 1 ? 0 : prev + 1
  );
};

const prevImage = () => {
  setIndex((prev) =>
    prev === 0 ? product.images.length - 1 : prev - 1
  );
};

  if (!product) {
    return <p style={{ padding: "40px" }}>Product not found</p>;
  }

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");

    // ❌ user not logged in
    if (!token) {
      localStorage.setItem(
        "pendingCartProduct",
        JSON.stringify({ ...product, qty: 1 })
      );

      localStorage.setItem(
        "redirectAfterLogin",
        `/preview-product/${product.id}`
      );

      navigate("/login");
      return;
    }

    // ✅ user logged in
    addToCart({ ...product, qty: 1 });
   
  };

  return (
    <section className="detail-page">
      <div className="detail-card">
        {/* <img src={product.image} alt={product.name} /> */}
        <div className="slider">
  <button className="arrow left" onClick={prevImage}>❮</button>

  <img
    src={product.images[index]}
    alt={product.name}
    className="detail-img"
  />

  <button className="arrow right" onClick={nextImage}>❯</button>
</div>

        <div className="detail-info">
          <h2>{product.name}</h2>

          <p className="price">{product.price}</p>

    

          <p className="rating">⭐ {product.rating}</p>


          <p className="para">{product.para}</p>

          <h4>Why You’ll Love It</h4>
          <ul>
            {product.points.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
          
          {/* ✅ SAME Add to Cart button */}
          <button
            className="detail-btn"
            onClick={handleAddToCart}
            style={{ marginBottom: "20px" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default PreviewProductDetail;










