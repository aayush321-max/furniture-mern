







import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { allSearchProducts } from "../data/searchData";
import { useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const location = useLocation();

  // ✅ USER (safe parse)
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  // ✅ ADMIN CHECK (single source of truth)
  const isAdmin = user?.role === "admin";

  const [search, setSearch] = useState("");

  const totalItems = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.qty || 0), 0)
    : 0;

  // ✅ LOGOUT (common)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("isAdmin");

    clearCart();
    navigate("/login", { replace: true });
    window.location.reload();
  };

  // ✅ SEARCH (users only)
  const handleSearchSubmit = (e) => {
    if (e.key !== "Enter") return;

    const q = search.toLowerCase().trim();
    if (!q) return;

    const results = allSearchProducts.filter((p) =>
      p.name.toLowerCase().includes(q)
    );

    navigate("/products", {
      state: { searchResults: results },
    });

    setSearch("");
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate("/")}>
        FurniLux
      </h2>

      <div className="nav-links">
        {/* ================= ADMIN NAVBAR ================= */}
        {isAdmin ? (
          <>
            <Link to="/products">Products</Link>


            <Link
  to="/admin/dashboard"
  className={`nav-link ${
    location.pathname.startsWith("/admin/dashboard") ? "active" : ""
  }`}
>
  Dashboard
</Link>
            {/* <Link to="/admin/dashboard">Dashboard</Link> */}

            <span className="username">Hi, Admin</span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          /* ================= USER / GUEST NAVBAR ================= */
          <>
           <Link
  to="/"
  className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
>
  Home
</Link>
          


<Link
  to="/products"
  className={`nav-link ${
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/category")
      ? "active"
      : ""
  }`}
>
  Products
</Link>
<Link
  to="/about"
  className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
>
  About
</Link>
<Link
  to="/contact"
  className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
>
  Contact
</Link>
           
<Link
  to="/cart"
  className={`cart-link ${location.pathname === "/cart" ? "active" : ""}`}
>
  Cart
  {user && totalItems > 0 && (
    <span className="cart-badge">{totalItems}</span>
  )}
</Link>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="navbar-search"/>
         

            {!user ? (
              <Link to="/login">Login</Link>
            ) : (
              <>
              
<Link
  to="/profile"
  className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
>
  Profile
</Link>


                <span className="username">Hi, {user.name}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;