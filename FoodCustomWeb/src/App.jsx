import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
 
// USER PAGES
import Home from "./Components/pages/Home";
import Customize from "./Components/pages/Customize";
import Navigation from "./Components/Navigation";
import Builder from "./Components/pages/Builder";
import Cart from "./Components/pages/Cart";
import Order from "./Components/pages/Order";
import Register from "./Components/pages/Register";
import Login from "./Components/pages/Login";


/* =========================
   🔐 ROUTE PROTECTION
========================= */

// User protected route
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? children : <Navigate to="/" />;
};

// Admin protected route
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

export default function App() {
  const location = useLocation();

  /* =========================
     🛒 CART STATE
  ========================= */
  const [cartItems, setCartItems] = useState([]);
  const cartLength = cartItems.length;

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      {/* 🚫 Hide Navbar on Login/Register/Admin */}
      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        !location.pathname.startsWith("/admin") && (
          <Navigation cartLength={cartLength} />
        )}

      <Routes>
        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= USER ================= */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home addToCart={addToCart} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customize"
          element={
            <ProtectedRoute>
              <Customize />
            </ProtectedRoute>
          }
        />

        <Route
          path="/builder/:id"
          element={
            <ProtectedRoute>
              <Builder addToCart={addToCart} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
