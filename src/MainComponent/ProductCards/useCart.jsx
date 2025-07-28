import { useState } from 'react';

export default function useCart(initialCart = [
  { id: 1, name: "Product A", quantity: 2, price: 12.99 },
  { id: 2, name: "Product B", quantity: 1, price: 5.49 },
  { id: 3, name: "Product C", quantity: 3, price: 8.50 },
]) {
  const [cart, setCart] = useState(initialCart);

  const addProduct = (product) => {
    console.log(product,"product")
    setCart(prevCart => {
      const idx = prevCart.findIndex(p => p.id === product.id);
      if (idx > -1) {
        // If product exists, increment quantity
        const updated = [...prevCart];
        updated[idx] = {
          ...updated[idx],
          quantity: (updated[idx].quantity || 1) + 1,
        };
        return updated;
      }
      // Otherwise add new product with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const getProducts = () => cart;

  const removeProduct = (id) => {
    setCart(prevCart => prevCart.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addProduct,
    getProducts,
    removeProduct,
    clearCart,
    setCart, // expose setter if needed
  };
}
