import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [cantidades, setCantidades] = useState({});
  const [carrito, setCarrito] = useState([]);
  const [productoModal, setProductoModal] = useState(null);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [pestanaActiva, setPestanaActiva] = useState("productos");
  const [pasoCheckout, setPasoCheckout] = useState(1);
  const [envio, setEnvio] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    ciudad: "",
    metodoPago: "Tarjeta",
    factura: "No",
  });

  const categorias = [
    "Todos",
    "Guitarras / Bajos",
    "Guitarras / Guitarras Eléctricas",
    "Guitarras / Electroacústicas",
    "Teclados",
    "Home Studio / Auriculares",
    "Home Studio / Micrófonos",
    "Home Studio / Monitores",
    "Home Studio / Placas de Audio",
    "Controladores DJ",
    "Amplificadores",
    "Baterías",
  ];

  // -------------------- EFECTOS --------------------
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products/");
        if (!response.ok) throw new Error("Error al cargar los productos");
        const data = await response.json();

        const productosFormateados = data.map(item => ({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          categoria: item.categoria,
          imagen: item.imagen ? `http://localhost:8000${item.imagen}` : "https://via.placeholder.com/200",
        }));

        setProductos(productosFormateados);
      } catch (error) {
        console.error(error);
        alert("No se pudieron cargar los productos");
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    const carritoLS = localStorage.getItem("carrito");
    if (carritoLS) setCarrito(JSON.parse(carritoLS));

    const pedidosLS = localStorage.getItem("pedidos");
    if (pedidosLS) setHistorialPedidos(JSON.parse(pedidosLS));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // -------------------- FUNCIONES --------------------
  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter(p => p.categoria === categoriaSeleccionada);

  const handleCantidad = (id, cambio) => {
    setCantidades(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + cambio) }));
  };

  const handleCantidadChange = (id, valor) => {
    const num = parseInt(valor);
    if (!isNaN(num) && num > 0) {
      setCantidades(prev => ({ ...prev, [id]: num }));
    }
  };

  const agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    const cantidad = cantidades[id] || 1;

    setCarrito(prev => {
      const existente = prev.find(p => p.id === id);
      if (existente) {
        return prev.map(p => p.id === id ? { ...p, cantidad: p.cantidad + cantidad } : p);
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });

    setProductoModal(null);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const totalCarrito = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

  const abrirCheckout = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    setPestanaActiva("checkout");
    setPasoCheckout(1);
  };

  const confirmarCompra = () => {
    const nuevoPedido = {
      id: Date.now(),
      fecha: new Date().toLocaleString("es-AR"),
      items: carrito,
      total: totalCarrito,
      envio,
    };

    const pedidosActualizados = [...historialPedidos, nuevoPedido];
    setHistorialPedidos(pedidosActualizados);
    localStorage.setItem("pedidos", JSON.stringify(pedidosActualizados));

    alert(`✅ Compra confirmada por $${totalCarrito.toLocaleString("es-AR")}.\n¡Gracias por tu compra!`);

    setCarrito([]);
    localStorage.removeItem("carrito");
    setEnvio({ nombre: "", direccion: "", telefono: "", ciudad: "", metodoPago: "Tarjeta", factura: "No" });
    setPasoCheckout(1);
    setPestanaActiva("productos");
  };

  const siguientePaso = () => {
    if (pasoCheckout === 1 && (!envio.nombre || !envio.direccion || !envio.ciudad || !envio.telefono)) {
      alert("Completá todos los datos de envío");
      return;
    }
    setPasoCheckout(prev => prev + 1);
  };

  const pasoAnterior = () => setPasoCheckout(prev => prev - 1);

  // -------------------- RENDER --------------------
  return (
    <div className="container py-5">
      {/* BARRA DE PESTAÑAS */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button className={`btn ${pestanaActiva === "productos" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setPestanaActiva("productos")}>Productos</button>
        <button className={`btn ${pestanaActiva === "carrito" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setPestanaActiva("carrito")}>Carrito ({carrito.length})</button>
        <button className={`btn ${pestanaActiva === "historial" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setPestanaActiva("historial")}>Historial</button>
      </div>

      {/* ------------------ PESTAÑA PRODUCTOS ------------------ */}
      {pestanaActiva === "productos" && (
        <>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            {categorias.map(cat => (
              <button
                key={cat}
                className={`btn ${categoriaSeleccionada === cat ? "btn-primary" : "btn-outline-primary"} rounded-pill px-3`}
                onClick={() => setCategoriaSeleccionada(cat)}
              >
                {cat.split("/")[1] ? cat.split("/")[1].trim() : cat}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {productosFiltrados.map((prod, index) => (
              <div key={prod.id} className="col-sm-6 col-md-4 col-lg-3 producto-card-wrapper" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card producto-card h-100 shadow-sm border-0">
                  <div className="producto-img-container" onClick={() => setProductoModal(prod)} style={{ cursor: "pointer" }}>
                    <img src={prod.imagen} className="card-img-top producto-img" alt={prod.nombre} />
                  </div>
                  <div className="card-body text-center">
                    <h6 className="card-title fw-bold">{prod.nombre}</h6>
                    <p className="text-success fw-semibold mt-2">${prod.precio.toLocaleString("es-AR")}</p>
                    <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
                      <button className="btn btn-outline-secondary" onClick={() => handleCantidad(prod.id, -1)} disabled={cantidades[prod.id] <= 1}>-</button>
                      <input type="number" value={cantidades[prod.id] || 1} onChange={e => handleCantidadChange(prod.id, e.target.value)} style={{ width: "50px", textAlign: "center" }} />
                      <button className="btn btn-outline-secondary" onClick={() => handleCantidad(prod.id, 1)}>+</button>
                    </div>
                    <button className="btn btn-primary w-100 mt-2" onClick={() => agregarAlCarrito(prod.id)}>Agregar al carrito</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ------------------ PESTAÑA CARRITO ------------------ */}
      {pestanaActiva === "carrito" && (
        <div>
          <h3>🛒 Tu Carrito</h3>
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {carrito.map(prod => (
                  <li key={prod.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>{prod.nombre} x {prod.cantidad}</div>
                    <div>
                      ${(prod.precio * prod.cantidad).toLocaleString("es-AR")}
                      <button className="btn btn-sm btn-danger ms-2" onClick={() => eliminarDelCarrito(prod.id)}>X</button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="fw-bold">Total: ${totalCarrito.toLocaleString("es-AR")}</p>
              <button className="btn btn-success w-100" onClick={abrirCheckout}>Ir a pagar</button>
            </>
          )}
        </div>
      )}

      {/* ------------------ PESTAÑA CHECKOUT ------------------ */}
      {pestanaActiva === "checkout" && (
        <div className="modal-checkout">
          <h3>Checkout</h3>
          <div className="d-flex justify-content-between mb-3">
            <div className={pasoCheckout >= 1 ? "fw-bold text-primary" : ""}>1. Envío</div>
            <div className={pasoCheckout >= 2 ? "fw-bold text-primary" : ""}>2. Pago</div>
            <div className={pasoCheckout >= 3 ? "fw-bold text-primary" : ""}>3. Confirmación</div>
          </div>

          {pasoCheckout === 1 && (
            <div className="checkout-section">
              <label>Nombre completo</label>
              <input type="text" value={envio.nombre} onChange={e => setEnvio(prev => ({...prev, nombre: e.target.value}))} className="form-control mb-2" />
              <label>Dirección</label>
              <input type="text" value={envio.direccion} onChange={e => setEnvio(prev => ({...prev, direccion: e.target.value}))} className="form-control mb-2" />
              <label>Ciudad</label>
              <input type="text" value={envio.ciudad} onChange={e => setEnvio(prev => ({...prev, ciudad: e.target.value}))} className="form-control mb-2" />
              <label>Teléfono</label>
              <input type="text" value={envio.telefono} onChange={e => setEnvio(prev => ({...prev, telefono: e.target.value}))} className="form-control mb-2" />
              <button className="btn btn-primary me-2" onClick={siguientePaso}>Siguiente</button>
              <button className="btn btn-secondary" onClick={() => setPestanaActiva("carrito")}>Cancelar</button>
            </div>
          )}

          {pasoCheckout === 2 && (
            <div className="checkout-section">
              <label>Método de pago</label>
              <select value={envio.metodoPago} onChange={e => setEnvio(prev => ({...prev, metodoPago: e.target.value}))} className="form-control mb-2">
                <option>Tarjeta</option>
                <option>Mercado Pago</option>
                <option>Transferencia</option>
              </select>
              <label>¿Factura?</label>
              <select value={envio.factura} onChange={e => setEnvio(prev => ({...prev, factura: e.target.value}))} className="form-control mb-2">
                <option>No</option>
                <option>Sí</option>
              </select>
              <button className="btn btn-secondary me-2" onClick={pasoAnterior}>Anterior</button>
              <button className="btn btn-primary" onClick={siguientePaso}>Siguiente</button>
            </div>
          )}

          {pasoCheckout === 3 && (
            <div className="checkout-section">
              <h5>Resumen de compra</h5>
              <ul className="list-group mb-3">
                {carrito.map(prod => (
                  <li key={prod.id} className="list-group-item d-flex justify-content-between">{prod.nombre} x {prod.cantidad} <span>${(prod.precio*prod.cantidad).toLocaleString("es-AR")}</span></li>
                ))}
              </ul>
              <p className="fw-bold">Total: ${totalCarrito.toLocaleString("es-AR")}</p>
              <button className="btn btn-secondary me-2" onClick={pasoAnterior}>Anterior</button>
              <button className="btn btn-success" onClick={confirmarCompra}>Confirmar Compra</button>
            </div>
          )}
        </div>
      )}

      {/* ------------------ PESTAÑA HISTORIAL ------------------ */}
      {pestanaActiva === "historial" && (
        <div>
          <h3>📜 Historial de pedidos</h3>
          {historialPedidos.length === 0 ? (
            <p>No hay pedidos realizados aún.</p>
          ) : (
            historialPedidos.map(pedido => (
              <div key={pedido.id} className="card mb-2">
                <div className="card-body">
                  <h6>Pedido #{pedido.id} - {pedido.fecha}</h6>
                  <ul className="list-group mb-2">
                    {pedido.items.map(item => (
                      <li key={item.id} className="list-group-item d-flex justify-content-between">
                        {item.nombre} x {item.cantidad}
                        <span>${(item.precio*item.cantidad).toLocaleString("es-AR")}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="fw-bold">Total: ${pedido.total.toLocaleString("es-AR")}</p>
                  <p>Envío: {pedido.envio.nombre}, {pedido.envio.direccion}, {pedido.envio.ciudad}, Tel: {pedido.envio.telefono}</p>
                  <p>Método de pago: {pedido.envio.metodoPago} | Factura: {pedido.envio.factura}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ------------------ MODAL PRODUCTO ------------------ */}
      {productoModal && (
        <div className="modal show d-block" tabIndex="-1" onClick={() => setProductoModal(null)}>
          <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{productoModal.nombre}</h5>
                <button type="button" className="btn-close" onClick={() => setProductoModal(null)}></button>
              </div>
              <div className="modal-body text-center">
                <img src={productoModal.imagen} alt={productoModal.nombre} className="img-fluid mb-3" />
                <p className="fw-bold">${productoModal.precio.toLocaleString("es-AR")}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setProductoModal(null)}>Cerrar</button>
                <button className="btn btn-primary" onClick={() => agregarAlCarrito(productoModal.id)}>Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Productos;














