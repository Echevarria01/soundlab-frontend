import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Productos.css"; // CSS aparte para animaciones suaves

const productos = [
  {
    id: 1,
    nombre: "Amplificador Para Bajo Eléctrico 15 Watts 2 X 5 Laney LX15B",
    categoria: "Amplificadores",
    precio: 150000,
    imagen: "/img/Productos/Amplificador Para Bajo Eléctrico 15 Watts 2 X 5 Laney LX15B.jpg",
  },
  {
    id: 2,
    nombre: "Amplificador Para Guitarra 25 Watts Parlante de 8",
    categoria: "Amplificadores",
    precio: 130000,
    imagen: "/img/Productos/Amplificador Para Guitarra 25 Watts Parlante de 8.jpg",
  },
  {
    id: 3,
    nombre: "Amplificador Para Guitarra Eléctrica Combo 100W Marshall MG101CFX",
    categoria: "Amplificadores",
    precio: 580000,
    imagen: "/img/Productos/Amplificador Para Guitarra Eléctrica Combo 100W Marshall MG101CFX.jpg",
  },
  {
    id: 4,
    nombre: "Auricular De Estudio Cerrados AKG K72",
    categoria: "Home Studio / Auriculares",
    precio: 80000,
    imagen: "/img/Productos/Auricular De Estudio Cerrados AKG K72.jpg",
  },
  {
    id: 5,
    nombre: "Auriculares De Estudio Profesional AUDIO TECHNICA ATH-M20X",
    categoria: "Home Studio / Auriculares",
    precio: 95000,
    imagen: "/img/Productos/Auriculares De Estudio Profesional AUDIO TECHNICA ATH-M20X.jpg",
  },
  {
    id: 6,
    nombre: "Auriculares De Estudio Profesional AUDIO TECHNICA ATH-M50X",
    categoria: "Home Studio / Auriculares",
    precio: 180000,
    imagen: "/img/Productos/Auriculares De Estudio Profesional AUDIO TECHNICA ATH-M50X.jpg",
  },
  {
    id: 7,
    nombre: "Bajo Eléctrico PJ Cort Action Bass Plus",
    categoria: "Guitarras / Bajos",
    precio: 520000,
    imagen: "/img/Productos/Bajo Eléctrico PJ Cort Action Bass Plus.jpg",
  },
  {
    id: 8,
    nombre: "Bajo Eléctrico Precision Modern Pickguard Negro SX SBM23TS",
    categoria: "Guitarras / Bajos",
    precio: 510000,
    imagen: "/img/Productos/Bajo Eléctrico Precision Modern Pickguard Negro SX SBM23TS.jpg",
  },
  {
    id: 9,
    nombre: "BATERIA MAPEX PDG5254CDK Bat. Std 5 Cpos, Mapex Prodigy, 8T, Redo Madera",
    categoria: "Baterías",
    precio: 650000,
    imagen: "/img/Productos/BATERIA MAPEX.jpg",
  },
  {
    id: 10,
    nombre: "Guitarra Eléctrica Les Paul SX EF3D-CS",
    categoria: "Guitarras / Guitarras Eléctricas",
    precio: 648000,
    imagen: "/img/Productos/Guitarra Eléctrica Les Paul SX EF3D-CS.jpg",
  },
  {
    id: 11,
    nombre: "Guitarra Eléctrica Stratocaster SX SST62 Con Funda",
    categoria: "Guitarras / Guitarras Eléctricas",
    precio: 420000,
    imagen: "/img/Productos/Guitarra Eléctrica Stratocaster SX SST62 Con Funda.jpg",
  },
  {
    id: 12,
    nombre: "Guitarra Eléctrica Super Strato Rock Newen",
    categoria: "Guitarras / Guitarras Eléctricas",
    precio: 350000,
    imagen: "/img/Productos/Guitarra Eléctrica Super Strato Rock Newen.jpg",
  },
  {
    id: 13,
    nombre: "Guitarra Electro Acústica Ecualizador Con Funda Cort AD810E-BKS",
    categoria: "Guitarras / Electroacústicas",
    precio: 400000,
    imagen: "/img/Productos/Guitarra Electro Acústica Ecualizador Con Funda Cort AD810E-BKS.jpg",
  },
  {
    id: 14,
    nombre: "Guitarra Electro Acústica Ecualizador Con Funda Cort AF510E-OP",
    categoria: "Guitarras / Electroacústicas",
    precio: 390000,
    imagen: "/img/Productos/Guitarra Electro Acústica Ecualizador Con Funda Cort AF510E-OP.jpg",
  },
  {
    id: 15,
    nombre: "Kit Pack Micrófono Condenser Cardioide USB Maono AU-PM421",
    categoria: "Home Studio / Micrófonos",
    precio: 140000,
    imagen: "/img/Productos/Kit Pack Micrófono Condenser Cardioide USB Maono AU-PM421.jpg",
  },
  {
    id: 16,
    nombre: "Micrófono Condenser Cardioide Estudio Profesional AUDIO TECHNICA AT2020",
    categoria: "Home Studio / Micrófonos",
    precio: 160000,
    imagen: "/img/Productos/Micrófono Condenser Cardioide Estudio Profesional AUDIO TECHNICA AT2020.jpg",
  },
  {
    id: 17,
    nombre: "Micrófono Dinámico Cardioide Estudio Podcast XLR USB Con Control De Volumen Shure MV7+K",
    categoria: "Home Studio / Micrófonos",
    precio: 200000,
    imagen: "/img/Productos/Micrófono Dinámico Cardioide Estudio Podcast XLR USB Con Control De Volumen Shure MV7+K.jpg",
  },
  {
    id: 18,
    nombre: "MONITOR GENELEC 8010A",
    categoria: "Home Studio / Monitores",
    precio: 260000,
    imagen: "/img/Productos/MONITOR GENELEC 8010A.jpg",
  },
  {
    id: 19,
    nombre: "Monitores de Estudio Activos KRK CI5 G3 Rokit 5",
    categoria: "Home Studio / Monitores",
    precio: 310000,
    imagen: "/img/Productos/MonitoresKRK.JPG",
  },
  {
    id: 20,
    nombre: "MONITORES MACKIE CR3-X (AR)",
    categoria: "Home Studio / Monitores",
    precio: 270000,
    imagen: "/img/Productos/MONITORES MACKIE CR3-X (AR).jpg",
  },
  {
    id: 21,
    nombre: "Pack Placa De Audio 2 Entradas 2 Salidas USB 24-Bits M-AUDIO AIR192X4 Studio Pro",
    categoria: "Home Studio / Placas de Audio",
    precio: 220000,
    imagen: "/img/Productos/Pack Placa De Audio 2 Entradas 2 Salidas USB 24-Bits M-AUDIO AIR192X4 Studio Pro.jpg",
  },
  {
    id: 22,
    nombre: "Piano Eléctrico 88 Teclas Pesadas Con Sistema GHS 7u 8 Octavas FUENTE YAMAHA P45B",
    categoria: "Teclados",
    precio: 950000,
    imagen: "/img/Productos/Piano Eléctrico 88 Teclas Pesadas Con Sistema GHS 7u 8 Octavas FUENTE YAMAHA P45B.jpg",
  },
  {
    id: 23,
    nombre: "PIONEER CDJ 900 NXS",
    categoria: "Controladores DJ",
    precio: 1350000,
    imagen: "/img/Productos/PIONEER CDJ 900 NXS.jpg",
  },
  {
    id: 24,
    nombre: "PIONEER DDJ 200",
    categoria: "Controladores DJ",
    precio: 450000,
    imagen: "/img/Productos/PIONEER DDJ 200.jpg",
  },
  {
    id: 25,
    nombre: "PIONEER DDJ 800",
    categoria: "Controladores DJ",
    precio: 850000,
    imagen: "/img/Productos/PIONEER DDJ 800.jpg",
  },
  {
    id: 26,
    nombre: "PIONEER DJM 750 MK2",
    categoria: "Controladores DJ",
    precio: 1100000,
    imagen: "/img/Productos/PIONEER DJM 750 MK2.jpg",
  },
  {
    id: 27,
    nombre: "Placa De Audio 4 Entradas (2 líneas) 2 Salidas USB 24-Bits Con Midi M-AUDIO AIR192X6",
    categoria: "Home Studio / Placas de Audio",
    precio: 270000,
    imagen: "/img/Productos/Placa De Audio 4 Entradas (2 líneas) 2 Salidas USB 24-Bits Con Midi M-AUDIO AIR192X6.jpg",
  },
  {
    id: 28,
    nombre: "Placa de audio FOCUSRITE Scarlett 2i2 – 3ra gen",
    categoria: "Home Studio / Placas de Audio",
    precio: 320000,
    imagen: "/img/Productos/Placa de audio FOCUSRITE Scarlett 2i2 – 3ra gen.jpg",
  },
  {
    id: 29,
    nombre: "Teclado 61 Teclas 5 8 Octavas 122 Sonidos",
    categoria: "Teclados",
    precio: 420000,
    imagen: "/img/Productos/Teclado 61 Teclas 5 8 Octavas 122 Sonidos.jpg",
  },
  {
    id: 30,
    nombre: "YAMAHA RDP0F5HTR Bateria Acustica",
    categoria: "Baterías",
    precio: 720000,
    imagen: "/img/Productos/YAMAHA RDP0F5HTR Bateria Acustica.jpg",
  },
];

