import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
// Create context
const CartContext = createContext(null);

// Provider component wraps your app and provides auth info/state
export function CartProvider({ children }) {
  const [cartAdded, setcartAdded] = useState(false);
  const [cart, setCart] = useState([]);

useEffect(()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  if(user)
    getCart(user.id)

})

  const showToast = (msg) => {
        toast.success(msg, {
          position: "top-right",
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
  
  const addToCart = async (cart)=>{
    try {
      
      const response = await axios.post(
        "http://localhost:8080/inventry/cart",
        cart
      );
      console.log(response);
      if (response.status === 201) {
        setcartAdded(true);
        showToast("Cart Success");
      } else {
        showToast("Cart Failed");
      }
      return response;
    } catch (error) {
      showToast("Error adding Cart");
      console.error(error);
      throw error; // allow caller to know of failure
    }
  }
  // Login function example (you can expand with real API calls)
  const getCart = async (userId)=>{
    axios
      .get("http://localhost:8080/inventry/cart?userId="+userId)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        setCart(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, getCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for easier consumption in components
export function useCart() {
  return useContext(CartContext);
}
