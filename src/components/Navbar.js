import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/soundlab.png";
import { AuthContext } from "../context/AuthContext";
import { CarritoContext } from "../context/CarritoContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { carrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={logo} alt="SoundLab Logo" style={{ height: "40px", marginRight: "10px" }} />
        SoundLab
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/productos">Productos</Link>
          </li>

          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/pedidos">Pedidos</Link>
              </li>

              {/* Mostrar carrito solo si NO es admin */}
              {!user?.is_staff && (
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="/checkout">
                    Carrito
                    {totalItems > 0 && (
                      <span
                        className="badge bg-danger rounded-circle position-absolute"
                        style={{ top: "-5px", right: "-10px", fontSize: "0.7rem" }}
                      >
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}














