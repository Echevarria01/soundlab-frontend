import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    register({ username, password });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Nuevo usuario" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
      <button type="submit">Registrarme</button>
    </form>
  );
};

export default Register;
