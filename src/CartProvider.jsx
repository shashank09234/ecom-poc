import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const showToast = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const addToCart = async (cartItem) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/inventry/cart",
        cartItem
      );
      if (response.status === 201) {
        showToast("Cart Success");
      } else {
        showToast("Cart Failed");
      }
      return response;
    } catch (error) {
      showToast("Error adding Cart");
      console.error(error);
      throw error;
    }
  };

  const getCart = async (userId) => {
    if (!userId) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/inventry/cart?userId=${userId}`
      );
      if (response.status === 200) {
        setCart(response.data);
      } else {
        throw new Error("Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Optional: auto-fetch cart on app load if user exists
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      getCart(user.id);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, getCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
