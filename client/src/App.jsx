


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import PreviewProducts from "./pages/PreviewProducts.jsx";
import PreviewProductDetail from "./pages/PreviewProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Profile from "./pages/Profile.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

import CategoryProducts from "./pages/CategoryProducts.jsx";
import CategoryProductDetail from "./pages/CategoryProductDetail.jsx";
import MyOrders from "./pages/MyOrders.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import SalesStats from "./pages/SalesStats.jsx";

import UserProtectedRoute from "./components/UserProtectedRoute.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";

import CartProvider from "./context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import AdminLoginGuard from "./components/AdminLoginGuard.jsx";
// import AdminLayout from "./pages/AdminLayout.jsx";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-right" />

        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/preview-products" element={<PreviewProducts />} />
          <Route path="/preview/:id" element={<PreviewProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= USER PROTECTED ================= */}
          <Route
            path="/cart"
            element={
              <UserProtectedRoute>
                <Cart />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <UserProtectedRoute>
                <Checkout />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <UserProtectedRoute>
                <Profile />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <UserProtectedRoute>
                <MyOrders />
              </UserProtectedRoute>
            }
          />

          <Route path="/order-success" element={<OrderSuccess />} />

          {/* ================= CATEGORY ================= */}
          <Route path="/category/:category" element={<CategoryProducts />} />
          <Route
            path="/category/:category/:id"
            element={<CategoryProductDetail />}
          />

          {/* ================= ADMIN ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/login"
  element={
    <AdminLoginGuard>
      <AdminLogin />
    </AdminLoginGuard>
  }
/>
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <AdminOrders />
              </AdminProtectedRoute>
            }
          />
         <Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <AdminUsers />
    </AdminProtectedRoute>
  }
/>

          <Route
            path="/admin/products"
            element={
              <AdminProtectedRoute>
                <AdminProducts />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/admin/stats"
            element={
              <AdminProtectedRoute>
                <SalesStats />
              </AdminProtectedRoute>
            }
          />
         
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;



