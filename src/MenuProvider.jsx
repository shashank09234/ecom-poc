import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
// Create context
const MenuContext = createContext(null);

// Provider component wraps your app and provides auth info/state
export function MenuProvider({ children }) {
  const [menu, setMenu] = useState("/");
  const location = useLocation();
  useEffect(() => {
  console.log(location.pathname)
  setMenu(location.pathname)
  }, [location])

  // Login function example (you can expand with real API calls)
  

  return (
    <MenuContext.Provider value={{ menu }}>
      {children}
    </MenuContext.Provider>
  );
}

// Custom hook for easier consumption in components
export function useMenu() {
  return useContext(MenuContext);
}
