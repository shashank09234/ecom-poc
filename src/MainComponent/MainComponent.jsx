import React from 'react'
import ProductCards from './ProductCards/ProductCards'
import AppBar from '@mui/material/AppBar'
import AddProduct from './AddProduct';
import useProduct from './useProduct';
import Categories from './Category/Categories';

const MainComponent = ({topBarWidth,addProduct,menu}) => {
    const { product: products, addProduct:addProducts } = useProduct();
  return (
    <main
      style={{
        marginLeft: topBarWidth,           // Sidebar width offset
        marginTop: '64px',                 // Height of fixed TopBar
        padding: '24px',                   // Optional padding
        width: `calc(100% - ${topBarWidth}px)`, // Remaining width after sidebar
        height: `calc(100vh - 64px)`,     // Viewport height minus TopBar height
        boxSizing: 'border-box',
        backgroundColor: '#f9fafb',        // Optional background color
        overflowY: 'auto',                 // Scroll vertically if content overflows
         msOverflowStyle: 'none', // IE and Edge
    scrollbarWidth: 'none'
      }}
    >
        {console.log(menu)}
        {menu==="Category" &&<Categories/>}
      {menu==="Products" &&<ProductCards addToCart ={addProduct } products={products}/>}
      {menu==="Add Product" &&<AddProduct addProduct={addProducts}/>}
      {menu === "Home" && <div>Welcome Home!</div>}
      {menu === "Orders" && <div>Order List coming soon.</div>}
    </main>
  );
}

export default MainComponent
