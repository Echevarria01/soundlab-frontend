import { createContext, useState, useEffect } from "react";
import API from "../api/api"; // usa axios configurado

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  // 🔁 Verificar sesión al iniciar la app
  useEffect(() => {
    if (token) {
      API.get("/user/profile/") // o el endpoint que tengas en el backend
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  // 🔐 Login con backend Django REST
  const login = async (username, password) => {
  setLoading(true);
  try {
    const res = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Error en login");

    // Guardamos tokens
    localStorage.setItem("token", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    setToken(data.access);

    // Opcional: pedir datos del usuario autenticado
    const profileRes = await fetch("http://127.0.0.1:8000/api/user/profile/", {
      headers: { Authorization: `Bearer ${data.access}` },
    });
    const userData = await profileRes.json();
    setUser(userData);

  } finally {
    setLoading(false);
  }
};


  // 🚪 Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


