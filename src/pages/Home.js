import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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

export default function Home() {
  const imagenes = [
    banner1, banner2, banner3, banner4, banner5,
    banner6, banner7, banner8, banner9, banner10
  ];

  const [index, setIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const [mostrarSaludo, setMostrarSaludo] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  // Cambio automático de fondo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

  // Mostrar saludo temporal cuando el usuario inicia sesión
  useEffect(() => {
    if (user) {
      setMostrarSaludo(true);
      const timer = setTimeout(() => setMostrarSaludo(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Búsqueda de productos
  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== "") {
      navigate(`/productos?q=${encodeURIComponent(busqueda.trim())}`);
    }
  };

  return (
    <div>
      <div
        className="text-center py-5 position-relative"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          overflow: "hidden",
          position: "relative"
        }}
      >
        {/* 🖼️ Fondos con fade suave */}
        {imagenes.map((img, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: i === index ? 1 : 0,
              transition: "opacity 2s ease-in-out",
            }}
          ></div>
        ))}

        {/* 👋 Saludo animado */}
        {mostrarSaludo && (
          <div className="saludo-bienvenida">
            👋 ¡Bienvenido, {user?.username || "músico"}!
          </div>
        )}

        {/* 🔍 Barra de búsqueda arriba */}
        <form
          onSubmit={handleBuscar}
          className="mt-4"
          style={{
            zIndex: 3,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px 20px",
            borderRadius: "30px",
            backdropFilter: "blur(5px)",
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: "300px",
              borderRadius: "25px",
              padding: "10px 20px",
              border: "2px solid white",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              backdropFilter: "blur(4px)",
            }}
          />
          <button
            type="submit"
            className="btn btn-light"
            style={{ borderRadius: "25px", fontWeight: "600" }}
          >
            Buscar
          </button>
        </form>

        {/* 🎶 Logo flotante */}
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "25px",
            borderRadius: "15px",
            zIndex: 2,
          }}
        >
          <img
            src={logo}
            alt="SoundLab Logo"
            style={{
              width: "450px",
              animation: "float 3s ease-in-out infinite",
            }}
          />
        </div>

        {/* Texto principal */}
        <p
          style={{
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "600",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "8px 16px",
            borderRadius: "10px",
            zIndex: 2,
          }}
        >
          Tienda Oficial
        </p>

        <p
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "500",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "10px 20px",
            borderRadius: "10px",
            zIndex: 2,
          }}
        >
          Instrumentos, Audio y Accesorios
        </p>

        {/* 💬 CTA */}
        <p
          style={{
            color: "#ddd",
            fontSize: "1.1rem",
            backgroundColor: "rgba(0,0,0,0.3)",
            padding: "8px 16px",
            borderRadius: "8px",
            zIndex: 2,
            marginTop: "10px",
          }}
        >
          Descubrí el mejor sonido al mejor precio 🎶
        </p>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }

          .saludo-bienvenida {
            position: absolute;
            top: 20px;
            background-color: rgba(0,0,0,0.7);
            padding: 10px 25px;
            border-radius: 20px;
            color: white;
            font-size: 1.1rem;
            font-weight: 500;
            z-index: 3;
            backdrop-filter: blur(5px);
            animation: slideDownFade 0.8s ease forwards;
          }

          @keyframes slideDownFade {
            from {
              transform: translateY(-15px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          input[type="text"]:focus {
            outline: none;
            border-color: #00ffcc;
            box-shadow: 0 0 8px #00ffcc;
          }

          input::placeholder {
            color: rgba(255,255,255,0.7);
          }
        `}
      </style>
    </div>
  );
}









