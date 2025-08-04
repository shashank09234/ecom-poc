import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Navbar/SideBar/SideBar";
import TopBar from "./TopBar/TopBar";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { CartProvider } from "./CartProvider";

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(0);
  return (
    <BrowserRouter>
      <Sidebar setValue={setSidebarWidth} />
      <CartProvider>
      <TopBar topBarWidth={sidebarWidth} />

      <main
        style={{
          marginLeft: sidebarWidth,
          marginTop: "64px", // height of TopBar
          padding: 24,
          width: `calc(100% - ${sidebarWidth}px)`,
          height: `calc(100vh - 64px)`,
          boxSizing: "border-box",
          overflowY: "auto",
          backgroundColor: "#f9fafb",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <AppRoutes topBarWidth={sidebarWidth} />
      </main>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
