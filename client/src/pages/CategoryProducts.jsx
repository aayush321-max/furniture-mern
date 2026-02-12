

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import categoryProducts from "../data/categoryProducts";

const allCategoryData = categoryProducts;

function CategoryProduct() {
  const { category, id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const list = allCategoryData[category];
  const product = list?.find((p) => String(p.id) === String(id));

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <p>Please go back and select a product again.</p>
      </div>
    );
  }

  return (
    <section style={{ padding: "40px", display: "flex", gap: "40px" }}>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "420px", borderRadius: "12px" }}
      />

      <div>
        <h2>{product.name}</h2>
        <p style={{ fontSize: "20px", fontWeight: "600" }}>
          {product.price}
        </p>
        <p>⭐ {product.rating}</p>

        <p style={{ marginTop: "16px" }}>{product.para}</p>

        <ul>
          {product.specs?.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>

        <p><b>Delivery:</b> {product.delivery}</p>

        {/* ADD TO CART */}
        <button
          onClick={() => {
            addToCart({
              ...product,
              images: [product.image],
              qty: 1,
            });

            // navigate("/cart");
          }}
          style={{ marginTop: "20px" }}
        >
          Add to Cart
        </button>

   
onClick={() => {
  const from = location.state?.fromCategory;
  if (from) {
    navigate("/products", {
      state: { openCategory: from }
    });
  } else {
    navigate("/products");
  }
}}
      </div>
    </section>
  );
}

export default CategoryProduct;