import { useContext } from "react";
import { CartContext } from "../context/CartContext.js";

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};