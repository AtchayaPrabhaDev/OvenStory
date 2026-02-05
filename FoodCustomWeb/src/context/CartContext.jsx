import React, { createContext, useContext, useState } from "react";

// 1️⃣ Context create
const CartContext = createContext();

// 2️⃣ Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => setCartItems((prev) => [...prev, item]);
  const removeFromCart = (index) => setCartItems((prev) => prev.filter((_, i) => i !== index));
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 3️⃣ Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

// 4️⃣ Dummy component to satisfy Vite fast refresh
// ❌ This is the key fix to remove useCart error in Vite
export const CartContextDummyComponent = () => null;
