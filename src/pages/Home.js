import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const productos = [
    {
      id: 1,
      nombre: "Guitarra Eléctrica Fender",
      descripcion: "Sonido profesional para todos los estilos musicales.",
      precio: 1200,
      imagen: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    },
    {
      id: 2,
      nombre: "Controladora DJ Pioneer",
      descripcion: "Ideal para mezclas en vivo y sets profesionales.",
      precio: 950,
      imagen: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    },
    {
      id: 3,
      nombre: "Batería Electrónica Roland",
      descripcion: "Compacta, silenciosa y con sonidos realistas.",
      precio: 750,
      imagen: "https://images.unsplash.com/photo-1587732560916-3f9a0f47b1b1",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">🎵 SoundLab</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="menu">
            <form className="d-flex mx-auto my-2 my-lg-0 w-50">
              <input className="form-control me-2" type="search" placeholder="Buscar productos..." />
              <button className="btn btn-outline-light" type="submit">Buscar</button>
            </form>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/login">Iniciar Sesión</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/registro">Registrarse</Link></li>
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

      {/* Banner */}
      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-4">Bienvenido a SoundLab</h1>
        <p>Instrumentos musicales y equipos de DJ a tu alcance</p>
        <a href="#productos" className="btn btn-light btn-lg">Ver productos</a>
      </div>

      {/* Productos */}
      <div id="productos" className="container mt-5">
        <h2 className="mb-4 text-center">Productos Destacados</h2>
        <div className="row">
          {productos.map((producto) => (
            <div className="col-md-4 mb-4" key={producto.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.nombre}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <p className="fw-bold">${producto.precio}</p>
                  <Link to={`/producto/${producto.id}`} className="btn btn-primary">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
