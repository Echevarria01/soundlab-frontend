import { useParams, Link } from "react-router-dom";

export default function ProductoDetalle() {
  const { id } = useParams();

  // Lista de productos de ejemplo
  const productos = [
    {
      id: 1,
      nombre: "Guitarra Fender Stratocaster",
      descripcion: "Guitarra eléctrica Fender Stratocaster, sonido clásico y versátil. Ideal para rock, blues y pop.",
      precio: 1200,
      imagen: "https://via.placeholder.com/600x400?text=Guitarra+Fender",
    },
    {
      id: 2,
      nombre: "Controlador DJ Pioneer DDJ-400",
      descripcion: "Controlador DJ de 2 canales con jog wheels, mixer integrado y compatibilidad con Rekordbox.",
      precio: 650,
      imagen: "https://via.placeholder.com/600x400?text=Controlador+Pioneer",
    },
    {
      id: 3,
      nombre: "Micrófono Shure SM58",
      descripcion: "Micrófono dinámico con patrón cardioide, excelente para voces en vivo y grabación.",
      precio: 120,
      imagen: "https://via.placeholder.com/600x400?text=Microfono+Shure",
    },
    {
      id: 4,
      nombre: "Batería Electrónica Roland TD-1K",
      descripcion: "Kit compacto con pads silenciosos, ideal para practicar en casa sin molestar.",
      precio: 850,
      imagen: "https://via.placeholder.com/600x400?text=Bateria+Roland",
    },
    {
      id: 5,
      nombre: "Teclado MIDI AKAI MPK Mini",
      descripcion: "Teclado controlador MIDI portátil con pads y knobs asignables.",
      precio: 150,
      imagen: "https://via.placeholder.com/600x400?text=Teclado+AKAI",
    },
    {
      id: 6,
      nombre: "Auriculares Audio-Technica ATH-M50x",
      descripcion: "Auriculares de monitoreo con sonido balanceado y gran aislamiento.",
      precio: 180,
      imagen: "https://via.placeholder.com/600x400?text=Auriculares+ATH-M50x",
    },
  ];

  // Buscar el producto según el ID
  const producto = productos.find((p) => p.id === parseInt(id));

  if (!producto) {
    return (
      <div className="container mt-5">
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className="btn btn-secondary mt-3">
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h1>{producto.nombre}</h1>
          <p className="text-muted">{producto.descripcion}</p>
          <h3 className="text-success fw-bold">${producto.precio}</h3>
          <div className="mt-4">
            <button className="btn btn-primary me-3">Agregar al carrito</button>
            <Link to="/productos" className="btn btn-outline-secondary">
              Volver a productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

