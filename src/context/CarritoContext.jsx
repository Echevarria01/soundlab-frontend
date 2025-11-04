import { createContext, useState, useEffect } from "react";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [historialPedidos, setHistorialPedidos] = useState([]);

  useEffect(() => {
    const carritoLS = localStorage.getItem("carrito");
    if (carritoLS) setCarrito(JSON.parse(carritoLS));

    const pedidosLS = localStorage.getItem("pedidos");
    if (pedidosLS) setHistorialPedidos(JSON.parse(pedidosLS));
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{ carrito, setCarrito, historialPedidos, setHistorialPedidos }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
