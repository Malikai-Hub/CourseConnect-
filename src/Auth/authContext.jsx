// Used the solution for book buddy to help me write the auth context

import { createContext, useContext, useEffect, useState } from "react";
const API = import.meta.env.VITE_API;

const authContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  const register = async (credentials) => {
    const response = await fetch(`${API}/users/Register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.text();
    if (!response.ok) throw result;
    setToken(result);
  };
  const login = async (credentials) => {
    const response = await fetch(`${API}/users/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.text();
    if (!response.ok) throw result;
    setToken(result);
  };
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };
  const value = { token, register, login, logout };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
export function useAuth() {
  const context = useContext(authContext);
  if (!context) throw Error("useAuth must be used inside authProvider");
  return context;
}
