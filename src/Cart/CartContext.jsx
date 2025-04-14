// CartContext.jsx
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
const CartContext = createContext();
import React from "react";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const isAlreadyInCart = cart.some((cartItem) => cartItem._id === item._id);
    if (isAlreadyInCart) {
      toast.warning("Item is already in the cart! 🛒", {
        position: "top-right",
        autoClose: 2000,
      });
      console.log("Already in the Cart...");
      return;
    }
    setCart((prev) => {
      const updated = [...prev, item];
      console.log("Cart:", updated);
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
