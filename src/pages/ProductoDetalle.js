import { useParams, Link } from "react-router-dom";
import productos from "../data/productos";

export default function ProductoDetalle() {
  const { id } = useParams();

  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <div className="container mt-5 text-center">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="btn btn-secondary mt-3">
          Volver a productos
        </Link>
      </div>
    );
  }

  const [categoria, subcategoria] = producto.categoria.split(" / ");

  return (
    <div className="container mt-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/productos">{categoria}</Link>
          </li>
          {subcategoria && (
            <li className="breadcrumb-item">{subcategoria}</li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Imagen del producto */}
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        {/* Info del producto */}
        <div className="col-md-6">
          <h1 className="mb-3">{producto.nombre}</h1>
          <span className="badge bg-info mb-3">
            {categoria} {subcategoria && `> ${subcategoria}`}
          </span>
          <p className="text-muted">{producto.descripcion}</p>
          <h3 className="text-success fw-bold mb-4">
            ${producto.precio.toLocaleString("es-AR")}
          </h3>

          {/* Botones */}
          <div className="mt-4">
            <button className="btn btn-primary btn-lg me-3">
              Agregar al carrito
            </button>
            <Link to="/productos" className="btn btn-outline-secondary btn-lg">
              Volver a productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}



