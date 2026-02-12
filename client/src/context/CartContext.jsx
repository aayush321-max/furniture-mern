


import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const clearCart = () => {
    setCart([]);
  };

  // ✅ ADD TO CART (FIXED)
  const addToCart = (product) => {
    setCart((prev) => {
      // 🔑 unique cart id (important fix)
      const cartId = product.cartId || `${product.id}-${product.name}`;

      const existing = prev.find((item) => item.cartId === cartId);

      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cartId, // 👈 saved once
          qty: 1,
        },
      ];
    });
  };

  // REMOVE ONE
  const removeFromCart = (cartId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartId === cartId
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // UPDATE QTY
  const updateQty = (cartId, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, qty } : item
      )
    );
  };

  // PERSIST CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;