import { useState, useEffect } from "react";
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

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, []);

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
        {/* Fondos con fade independiente */}
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

        {/* Logo (flota siempre) */}
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "25px",
            borderRadius: "15px",
            zIndex: 2
          }}
        >
          <img
            src={logo}
            alt="SoundLab Logo"
            style={{
              width: "450px",
              animation: "float 3s ease-in-out infinite"
            }}
          />
        </div>

        {/* Tienda Oficial */}
        <p
          style={{
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "600",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "8px 16px",
            borderRadius: "10px",
            zIndex: 2
          }}
        >
          Tienda Oficial
        </p>

        {/* Texto principal */}
        <p
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "500",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: "10px 20px",
            borderRadius: "10px",
            zIndex: 2
          }}
        >
          Instrumentos, Audio Y Accesorios.
        </p>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
}





