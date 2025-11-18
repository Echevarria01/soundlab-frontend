import { createContext, useState, useEffect } from "react";
import { apiFetch } from "../api";

export const AuthContext = createContext();

const API_BASE = "https://soundlab-store.up.railway.app";
const API_LOGIN = "/token/";
const API_REGISTER = "/user/register/";
const API_PROFILE = "/user/profile/";
const API_REFRESH = "/token/refresh/";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token") || null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Cargar perfil si hay token
  useEffect(() => {
    if (!token) return;

    const cargarPerfil = async () => {
      try {
        const perfil = await apiFetch(API_PROFILE, {}, token);
        setUser(perfil);
      } catch (err) {
        console.log("Token inválido. Cerrando sesión…");
        logout();
      }
    };

    cargarPerfil();
  }, [token]);

  // LOGIN
  const login = async (username, password) => {
    setLoading(true);
    try {
      // Llamada login sin token vacío
      const data = await apiFetch(
        API_LOGIN,
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          skipAuth: true,
        }
      );

      // Guardar tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      setToken(data.access);
      setRefreshToken(data.refresh);

      // Cargar perfil usando token recién recibido
      const perfil = await apiFetch(API_PROFILE, {}, data.access);
      setUser(perfil);

      setMensaje(`🎸 Bienvenido, ${perfil.username}!`);
      return perfil;
    } catch (err) {
      console.error(err);
      setMensaje("❌ Usuario o contraseña incorrectos");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const data = await apiFetch(
        API_REGISTER,
        {
          method: "POST",
          body: JSON.stringify({ username, email, password }),
          skipAuth: true,
        }
      );

      setMensaje("🎉 Usuario creado. Ahora inicia sesión.");
      return data;
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error creando usuario.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  // REFRESH TOKEN (opcional)
  const refreshAccessToken = async () => {
    if (!refreshToken) return;
    try {
      const data = await apiFetch(
        API_REFRESH,
        {
          method: "POST",
          body: JSON.stringify({ refresh: refreshToken }),
          skipAuth: true,
        }
      );
      localStorage.setItem("access_token", data.access);
      setToken(data.access);
      return data.access;
    } catch (err) {
      console.log("No se pudo refrescar el token");
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        mensaje,
        setMensaje,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};












