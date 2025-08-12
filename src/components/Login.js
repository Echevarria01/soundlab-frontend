import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token y rol en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Llamar callback opcional para que App.js cambie a Dashboard
        if (onLogin) onLogin();

        // O redirigir directamente si usás react-router
        navigate('/');
      } else {
        alert(data.message || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Ocurrió un error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-3">Iniciar sesión</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Usuario"
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Entrar</button>
    </form>
  );
};

export default Login;

