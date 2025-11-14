// pages/Checkout.js
import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

export default function Checkout() {
  const { carrito, limpiarCarrito, setHistorialPedidos } = useContext(CarritoContext);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    shipping_name: user?.username || "",
    shipping_address: "",
    shipping_city: "",
    shipping_phone: "",
    payment_method: "transfer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!token) {
      return setError("Debes iniciar sesión para confirmar el pedido.");
    }

    if (carrito.length === 0) {
      return setError("El carrito está vacío.");
    }

    const { shipping_name, shipping_address, shipping_city, shipping_phone, payment_method } = shippingData;

    if (!shipping_name || !shipping_address || !shipping_city || !shipping_phone) {
      return setError("Debes completar todos los datos de envío.");
    }

    setLoading(true);

    try {
      // Formatear items como tu backend los espera
      const items = carrito.map((item) => ({
        product: item.id,
        quantity: item.cantidad,
      }));

      // 🚀 Llamada correcta SIN HEADERS (apiFetch los agrega)
      const nuevoPedido = await apiFetch("/orders/", {
        method: "POST",
        body: JSON.stringify({
          shipping_name,
          shipping_address,
          shipping_city,
          shipping_phone,
          payment_method,
          items,
        }),
      });

      // Actualiza historial de pedidos
      setHistorialPedidos((prev) => [...prev, nuevoPedido]);

      localStorage.setItem(
        "pedidos",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("pedidos") || "[]"),
          nuevoPedido,
        ])
      );

      limpiarCarrito();
      navigate("/confirmacion-compra", { state: { pedido: nuevoPedido } });

    } catch (err) {
      console.error("ERROR SERVIDOR:", err);

      if (err.message.includes("API error")) {
        setError("❌ " + err.message);
      } else {
        setError("❌ Error al conectar con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Tu carrito está vacío 🛒</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>🧾 Finalizar compra</h2>

      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                name="shipping_name"
                className="form-control"
                value={shippingData.shipping_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                name="shipping_address"
                className="form-control"
                value={shippingData.shipping_address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ciudad</label>
              <input
                type="text"
                name="shipping_city"
                className="form-control"
                value={shippingData.shipping_city}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                name="shipping_phone"
                className="form-control"
                value={shippingData.shipping_phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Método de pago</label>
              <select
                name="payment_method"
                className="form-select"
                value={shippingData.payment_method}
                onChange={handleChange}
              >
                <option value="transfer">Transferencia bancaria</option>
                <option value="credit_card">Tarjeta de crédito</option>
                <option value="debit_card">Tarjeta de débito</option>
                <option value="cash">Efectivo</option>
              </select>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? "Procesando..." : "Confirmar pedido"}
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <h4>🛍️ Resumen del carrito</h4>
          <h5 className="text-end">Total: ${total.toFixed(2)}</h5>
        </div>
      </div>
    </div>
  );
}














