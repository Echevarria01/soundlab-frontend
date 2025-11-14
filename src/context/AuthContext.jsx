import { createContext, useState, useEffect } from "react";
import { apiFetch } from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const data = await apiFetch("/user/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (err) {
        console.warn("Token inválido o expirado");
        logout();
      }
    };
    fetchProfile();
  }, [token]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      // pedir token JWT
      const data = await apiFetch("/token/", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      setToken(data.access);

      // pedir datos del usuario
      const userData = await apiFetch("/user/profile/", {
        headers: { Authorization: `Bearer ${data.access}` },
      });

      setUser(userData);
      setMensaje(`🎸 ¡Bienvenido/a, ${userData.username || username}!`);
      return userData;
    } catch (err) {
      console.error("Error de login:", err);
      setMensaje("❌ Usuario o contraseña incorrectos.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const data = await apiFetch("/user/register/", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });

      setMensaje("🎉 Cuenta creada con éxito, ahora puedes iniciar sesión.");
      return data;
    } catch (err) {
      console.error("Error al registrar:", err);
      setMensaje("❌ Error en el servidor.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setMensaje("👋 Sesión cerrada correctamente.");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, mensaje, setMensaje }}
    >
      {children}
    </AuthContext.Provider>
  );
};











