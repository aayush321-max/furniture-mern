










import "./Products.css";
import { useNavigate, useLocation } from "react-router-dom";
import {  useState, useContext, useLayoutEffect } from "react";
import CategorySection from "../components/CategorySection";
import { CartContext } from "../context/CartContext";
import categoryProducts from "../data/categoryProducts";
import ProductCard from "../components/ProductCard";

import bed1 from "../assets/images/bed1.png";
import bed2 from "../assets/images/bed2.png";
import bed3 from "../assets/images/bed3.png";
import sofa1 from "../assets/images/sofa1.jpg";
import sofa2 from "../assets/images/sofa2.jpg";
import sofa3 from "../assets/images/sofa3.jpg";
import sofa4 from "../assets/images/sofa4.jpg";
import chair1 from "../assets/images/chair1.jpg";
import chair2 from "../assets/images/chair2.jpg";
import chair3 from "../assets/images/chair3.jpg";
import table1 from "../assets/images/table1.jpg";
import table2 from "../assets/images/table2.jpg";
import table3 from "../assets/images/table3.jpg";
import door1 from "../assets/images/door1.jpg";
import door2 from "../assets/images/door2.jpg";
import door3 from "../assets/images/door3.jpg";
import mirror1 from "../assets/images/mirror1.jpg";
import mirror2 from "../assets/images/mirror2.jpg";
import mirror3 from "../assets/images/mirror3.jpg";

const products = [
  { id: 1, name: "Luxury Bed", price: "₹45,000", images: [bed1, bed2, bed3] },
  { id: 2, name: "Modern Sofa", price: "₹38,000", images: [sofa1, sofa2, sofa3, sofa4] },
  { id: 3, name: "Wooden Chair", price: "₹12,000", images: [chair1, chair2, chair3] },
  { id: 4, name: "Dining Table", price: "₹28,000", images: [table1, table2, table3] },
  { id: 5, name: "Designer Door", price: "₹22,000", images: [door1, door2, door3] },
  { id: 6, name: "Dressing Mirror", price: "₹15,000", images: [mirror1, mirror2, mirror3] },
];

function Products() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [activeCategory, setActiveCategory] = useState(null);
  const location = useLocation();

  const searchResults = location.state?.searchResults;
  const displayProducts =
    searchResults && searchResults.length > 0 ? searchResults : products;

  useLayoutEffect(() => {
    if (location.state?.fromDetail) {
      const cat = location.state.openCategory;
      const index = location.state.productIndex ?? 0;

      setActiveCategory(cat);

      requestAnimationFrame(() => {
        const section = document.getElementById(cat);
        if (!section) return;

        const cards = section.querySelectorAll("[data-product]");
        if (cards[index]) {
          cards[index].scrollIntoView({
            block: "center",
            behavior: "auto",
          });
        }
      });
    }
  }, [location.state]);

  return (
    <section className="products">
      <h2>Our Furniture Collection</h2>

      <div className="product-grid">
        {displayProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      <CategorySection
        onSelect={(cat) => {
          setActiveCategory((prev) => (prev === cat ? null : cat));
          sessionStorage.setItem("activeCategory", cat);
        }}
      />

      {/* CATEGORY PRODUCTS */}
      {activeCategory && categoryProducts[activeCategory] && (
        <section id={activeCategory} className="category-section">
          <h2>{activeCategory} Collection</h2>

          {categoryProducts[activeCategory].map((item, index) => (
            <div
              key={item.id}
              data-product
              id={`${activeCategory}-${item.id}`}
              className="category-product-card"
              onClick={() =>
                navigate(`/category/${activeCategory}/${item.id}`, {
                  state: {
                    fromCategory: activeCategory,
                    productIndex: index,
                  },
                })
              }
            >
              <img
                src={item.image}
                alt={item.name}
                className="category-product-img"
              />

              <div className="category-product-info">
                <h3>{item.name}</h3>
                <p>{item.price}</p>
                <p>⭐ {item.rating}</p>
                <p>{item.delivery}</p>

                <button
                  className="category-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const user = JSON.parse(localStorage.getItem("user"));

                    if (!user) {
                      navigate("/login");
                      return;
                    }

                    addToCart({ ...item, qty: 1 });
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
}

export default Products;



