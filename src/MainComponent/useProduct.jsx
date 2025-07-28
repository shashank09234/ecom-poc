import { useState } from 'react';

export default function useProduct(initialProduct = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 59.99,
    quantity: 17,
    image: "https://via.placeholder.com/180x120?text=Headphones"
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 35.5,
    quantity: 8,
    image: "https://via.placeholder.com/180x120?text=Speaker"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 129.0,
    quantity: 21,
    image: "https://via.placeholder.com/180x120?text=Watch"
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 59.99,
    quantity: 17,
    image: "https://via.placeholder.com/180x120?text=Headphones"
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 35.5,
    quantity: 8,
    image: "https://via.placeholder.com/180x120?text=Speaker"
  },
  {
    id: 6,
    name: "Smart Watch",
    price: 129.0,
    quantity: 21,
    image: "https://via.placeholder.com/180x120?text=Watch"
  },
  {
    id: 7,
    name: "Wireless Headphones",
    price: 59.99,
    quantity: 17,
    image: "https://via.placeholder.com/180x120?text=Headphones"
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    price: 35.5,
    quantity: 8,
    image: "https://via.placeholder.com/180x120?text=Speaker"
  },
  {
    id: 9,
    name: "Smart Watch",
    price: 129.0,
    quantity: 21,
    image: "https://via.placeholder.com/180x120?text=Watch"
  },
  {
    id: 10,
    name: "Wireless Headphones",
    price: 59.99,
    quantity: 17,
    image: "https://via.placeholder.com/180x120?text=Headphones"
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    price: 35.5,
    quantity: 8,
    image: "https://via.placeholder.com/180x120?text=Speaker"
  },
  {
    id: 12,
    name: "Smart Watch",
    price: 129.0,
    quantity: 21,
    image: "https://via.placeholder.com/180x120?text=Watch"
  },
  {
    id: 13,
    name: "Wireless Headphones",
    price: 59.99,
    quantity: 17,
    image: "https://via.placeholder.com/180x120?text=Headphones"
  },
  {
    id: 14,
    name: "Bluetooth Speaker",
    price: 35.5,
    quantity: 8,
    image: "https://via.placeholder.com/180x120?text=Speaker"
  },
  {
    id: 15,
    name: "Smart Watch",
    price: 129.0,
    quantity: 21,
    image: "https://via.placeholder.com/180x120?text=Watch"
  }
  // add more products as desired
]) {
  const [product, setProduct] = useState(initialProduct);

  const getMaxId = () => {
    if (product.length === 0) return 0;
    return Math.max(...product.map(p => p.id));
  };

  /**
   * Add a new product to the product list,
   * automatically assigns id = max current id + 1
   * @param {Object} newProductWithoutId - product data without id
   */
  const addProduct = (newProductWithoutId) => {
    setProduct(prevProduct => {
      const maxId = prevProduct.length > 0 ? Math.max(...prevProduct.map(p => p.id)) : 0;
      const newProduct = {
        ...newProductWithoutId,
        id: maxId + 1,
      };

      return [...prevProduct, newProduct];
    });
  };

  const getProducts = () => product;

  const removeProduct = (id) => {
    setProduct(prevProduct => prevProduct.filter(p => p.id !== id));
  };

  const clearProduct = () => {
    setProduct([]);
  };

  return {
    product,
    addProduct,
    getProducts,
    removeProduct,
    clearProduct,
    setProduct,
  };
}
