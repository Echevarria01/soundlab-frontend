import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/soundlab.png";

export default function Navbar({ token }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");   // Eliminar token
    navigate("/login");                // Redirigir al login
    window.location.reload();          // Recargar la app para actualizar el estado (opcional pero seguro)
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logo}
          alt="SoundLab Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        SoundLab
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/productos">Productos</Link>
          </li>

          {token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/carrito">Carrito</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}

          {!token && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

