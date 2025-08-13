import { Link } from "react-router-dom";

export default function Productos() {
  const productos = [
    {
      id: 1,
      nombre: "Guitarra Fender Stratocaster",
      descripcion: "Guitarra eléctrica Fender Stratocaster, sonido clásico y versátil.",
      precio: 1200,
      imagen: "https://via.placeholder.com/400x300?text=Guitarra+Fender",
    },
    {
      id: 2,
      nombre: "Controlador DJ Pioneer DDJ-400",
      descripcion: "Controlador DJ de 2 canales con funciones profesionales.",
      precio: 650,
      imagen: "https://via.placeholder.com/400x300?text=Controlador+Pioneer",
    },
    {
      id: 3,
      nombre: "Micrófono Shure SM58",
      descripcion: "Micrófono dinámico ideal para voces en vivo y estudio.",
      precio: 120,
      imagen: "https://via.placeholder.com/400x300?text=Microfono+Shure",
    },
    {
      id: 4,
      nombre: "Batería Electrónica Roland TD-1K",
      descripcion: "Kit de batería electrónica compacto y silencioso.",
      precio: 850,
      imagen: "https://via.placeholder.com/400x300?text=Bateria+Roland",
    },
    {
      id: 5,
      nombre: "Teclado MIDI AKAI MPK Mini",
      descripcion: "Teclado controlador MIDI compacto de 25 teclas.",
      precio: 150,
      imagen: "https://via.placeholder.com/400x300?text=Teclado+AKAI",
    },
    {
      id: 6,
      nombre: "Auriculares Audio-Technica ATH-M50x",
      descripcion: "Auriculares profesionales de monitoreo de estudio.",
      precio: 180,
      imagen: "https://via.placeholder.com/400x300?text=Auriculares+ATH-M50x",
    },
  ];

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Instrumentos y Equipos de DJ</h1>
      <div className="row">
        {productos.map((producto) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={producto.id}>
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
                <Link
                  to={`/producto/${producto.id}`}
                  className="btn btn-primary"
                >
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
