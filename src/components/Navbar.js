import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🎵 SoundLab</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <form className="d-flex mx-auto my-2 my-lg-0 w-50">
            <input className="form-control me-2" type="search" placeholder="Buscar productos..." />
            <button className="btn btn-outline-light" type="submit">Buscar</button>
          </form>
          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/carrito">
                🛍 Carrito
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

