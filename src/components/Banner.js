import banner1 from "../assets/banners/banner1.jpg";
import banner2 from "../assets/banners/banner2.jpg";
import banner3 from "../assets/banners/banner3.jpg";
import banner4 from "../assets/banners/banner4.jpg";
import banner5 from "../assets/banners/banner5.jpg";
import banner6 from "../assets/banners/banner6.jpg";
import banner7 from "../assets/banners/banner7.jpg";
import banner8 from "../assets/banners/banner8.jpg";
import banner9 from "../assets/banners/banner9.jpg";
import banner10 from "../assets/banners/banner10.jpg";
import logo from "../assets/logo/soundlab.png";
import "./Banner.css";

export default function Banner() {
  const banners = [
    banner1, banner2, banner3, banner4, banner5,
    banner6, banner7, banner8, banner9, banner10
  ];

  return (
    <div id="bannerCarousel" className="carousel slide mb-4 position-relative" data-bs-ride="carousel">
      <div className="carousel-inner">
        {banners.map((img, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img
              src={img}
              className="d-block w-100"
              alt={`Banner ${index + 1}`}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Logo flotante */}
      <div className="position-absolute top-50 start-50 translate-middle text-center" style={{ zIndex: 10 }}>
        <img
          src={logo}
          alt="SoundLab"
          className="logo-float"
          style={{
            maxWidth: "350px",
            filter: "drop-shadow(2px 2px 8px rgba(0,0,0,0.6))",
          }}
        />
        <p className="text-white mt-3 fs-4 fw-bold">
          Instrumentos y Equipos Profesionales
        </p>
      </div>

      {/* Controles */}
      <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