function Productos() {
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

  // -------------------- ESTADOS --------------------
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [cantidades, setCantidades] = useState({});
  const [carrito, setCarrito] = useState([]);
  const [productoModal, setProductoModal] = useState(null);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [pestanaActiva, setPestanaActiva] = useState("productos"); // productos | carrito | historial | checkout
  const [pasoCheckout, setPasoCheckout] = useState(1);

  const [envio, setEnvio] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    ciudad: "",
    metodoPago: "Tarjeta",
    factura: "No",
  });

  // -------------------- EFECTOS --------------------
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
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  const handleCantidad = (id, cambio) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + cambio),
    }));
  };

  const handleCantidadChange = (id, valor) => {
    const num = parseInt(valor);
    if (!isNaN(num) && num > 0) {
      setCantidades((prev) => ({ ...prev, [id]: num }));
    }
  };

  const agregarAlCarrito = (id) => {
    const producto = productos.find((p) => p.id === id);
    const cantidad = cantidades[id] || 1;

    setCarrito((prev) => {
      const existente = prev.find((p) => p.id === id);
      if (existente) {
        return prev.map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad + cantidad } : p
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });

    setProductoModal(null);
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const totalCarrito = carrito.reduce(
    (acc, prod) => acc + prod.precio * prod.cantidad,
    0
  );

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
    setEnvio({
      nombre: "",
      direccion: "",
      telefono: "",
      ciudad: "",
      metodoPago: "Tarjeta",
      factura: "No",
    });
    setPasoCheckout(1);
    setPestanaActiva("productos");
  };

  const siguientePaso = () => {
    if (pasoCheckout === 1) {
      if (!envio.nombre || !envio.direccion || !envio.ciudad || !envio.telefono) {
        alert("Completá todos los datos de envío");
        return;
      }
    }
    setPasoCheckout(pasoCheckout + 1);
  };

  const pasoAnterior = () => {
    setPasoCheckout(pasoCheckout - 1);
  };

  // -------------------- RENDER --------------------
  return (
    <div className="container py-5">
      {/* -------------------- BARRA DE PESTAÑAS -------------------- */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <button
          className={`btn ${pestanaActiva === "productos" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setPestanaActiva("productos")}
        >
          Productos
        </button>
        <button
          className={`btn ${pestanaActiva === "carrito" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setPestanaActiva("carrito")}
        >
          Carrito ({carrito.length})
        </button>
        <button
          className={`btn ${pestanaActiva === "historial" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setPestanaActiva("historial")}
        >
          Historial
        </button>
      </div>

      {/* -------------------- PESTAÑA PRODUCTOS -------------------- */}
      {pestanaActiva === "productos" && (
        <>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            {categorias.map((cat) => (
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
              <div
                key={prod.id}
                className="col-sm-6 col-md-4 col-lg-3 producto-card-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card producto-card h-100 shadow-sm border-0">
                  <div
                    className="producto-img-container"
                    onClick={() => setProductoModal(prod)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={prod.imagen} className="card-img-top producto-img" alt={prod.nombre} />
                  </div>
                  <div className="card-body text-center">
                    <h6 className="card-title fw-bold">{prod.nombre}</h6>
                    <p className="text-success fw-semibold mt-2">${prod.precio.toLocaleString("es-AR")}</p>

                    <div className="d-flex flex-column align-items-center mt-2">
                      <div className="d-flex align-items-center mb-2">
                        <button
                          className="btn btn-outline-secondary me-2"
                          onClick={() => handleCantidad(prod.id, -1)}
                          disabled={cantidades[prod.id] <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={cantidades[prod.id] || 1}
                          onChange={(e) => handleCantidadChange(prod.id, e.target.value)}
                          className="form-control text-center"
                          style={{ width: "60px" }}
                          min="1"
                        />
                        <button
                          className="btn btn-outline-secondary ms-2"
                          onClick={() => handleCantidad(prod.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button className="btn btn-primary w-100 mb-2" onClick={() => agregarAlCarrito(prod.id)}>
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* -------------------- PESTAÑA CARRITO -------------------- */}
      {pestanaActiva === "carrito" && (
        <div>
          <h3>🛒 Tu Carrito</h3>
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {carrito.map((prod) => (
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

      {/* -------------------- PESTAÑA CHECKOUT -------------------- */}
      {pestanaActiva === "checkout" && (
        <div className="modal-checkout">
          <h3>Checkout</h3>
          {/* Paso visual */}
          <div className="d-flex justify-content-between mb-3">
            <div className={pasoCheckout >= 1 ? "fw-bold text-primary" : ""}>1. Envío</div>
            <div className={pasoCheckout >= 2 ? "fw-bold text-primary" : ""}>2. Pago</div>
            <div className={pasoCheckout >= 3 ? "fw-bold text-primary" : ""}>3. Confirmación</div>
          </div>

          {pasoCheckout === 1 && (
            <div className="checkout-section">
              <label>Nombre completo</label>
              <input type="text" value={envio.nombre} onChange={e => setEnvio(prev => ({...prev, nombre: e.target.value}))} />
              <label>Dirección</label>
              <input type="text" value={envio.direccion} onChange={e => setEnvio(prev => ({...prev, direccion: e.target.value}))} />
              <label>Ciudad</label>
              <input type="text" value={envio.ciudad} onChange={e => setEnvio(prev => ({...prev, ciudad: e.target.value}))} />
              <label>Teléfono</label>
              <input type="tel" value={envio.telefono} onChange={e => setEnvio(prev => ({...prev, telefono: e.target.value}))} />
              <button className="btn btn-primary w-100 mt-3" onClick={siguientePaso}>Siguiente</button>
            </div>
          )}

          {pasoCheckout === 2 && (
            <div className="checkout-section">
              <label>Método de pago</label>
              <select value={envio.metodoPago} onChange={e => setEnvio(prev => ({...prev, metodoPago: e.target.value}))}>
                <option>Tarjeta</option>
                <option>Mercado Pago</option>
                <option>Transferencia bancaria</option>
              </select>

              <label className="mt-3">¿Deseás factura?</label>
              <select value={envio.factura} onChange={e => setEnvio(prev => ({...prev, factura: e.target.value}))}>
                <option>No</option>
                <option>Factura A</option>
                <option>Factura B</option>
              </select>

              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-outline-secondary" onClick={pasoAnterior}>Volver</button>
                <button className="btn btn-primary" onClick={siguientePaso}>Siguiente</button>
              </div>
            </div>
          )}

          {pasoCheckout === 3 && (
            <div>
              <h5>Resumen del pedido</h5>
              {carrito.map(prod => (
                <div key={prod.id} className="d-flex justify-content-between">
                  <span>{prod.nombre} x {prod.cantidad}</span>
                  <span>${(prod.precio*prod.cantidad).toLocaleString("es-AR")}</span>
                </div>
              ))}
              <p className="fw-bold mt-2">Total: ${totalCarrito.toLocaleString("es-AR")}</p>

              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-outline-secondary" onClick={pasoAnterior}>Volver</button>
                <button className="btn btn-success" onClick={confirmarCompra}>Confirmar compra</button>
              </div>
            </div>
          )}

          <button className="btn btn-outline-secondary w-100 mt-3" onClick={() => setPestanaActiva("carrito")}>Cancelar</button>
        </div>
      )}

      {/* -------------------- PESTAÑA HISTORIAL -------------------- */}
      {pestanaActiva === "historial" && (
        <div>
          <h3>Historial de Pedidos</h3>
          {historialPedidos.length === 0 ? <p>No hay pedidos anteriores.</p> : (
            historialPedidos.slice().reverse().map(pedido => (
              <div key={pedido.id} className="pedido-item mb-3">
                <p className="fw-bold">🧾 Pedido #{pedido.id} — {pedido.fecha}</p>
                <ul>
                  {pedido.items.map(item => (
                    <li key={item.id}>{item.nombre} x {item.cantidad} = ${(item.precio*item.cantidad).toLocaleString("es-AR")}</li>
                  ))}
                </ul>
                <p>Total: ${pedido.total.toLocaleString("es-AR")}</p>
                <hr/>
              </div>
            ))
          )}
        </div>
      )}

      {/* -------------------- MODAL PRODUCTO -------------------- */}
      {productoModal && (
        <div className="modal-backdrop">
          <div className="modal-producto">
            <img src={productoModal.imagen} alt={productoModal.nombre} className="img-fluid mb-3" />
            <h5 className="fw-bold">{productoModal.nombre}</h5>
            <p className="text-success fw-semibold">${productoModal.precio.toLocaleString("es-AR")}</p>
            <button className="btn btn-primary w-100 mb-2" onClick={() => agregarAlCarrito(productoModal.id)}>Agregar al carrito</button>
            <button className="btn btn-outline-secondary w-100 mt-2" onClick={() => setProductoModal(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productos;







