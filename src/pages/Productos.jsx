import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Productos.css";

function Productos() {
  // -------------------- ESTADOS --------------------
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // -------------------- EFECTO: CARGAR DATOS --------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCargando(true);

        // ✅ Ajustá esta URL según la dirección de tu backend Django
        const baseUrl = "http://127.0.0.1:8000/api";

        const [productosRes, categoriasRes] = await Promise.all([
          fetch(`${baseUrl}/products/`),
          fetch(`${baseUrl}/categories/`),
        ]);

        if (!productosRes.ok || !categoriasRes.ok) {
          throw new Error("Error al obtener datos del servidor");
        }

        const productosData = await productosRes.json();
        const categoriasData = await categoriasRes.json();

        setProductos(productosData);
        setCategorias(categoriasData);
      } catch (err) {
        console.error(err);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  // -------------------- FILTRAR PRODUCTOS --------------------
  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter(
          (prod) => prod.category?.name === categoriaSeleccionada
        );

  // -------------------- RENDER --------------------
  if (cargando)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando productos...</p>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-5">{error}</div>
    );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Nuestros Productos</h2>

      {/* -------------------- FILTRO DE CATEGORÍAS -------------------- */}
      <div className="mb-4 text-center">
        <label className="me-2 fw-semibold">Filtrar por categoría:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="Todos">Todos</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* -------------------- LISTA DE PRODUCTOS -------------------- */}
      {productosFiltrados.length > 0 ? (
        <div className="row g-4">
          {productosFiltrados.map((prod) => (
            <div className="col-md-4 col-lg-3" key={prod.id}>
              <div className="card producto-card h-100 shadow-sm">
                <div className="producto-img-container">
                  <img
                    src={prod.image}
                    className="card-img-top producto-img"
                    alt={prod.name}
                  />
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{prod.name}</h5>
                  <p className="text-muted">${parseFloat(prod.price).toLocaleString()}</p>
                  <button className="btn btn-primary btn-sm">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-5">No hay productos en esta categoría.</p>
      )}
    </div>
  );
}

export default Productos;











