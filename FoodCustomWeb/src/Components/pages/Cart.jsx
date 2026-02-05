import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    alert("Order placed successfully!");
    clearCart();
    navigate("/order");
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="food-img" />
                <span className="cart-name">{item.name}</span>
                <span className="cart-price">₹{item.price}</span>
                <button onClick={() => removeFromCart(index)} className="remove-btn">
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3 className="total">Total Amount: ₹{totalAmount}</h3>

          <button onClick={clearCart} className="clear-btn">
            Clear Cart
          </button>
          <button onClick={handleCheckout} className="check-out">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

