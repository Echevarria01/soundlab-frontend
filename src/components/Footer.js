export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">SoundLab</h5>
            <p>
              Tienda especializada en instrumentos musicales y equipos de DJ.
              Calidad y pasión por la música.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Inicio</a></li>
              <li><a href="/productos" className="text-light text-decoration-none">Productos</a></li>
              <li><a href="/login" className="text-light text-decoration-none">Login</a></li>
              <li><a href="/registro" className="text-light text-decoration-none">Registro</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contacto</h5>
            <p>Email: contacto@soundlab.com</p>
            <p>Tel: +54 11 1234 5678</p>
            <p>Buenos Aires, Argentina</p>
          </div>
        </div>
        <hr className="border-secondary" />
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} SoundLab. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
