import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import API from "../api/api";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { user, token } = useContext(AuthContext);

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

  useEffect(() => {
    localStorage.setItem("pedidos", JSON.stringify(historialPedidos));
  }, [historialPedidos]);

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

  const registrarPedido = async (shippingData) => {
    if (carrito.length === 0) return alert("⚠️ El carrito está vacío.");

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

    try {
      const itemsBackend = carrito.map((item) => ({
        product: item.id,
        product_name: item.nombre,
        quantity: item.cantidad,
        price: item.precio,
      }));

      const response = await API.post(
        "/orders/create/",
        { ...shippingData, items: itemsBackend },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        const nuevoPedido = { ...response.data, items: carrito, origen: "backend" };
        setHistorialPedidos((prev) => [...prev, nuevoPedido]);
        limpiarCarrito();
        alert("🎉 ¡Pedido enviado correctamente!");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "❌ No se pudo registrar el pedido en el servidor.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ No se pudo conectar con el servidor.");
    }
  };

  return (
    <CarritoContext.Provider
  value={{
    carrito,
    setCarrito,  // <-- agregar esta línea
    historialPedidos,
    agregarAlCarrito,
    eliminarDelCarrito,
    limpiarCarrito,
    registrarPedido,
    setHistorialPedidos,
  }}
>
  {children}
</CarritoContext.Provider>

  );
}





