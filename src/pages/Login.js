import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";
import "./Auth.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useContext(AuthContext);
  const { setCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const [usuariosGuardados, setUsuariosGuardados] = useState([]);

  // Cargar usuarios guardados al montar
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuariosGuardados(savedUsers);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = await login(username, password);

      // Guardar usuarios usados antes
      let updatedUsers = [...usuariosGuardados];
      if (!updatedUsers.includes(username)) {
        updatedUsers.push(username);
        localStorage.setItem("usuarios", JSON.stringify(updatedUsers));
        setUsuariosGuardados(updatedUsers);
      }

      // Cargar carrito si NO es admin
      if (!userData.is_staff) {
        const carritoLS = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoLS);
      } else {
        setCarrito([]);
        localStorage.removeItem("carrito");
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("❌ Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card animate__animated animate__fadeInUp">
        <h2 className="text-center mb-4">🎸 Iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tu usuario"
              list="usuarios-guardados"
              required
            />

            <datalist id="usuarios-guardados">
              {usuariosGuardados.map((u, i) => (
                <option key={i} value={u} />
              ))}
            </datalist>
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-dark w-100" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>

        <div className="text-center mt-3">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-gradient">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}




