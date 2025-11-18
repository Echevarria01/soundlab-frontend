import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const API_BASE = "https://soundlab-store.up.railway.app";
const API_LOGIN = `${API_BASE}/user/login/`;
const API_PROFILE = `${API_BASE}/user/profile/`;
const API_REGISTER = `${API_BASE}/user/register/`;
const API_REFRESH = `${API_BASE}/token/refresh/`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token") || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh_token") || null);
  const [loading, setLoading] = useState(false);

  // Cargar perfil si hay token
  useEffect(() => {
    if (!accessToken) return;

    const cargarPerfil = async () => {
      try {
        const res = await fetch(API_PROFILE, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error("Token inválido");
        const perfil = await res.json();
        setUser(perfil);
      } catch (err) {
        console.log("Token inválido. Cerrando sesión…");
        logout();
      }
    };

    cargarPerfil();
  }, [accessToken]);

  // LOGIN
  const login = async (username, password) => {
    setLoading(true);
    try {
      // POST login
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const data = await res.json();

      // Guardar tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);

      // Llamar perfil usando token recién recibido
      const perfilRes = await fetch(API_PROFILE, {
        headers: { Authorization: `Bearer ${data.access}` },
      });
      if (!perfilRes.ok) throw new Error("No se pudo cargar el perfil");
      const perfil = await perfilRes.json();
      setUser(perfil);

      return perfil;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const res = await fetch(API_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) throw new Error("Error creando usuario");
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};





