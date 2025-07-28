import logo from './logo.svg';
import './App.css';
import Sidebar from './Navbar/SideBar/SideBar';
import TopBar from './TopBar/TopBar';
import { createContext, useEffect,useMemo,useRef,useState } from 'react';
import MainComponent from './MainComponent/MainComponent';
import useCart from './MainComponent/ProductCards/useCart';

function App() {
  // const sidebarRef = useRef([]);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const { cart, addProduct } = useCart([]);
  const [selectedMenu, setSelectedMenu] = useState("Category");
  return (
    <>
      <Sidebar  setValue = {setSidebarWidth} selectedMenu = {setSelectedMenu} />
      <TopBar topBarWidth={sidebarWidth} cart={cart}/>
      <MainComponent topBarWidth = {sidebarWidth} 
      addProduct={addProduct}
      menu={selectedMenu}
      />
      </>
  );
}

export default App;
