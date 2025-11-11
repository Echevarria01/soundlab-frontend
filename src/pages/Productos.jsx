import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Productos.css";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");

  const { agregarAlCarrito } = useContext(CarritoContext);
  const { user } = useContext(AuthContext); // <-- AuthContext
  const navigate = useNavigate();
  const location = useLocation();

  // -------------------- CARGA DE PRODUCTOS --------------------
  useEffect(() => {
    const productosData = [
      { id: 1, nombre: "Amplificador Para Bajo Eléctrico 15 Watts 2 X 5 Laney LX15B", precio: 150000, category: { name: "Amplificadores" }, image: "/img/Productos/amplificador_para_bajo_electrico_15_watts_2_x_5_laney_lx15b.jpg" },
      { id: 2, nombre: "Amplificador Para Guitarra 25 Watts Parlante de 8", precio: 180000, category: { name: "Amplificadores" }, image: "/img/Productos/amplificador_para_guitarra_25_watts_parlante_de_8.jpg" },
      { id: 3, nombre: "Amplificador Para Guitarra Eléctrica Combo 100W Marshall MG101CFX", precio: 250000, category: { name: "Amplificadores" }, image: "/img/Productos/amplificador_para_guitarra_electrica_combo_100w_marshall_mg101cfx.jpg" },
      { id: 4, nombre: "Auricular De Estudio Cerrados AKG K72", precio: 75000, category: { name: "Auriculares" }, image: "/img/Productos/auricular_de_estudio_cerrados_akg_k72.jpg" },
      { id: 5, nombre: "Auriculares De Estudio Profesional AUDIO TECHNICA ATH-M20X", precio: 110000, category: { name: "Auriculares" }, image: "/img/Productos/athmx.jpg" },
      { id: 6, nombre: "Auriculares De Estudio Profesional AUDIO TECHNICA ATH-M50X", precio: 150000, category: { name: "Auriculares" }, image: "/img/Productos/athmxx.jpg" },
      { id: 7, nombre: "Bajo Eléctrico Pj Cort Action Bass Plus", precio: 320000, category: { name: "Bajos" }, image: "/img/Productos/bajo_electrico_pj_cort_action_bass_plus.jpg" },
      { id: 8, nombre: "Bajo Eléctrico Precision Modern Pickguard Negro SX SBM22TS", precio: 295000, category: { name: "Bajos" }, image: "/img/Productos/bajo_electrico_precision_modern_pickguard_negro_sx_sbm23ts.jpg" },
      { id: 9, nombre: "BATERIA MAPEX", precio: 480000, category: { name: "Baterías" }, image: "/img/Productos/bateria_mapex.jpg" },
      { id: 10, nombre: "Guitarra Eléctrica Les Paul SX EF30-CS", precio: 340000, category: { name: "Guitarras" }, image: "/img/Productos/les_paul.jpg" },
      { id: 11, nombre: "Guitarra Eléctrica Stratocaster SX SST62 Con Funda", precio: 280000, category: { name: "Guitarras" }, image: "/img/Productos/guitarra_electrica_stratocaster_sx_sst62_con_funda.jpg" },
      { id: 12, nombre: "Guitarra Eléctrica Súper Strato Rock Newen", precio: 310000, category: { name: "Guitarras" }, image: "/img/Productos/guitarra_electrica_super_strato_rock_newen.jpg" },
      { id: 13, nombre: "Guitarra Electro Acústica Ecualizador Con Funda Cort AD810E-BKS", precio: 250000, category: { name: "Guitarras" }, image: "/img/Productos/guitarra_electro_acustica_ecualizador_con_funda_cort_.jpg" },
      { id: 14, nombre: "Guitarra Electro Acústica Ecualizador Con Funda Cort AF510E-OP", precio: 245000, category: { name: "Guitarras" }, image: "/img/Productos/guitarra_electro_acustica_ecualizador_con_funda_cort__.jpg" },
      { id: 15, nombre: "Micrófono Condenser Cardioide USB Maono AU-PM421", precio: 120000, category: { name: "Micrófonos" }, image: "/img/Productos/kit_pack_microfono_condenser_cardioide_usb_maono_.jpg" },
      { id: 16, nombre: "Micrófono Condenser Cardioide Estudio Profesional AUDIO TECHNICA AT2020", precio: 180000, category: { name: "Micrófonos" }, image: "/img/Productos/microfono_condenser_cardioide_estudio_profesional_audio_technica_at2020.jpg" },
      { id: 17, nombre: "Micrófono Dinámico Cardioide Estudio Podcast XLR USB Shure MV7+K", precio: 230000, category: { name: "Micrófonos" }, image: "/img/Productos/microfono_dinamico_cardioide_estudio_podcast_xlr_usb_con_control_.jpg" },
      { id: 18, nombre: "MONITOR GENELEC 8010A", precio: 370000, category: { name: "Monitores" }, image: "/img/Productos/monitor_genelec_8010a.jpg" },
      { id: 19, nombre: "MONITORES MACKIE CR3-X (AR)", precio: 290000, category: { name: "Monitores" }, image: "/img/Productos/monitores_mackie_.jpg" },
      { id: 20, nombre: "Monitores KRK", precio: 410000, category: { name: "Monitores" }, image: "/img/Productos/monitoreskrk.jpg" },
      { id: 21, nombre: "Pioneer DDJ 800", precio: 500000, category: { name: "DJ" }, image: "/img/Productos/pioneer_ddj_800.jpg" },
    ];

    const categoriasData = [
      { id: 1, name: "Amplificadores" },
      { id: 2, name: "Auriculares" },
      { id: 3, name: "Bajos" },
      { id: 4, name: "Baterías" },
      { id: 5, name: "Guitarras" },
      { id: 6, name: "Micrófonos" },
      { id: 7, name: "Monitores" },
      { id: 8, name: "DJ" },
    ];

    setProductos(productosData);
    setCategorias(categoriasData);
  }, []);

  // -------------------- BÚSQUEDA DESDE URL --------------------
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setBusqueda(query);
  }, [location.search]);

  // -------------------- FILTRADO --------------------
  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria =
      categoriaSeleccionada === "Todos" || prod.category?.name === categoriaSeleccionada;
    const coincideBusqueda = prod.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // -------------------- AGREGAR AL CARRITO --------------------
  const handleAgregar = (e, prod) => {
    e.stopPropagation();

    if (!user) {
      // Si no está logueado, redirigir a login
      navigate("/login");
      return;
    }

    agregarAlCarrito({
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      imagen: prod.image,
    });

    setMensaje(`✅ ${prod.nombre} agregado al carrito`);
    setTimeout(() => setMensaje(""), 2500);
  };

  return (
    <div className="container my-5">
      {mensaje && (
        <div
          className="alert alert-success text-center fw-semibold fixed-top mt-3 mx-auto"
          style={{ width: "fit-content", zIndex: 1050 }}
        >
          {mensaje}
        </div>
      )}

      <h2 className="text-center mb-4">🎸 Nuestros Productos</h2>

      {busqueda && (
        <p className="text-center text-muted mb-3">
          Resultados de búsqueda para: <strong>{busqueda}</strong>
        </p>
      )}

      <div className="mb-3 text-center">
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

      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="form-control d-inline-block w-auto shadow-sm"
          style={{ minWidth: "300px" }}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {productosFiltrados.length === 0 && (
        <p className="text-center text-muted">
          No se encontraron productos con esos criterios.
        </p>
      )}

      <div className="row g-4">
        {productosFiltrados.map((prod) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
            <div
              className="card h-100 shadow-sm producto-card-hover"
              onClick={() => navigate(`/producto/${prod.id}`)}
              style={{ cursor: "pointer", transition: "transform 0.3s" }}
            >
              <div className="overflow-hidden">
                <img
                  src={prod.image}
                  className="card-img-top producto-img"
                  alt={prod.nombre}
                  style={{ transition: "transform 0.3s" }}
                />
              </div>
              <div className="card-body text-center">
                <span className="badge bg-primary mb-2">{prod.category?.name}</span>
                <h5 className="card-title" style={{ minHeight: "3rem" }}>{prod.nombre}</h5>
                <p className="text-muted fw-bold">${parseFloat(prod.precio).toLocaleString()}</p>
                <button
                  className="btn btn-outline-primary btn-sm w-100"
                  onClick={(e) => handleAgregar(e, prod)}
                >
                  🛒 Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;



























