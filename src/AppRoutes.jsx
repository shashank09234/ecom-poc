// AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Categories from "./MainComponent/Category/Categories";
import CategoryDetail from "./MainComponent/Category/CategoryDetail";
// import other pages/components as needed

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:categoryCode" element={<CategoryDetail />} />
      <Route path="/products/:categoryCode" element={<CategoryDetail />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}
