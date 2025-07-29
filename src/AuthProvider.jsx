import React, { createContext, useState, useContext } from "react";

// Create context
const AuthContext = createContext(null);

// Provider component wraps your app and provides auth info/state
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // can hold user info if needed

  // Login function example (you can expand with real API calls)
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easier consumption in components
export function useAuth() {
  return useContext(AuthContext);
}
