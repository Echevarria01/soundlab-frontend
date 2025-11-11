import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        setCargando(true);
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();

        // Usamos nombres limpios de imágenes
        const productoConImagen = {
          ...data,
          image: data.image
            ? `${window.location.origin}/img/productos/${data.image}`
            : "https://via.placeholder.com/400x400?text=Sin+imagen",
        };

        setProducto(productoConImagen);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el producto.");
      } finally {
        setCargando(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (cargando)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando producto...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5 text-center">
        <h2>{error}</h2>
        <Link to="/productos" className="btn btn-secondary mt-3">
          Volver a productos
        </Link>
      </div>
    );

  if (!producto)
    return (
      <div className="container mt-5 text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="btn btn-secondary mt-3">
          Volver a productos
        </Link>
      </div>
    );

  return (
    <div className="container mt-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">{producto.category?.name || "Categoría"}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6">
          <img src={producto.image} alt={producto.name} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{producto.name}</h1>
          <span className="badge bg-info mb-3">{producto.category?.name || "Sin categoría"}</span>
          <p className="text-muted">{producto.description || "Sin descripción"}</p>
          <h3 className="text-success fw-bold mb-4">${parseFloat(producto.price).toLocaleString("es-AR")}</h3>
          <div className="mt-4">
            <button className="btn btn-primary btn-lg me-3" onClick={() => { agregarAlCarrito(producto); navigate("/carrito"); }}>🛒 Agregar al carrito</button>
            <Link to="/productos" className="btn btn-outline-secondary btn-lg">Volver a productos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}





