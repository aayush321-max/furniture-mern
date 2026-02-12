import { useEffect, useState } from "react";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("https://furniture-mern-tsaf.onrender.com/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    await fetch(`https://furniture-mern-tsaf.onrender.com/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  return (
    <div>
      <h2>Manage Products</h2>

      {products.map(p => (
        <div key={p._id} style={{border:"1px solid gray", padding:"10px", margin:"10px"}}>
          <img src={p.image} width="80" alt="" />
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>

          <button onClick={() => deleteProduct(p._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;