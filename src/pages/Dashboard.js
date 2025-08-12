import React, { useEffect, useState } from 'react';

export default function Dashboard({ onLogout }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetch('/protected-data', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (res.status === 401) {
            setError('No autorizado. Cerrando sesión...');
            setTimeout(() => {
              handleLogout();
            }, 1500);
            return;
          }
          const data = await res.json();
          setProtectedData(data);
        })
        .catch((err) => console.error('Error:', err));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    if (onLogout) onLogout();
  };

  if (!token) {
    return <p>No estás logueado</p>;
  }

  return (
    <div>
      <h2>Bienvenido</h2>
      <p>Rol: {role}</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {protectedData ? (
        <pre>{JSON.stringify(protectedData, null, 2)}</pre>
      ) : (
        <p>Cargando datos protegidos...</p>
      )}

      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
