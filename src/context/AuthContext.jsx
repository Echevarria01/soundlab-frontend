import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Cargar perfil al iniciar la app si hay token
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;
      try {
        const res = await fetch("http://127.0.0.1:8000/api/user/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Token inválido");
        const data = await res.json();
        setUser(data);
      } catch {
        logout();
      }
    };
    fetchProfile();
  }, [token]);

  // Login
  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Usuario o contraseña incorrectos");

      // Guardar tokens
      localStorage.setItem("token", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      setToken(data.access);

      // Obtener datos de usuario
      const profileRes = await fetch("http://127.0.0.1:8000/api/user/profile/", {
        headers: { Authorization: `Bearer ${data.access}` },
      });
      if (!profileRes.ok) throw new Error("No se pudo obtener perfil");
      const userData = await profileRes.json();
      setUser(userData);

      // Mensaje de bienvenida
      const nombre = userData.username || username;
      setMensaje(`🎸 ¡Bienvenido/a, ${nombre}!`);

      return userData; // <-- Importante: devuelve el usuario
    } catch (err) {
      console.error("Error de login:", err);
      setMensaje("❌ No se pudo iniciar sesión. Verifica tus datos.");
      throw err; // lanza el error para que Login.jsx lo capture
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
      value={{ user, token, loading, login, logout, mensaje, setMensaje }}
    >
      {children}
    </AuthContext.Provider>
  );
};








