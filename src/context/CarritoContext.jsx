import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "../api";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { user, token } = useContext(AuthContext);

  const [carrito, setCarrito] = useState([]);
  const [historialPedidos, setHistorialPedidos] = useState([]);

  // Cargar carrito y pedidos desde LocalStorage
  useEffect(() => {
    const carritoLS = localStorage.getItem("carrito");
    if (carritoLS) setCarrito(JSON.parse(carritoLS));

    const pedidosLS = localStorage.getItem("pedidos");
    if (pedidosLS) setHistorialPedidos(JSON.parse(pedidosLS));
  }, []);

  // Guardar carrito en LocalStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Guardar pedidos en LocalStorage
  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(historialPedidos));
  }, [historialPedidos]);


  // 🟦 OBTENER PEDIDOS REALES DEL BACKEND CUANDO EL USUARIO INICIA SESIÓN
  useEffect(() => {
    async function cargarPedidosBackend() {
      if (!user || !token) return;

      try {
        const pedidosBackend = await apiFetch("/orders/");
        console.log("Pedidos recibidos desde el backend:", pedidosBackend);

        setHistorialPedidos(pedidosBackend);
        localStorage.setItem("pedidos", JSON.stringify(pedidosBackend));

      } catch (error) {
        console.error("Error cargando pedidos:", error);
      }
    }

    cargarPedidosBackend();
  }, [user, token]);


  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (idProducto) => {
    setCarrito((prev) => prev.filter((item) => item.id !== idProducto));
  };

  const limpiarCarrito = () => setCarrito([]);


  // Registrar pedido (local o backend)
  const registrarPedido = async (shippingData) => {
    if (carrito.length === 0) return alert("⚠️ El carrito está vacío.");

    // Usuario NO logueado → guardar local
    if (!user || !token) {
      const nuevoPedido = {
        id: Date.now(),
        items: carrito,
        fecha: new Date().toLocaleString(),
        total: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
        origen: "local",
        shipping: shippingData || {},
      };
      setHistorialPedidos((prev) => [...prev, nuevoPedido]);
      limpiarCarrito();
      return alert("🛍️ Pedido registrado localmente.");
    }

    // Usuario logueado → enviar a backend
    try {
      const itemsBackend = carrito.map((item) => ({
        product: item.id,
        product_name: item.nombre,
        quantity: item.cantidad,
        price: item.precio,
      }));

      const response = await apiFetch("/orders/", {
        method: "POST",
        body: JSON.stringify({ ...shippingData, items: itemsBackend }),
      });

      const nuevoPedido = { ...response, origen: "backend" };

      setHistorialPedidos((prev) => [...prev, nuevoPedido]);
      limpiarCarrito();

      alert("🎉 ¡Pedido enviado correctamente!");

    } catch (err) {
      console.error(err);
      alert("❌ No se pudo conectar con el servidor.");
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






