import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const toggleAuthPopup = () => {
    setShowAuthPopup(!showAuthPopup);
  };

  return (
    <AuthContext.Provider
      value={{
        showAuthPopup,
        toggleAuthPopup,
        token,
        user,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
