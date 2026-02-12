
import "./PreviewProducts.css";
import { useNavigate } from "react-router-dom";

import previewProductsData from "../data/previewProductsData";
const products = previewProductsData;
function PreviewProducts() {
  const navigate = useNavigate();
  return (
    <section className="preview-page">
      <h2>Explore Our Collection</h2>
      {products.map((p) => (
        <div
          key={p.id}
          className="preview-row"
          onClick={() => navigate(`/preview/${p.id}`)}
        >
          <img src={p.images?.[0]|| p.image} alt={p.name} />
          <div className="preview-info">
            <h3>{p.name}</h3>
            <p className="price">{p.price}</p>
            <p className="rating">⭐ {p.rating}</p>
            <p className="desc">{p.desc}</p>
          </div>
        </div>
      ))}
      <div style={{ textAlign: "center", margin: "60px 0" }}>
  <button
    className="secondary-btn"
    onClick={() => navigate("/products")}
            
  >
    Explore Collection
  </button>
</div>
    </section>
  );
}
export default PreviewProducts;

