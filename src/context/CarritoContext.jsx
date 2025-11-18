import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "../api";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { user, token } = useContext(AuthContext);

  const [carrito, setCarrito] = useState([]);
  const [historialPedidos, setHistorialPedidos] = useState([]);

  // Cargar datos desde LocalStorage al iniciar
  useEffect(() => {
    const carritoLS = localStorage.getItem("carrito");
    if (carritoLS) setCarrito(JSON.parse(carritoLS));

    const pedidosLS = localStorage.getItem("pedidos");
    if (pedidosLS) setHistorialPedidos(JSON.parse(pedidosLS));
  }, []);

  // Guardar carrito automáticamente
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Guardar pedidos automáticamente
  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(historialPedidos));
  }, [historialPedidos]);

  // Cargar pedidos del backend si hay usuario logueado
  useEffect(() => {
    async function cargarPedidosBackend() {
      if (!user || !token) return;

      try {
        const pedidosBackend = await apiFetch("/orders/");
        setHistorialPedidos(pedidosBackend);
        localStorage.setItem("pedidos", JSON.stringify(pedidosBackend));
      } catch (error) {
        console.error("Error cargando pedidos:", error);
      }
    }
    cargarPedidosBackend();
  }, [user, token]);

  // --------------------------------------
  // AGREGAR AL CARRITO — VERSION CORREGIDA
  // --------------------------------------
const agregarAlCarrito = (producto) => {
  const item = {
    id: producto.id,
    name: producto.name || producto.nombre,
    price: producto.price || producto.precio,
    image: producto.image || producto.imagen,
    quantity: 1,
  };

  setCarrito((prev) => {
    const existente = prev.find((p) => p.id === item.id);

    if (existente) {
      return prev.map((p) =>
        p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    }

    return [...prev, item];
  });
};


  // Eliminar del carrito
  const eliminarDelCarrito = (idProducto) => {
    setCarrito((prev) => prev.filter((item) => item.id !== idProducto));
  };

  // Limpiar todo el carrito
  const limpiarCarrito = () => setCarrito([]);

  // --------------------------------------
  // REGISTRAR PEDIDO — VERSION CORREGIDA
  // --------------------------------------
const registrarPedido = async (shippingData) => {
  if (carrito.length === 0) {
    return { ok: false, message: "⚠️ El carrito está vacío." };
  }

  if (!user || !token) {
    const nuevoPedido = {
      id: Date.now(),
      items: carrito,
      fecha: new Date().toLocaleString(),
      total: carrito.reduce((acc, item) => acc + item.price * item.quantity, 0),
      origen: "local",
      shipping: shippingData || {},
    };

    setHistorialPedidos((prev) => [...prev, nuevoPedido]);
    limpiarCarrito();
    return { ok: true, pedido: nuevoPedido, message: "Pedido guardado localmente." };
  }

  try {
    const itemsBackend = carrito.map((item) => ({
      product: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const response = await apiFetch("/orders/", {
      method: "POST",
      body: JSON.stringify({ ...shippingData, items: itemsBackend }),
    });

    const nuevoPedido = { ...response, origen: "backend" };
    setHistorialPedidos((prev) => [...prev, nuevoPedido]);
    limpiarCarrito();

    return { ok: true, pedido: nuevoPedido, message: "Pedido realizado con éxito." };
  } catch (err) {
    console.error(err);
    return { ok: false, message: "❌ Error enviando el pedido." };
  }
};


  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        historialPedidos,
        setHistorialPedidos,
        agregarAlCarrito,
        eliminarDelCarrito,
        limpiarCarrito,
        registrarPedido,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}






