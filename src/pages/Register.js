import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const { register, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!isValidEmail(email)) return setEmailError("El correo no tiene un formato válido.");
    setEmailError("");

    if (!isValidPassword(password))
      return setPasswordError(
        "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      );
    setPasswordError("");

    try {
      await register(username, email, password);
      // Auto login después de registrarse
      await login(username, password);
      navigate("/");
    } catch (err) {
      setServerError(err?.error || "❌ No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card animate__animated animate__fadeInUp">
        <h2 className="text-center mb-4">🎶 Crear cuenta</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: juan123"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña segura"
              required
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>

          {serverError && <div className="alert alert-danger">{serverError}</div>}

          <button type="submit" className="btn btn-dark w-100">
            Registrarse
          </button>
        </form>

        <div className="text-center mt-3">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-gradient">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}



