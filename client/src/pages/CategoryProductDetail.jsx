
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import categoryProductsData from "../data/categoryProducts";
import "./Products.css";

function CategoryProductDetail() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const product = categoryProductsData[category]?.find(
    (p) => String(p.id) === String(id)
  );

  if (!product) {
    return <h2 className="detail-not-found">Product not found</h2>;
  }

  return (
    <section className="category-detail">
      <div className="category-detail-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="category-detail-info">
        <h2>{product.name}</h2>
        <p>{product.price}</p>
        <p>⭐ {product.rating}</p>
        <p>{product.para}</p>

        <ul>
          {product.specs.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <div className="detail-btn-grp">
          <button
            className="detail-btn"
            onClick={(e) => {
              e.stopPropagation();
              const user = JSON.parse(localStorage.getItem("user"));
              if (!user) {
                navigate("/login");
                return;
              }
              addToCart({ ...product, qty: 1 });
            }}
          >
            Add to Cart
          </button>

          <button
            className="detail-btn"
            onClick={() =>
              navigate("/products", {
                state: {
                  fromDetail: true,
                  openCategory: category,
                  productIndex: location.state?.productIndex ?? 0,
                },
              })
            }
          >
            Go Back
          </button>
        </div>
      </div>
    </section>
  );
}

export default CategoryProductDetail;