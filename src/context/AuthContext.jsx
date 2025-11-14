import React, { createContext, useState, useEffect } from "react";
import { apiFetch } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access") || null);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh") || null
  );

  // -----------------------------------------------------
  // LOGIN
  // -----------------------------------------------------
  const login = async (email, password) => {
    try {
      const data = await apiFetch("/user/login/", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Guardar tokens correctos del backend
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      setToken(data.access);
      setRefreshToken(data.refresh);

      // Cargar perfil del usuario
      const userData = await apiFetch("/user/profile/");
      setUser(userData);

      return true;
    } catch (error) {
      throw new Error("Error al iniciar sesión");
    }
  };

  // -----------------------------------------------------
  // LOGOUT
  // -----------------------------------------------------
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  // -----------------------------------------------------
  // REGISTER (opcional)
  // -----------------------------------------------------
  const register = async (userData) => {
    return await apiFetch("/user/register/", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  };

  // -----------------------------------------------------
  // CARGAR PERFIL AL INICIAR
  // -----------------------------------------------------
  const fetchProfile = async () => {
    const storedToken = localStorage.getItem("access");
    if (!storedToken) return;

    try {
      const userData = await apiFetch("/user/profile/");
      setUser(userData);
    } catch (error) {
      console.log("Token expirado o inválido, cerrando sesión");
      logout();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        login,
        logout,
        register,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};









