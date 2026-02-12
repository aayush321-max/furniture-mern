















import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ item }) {
  // SAFE images array
  const images = item.images?.length
    ? item.images
    : item.image
    ? [item.image]
    : [];

  const [imgIndex, setImgIndex] = useState(0);

  const next = (e) => {
    e.stopPropagation();
    if (images.length === 0) return;

    setImgIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prev = (e) => {
    e.stopPropagation();
    if (images.length === 0) return;

    setImgIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="product-card">
      <div style={{ position: "relative" }}>
        <img
          src={images[imgIndex]}
          alt={item.name}
        />

        {images.length > 1 && (
          <>
            <button onClick={prev} className="arrow left">❮</button>
            <button onClick={next} className="arrow right">❯</button>
          </>
        )}
      </div>

      <h3>{item.name}</h3>
      <p>{item.price}</p>

      <Link to={`/product/${item.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;
























