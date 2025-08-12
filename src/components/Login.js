import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate('/'); // Redirige al home u otra vista
    } else {
      alert("Credenciales inválidas");
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
