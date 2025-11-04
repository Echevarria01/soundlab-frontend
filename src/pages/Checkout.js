import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";

export default function Checkout() {
  const { carrito, setCarrito, historialPedidos, setHistorialPedidos } =
    useContext(CarritoContext);
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    shipping_name: "",
    shipping_address: "",
    shipping_city: "",
    shipping_phone: "",
    payment_method: "Tarjeta",
    invoice_type: "A",
  });

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  // -------------------- MANEJADORES --------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      setMensaje("❌ El carrito está vacío.");
      return;
    }

    const orderData = {
      ...formData,
      items: carrito.map((p) => ({
        product: p.id,
        quantity: p.cantidad || 1,
        price: p.precio || p.price,
      })),
    };

    setLoading(true);
    setMensaje("");
    setPedidoConfirmado(null);

    try {
      // ✅ Enviar pedido al backend Django
      const response = await API.post("/orders/", orderData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      const data = response.data;

      // ✅ Actualizar historial local y contexto
      const nuevoHistorial = [...historialPedidos, data];
      setHistorialPedidos(nuevoHistorial);
      localStorage.setItem("pedidos", JSON.stringify(nuevoHistorial));

      // ✅ Vaciar carrito
      setCarrito([]);
      localStorage.removeItem("carrito");

      setMensaje(`✅ Pedido realizado con éxito. N° de orden: ${data.id}`);
      setPedidoConfirmado(data);
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Error al crear el pedido";
      setMensaje(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- UI --------------------
  return (
    <div className="container mt-4">
      <h2>Finalizar compra</h2>
      <p>Total de productos: {carrito.length}</p>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            name="shipping_name"
            value={formData.shipping_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="shipping_address"
            value={formData.shipping_address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ciudad</label>
          <input
            type="text"
            className="form-control"
            name="shipping_city"
            value={formData.shipping_city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="shipping_phone"
            value={formData.shipping_phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Método de pago</label>
          <select
            className="form-select"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
          >
            <option value="Tarjeta">Tarjeta</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Enviando pedido..." : "Confirmar pedido"}
        </button>
      </form>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

      {/* ✅ Resumen del pedido confirmado */}
      {pedidoConfirmado && (
        <div className="card mt-4 p-3">
          <h5>Resumen del pedido #{pedidoConfirmado.id}</h5>
          <ul className="list-group list-group-flush">
            {pedidoConfirmado.items?.map((item, i) => (
              <li key={i} className="list-group-item">
                {item.product_name || `Producto ID ${item.product}`} —{" "}
                Cantidad: {item.quantity} — ${item.price}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            <strong>Método de pago:</strong> {pedidoConfirmado.payment_method}
          </p>
          <p>
            <strong>Dirección:</strong> {pedidoConfirmado.shipping_address},{" "}
            {pedidoConfirmado.shipping_city}
          </p>
        </div>
      )}
    </div>
  );
}



