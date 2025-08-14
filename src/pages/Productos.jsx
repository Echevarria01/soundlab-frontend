import { useState } from "react";
import { Link } from "react-router-dom";
import productos from "../data/productos";

export default function Productos() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("Todos");

  // Obtener categorías principales
  const categorias = ["Todos", ...new Set(productos.map(p => p.categoria.split(" / ")[0]))];

  // Obtener subcategorías de la categoría seleccionada
  const subcategorias = categoriaSeleccionada === "Todos"
    ? []
    : ["Todos", ...new Set(
        productos
          .filter(p => p.categoria.startsWith(categoriaSeleccionada))
          .map(p => p.categoria.split(" / ")[1])
          .filter(Boolean)
      )];

  // Filtrar productos
  let productosFiltrados = productos;

  if (categoriaSeleccionada !== "Todos") {
    productosFiltrados = productosFiltrados.filter(p => p.categoria.startsWith(categoriaSeleccionada));
  }

  if (subcategoriaSeleccionada !== "Todos" && subcategoriaSeleccionada !== "" && subcategorias.length > 0) {
    productosFiltrados = productosFiltrados.filter(p => p.categoria.endsWith(subcategoriaSeleccionada));
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Nuestros Productos</h1>

      {/* Botones de categorías */}
      <div className="mb-4 d-flex flex-wrap">
        {categorias.map((cat, index) => (
          <button
            key={index}
            className={`btn me-2 mb-2 ${
              categoriaSeleccionada === cat ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => {
              setCategoriaSeleccionada(cat);
              setSubcategoriaSeleccionada("Todos"); // Reset subcategoría
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Botones de subcategorías (solo si hay) */}
      {subcategorias.length > 0 && (
        <div className="mb-4 d-flex flex-wrap">
          {subcategorias.map((subcat, index) => (
            <button
              key={index}
              className={`btn me-2 mb-2 ${
                subcategoriaSeleccionada === subcat ? "btn-secondary" : "btn-outline-secondary"
              }`}
              onClick={() => setSubcategoriaSeleccionada(subcat)}
            >
              {subcat}
            </button>
          ))}
        </div>
      )}

      {/* Lista de productos */}
      <div className="row">
        {productosFiltrados.map((prod) => (
          <div key={prod.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={prod.imagen}
                className="card-img-top"
                alt={prod.nombre}
              />
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text fw-bold text-success">
                  ${prod.precio.toLocaleString("es-AR")}
                </p>
                <Link to={`/producto/${prod.id}`} className="btn btn-primary w-100">
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





