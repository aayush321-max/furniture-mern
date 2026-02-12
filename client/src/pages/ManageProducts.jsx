import "./ManageProducts.css";
import { useEffect, useState } from "react";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);
  const deleteProduct = async (id) => {
  try {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    // list refresh
    setProducts(products.filter(p => p._id !== id));

  } catch (err) {
    console.log(err);
  }
};

  return (
  
    <div className="manage-products">
  <h2>Manage Products</h2>

  <div className="products-grid">
    {products.map(p => (
      <div key={p._id} className="product-card">
        <h4>{p.name}</h4>
        <p>₹{p.price}</p>

        <button
          className="delete-btn"
          onClick={() => deleteProduct(p._id)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
</div>
  );
}

export default ManageProducts;