// pages/Checkout.js
import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Checkout() {
  const { carrito, limpiarCarrito, eliminarDelCarrito, setHistorialPedidos } =
    useContext(CarritoContext);
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    shipping_name: user?.username || "",
    shipping_address: "",
    shipping_city: "",
    shipping_phone: "",
    payment_method: "transfer", // 🔹 coincide con backend
    card_number: "",
    card_expiry: "",
    card_cvv: "",
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

  if (!token) return setError("Debes iniciar sesión para confirmar el pedido.");
  if (carrito.length === 0) return setError("El carrito está vacío.");

  const {
    shipping_name,
    shipping_address,
    shipping_city,
    shipping_phone,
    payment_method,
  } = shippingData;

  if (!shipping_name || !shipping_address || !shipping_city || !shipping_phone || !payment_method) {
    return setError("Debes completar todos los datos de envío y método de pago.");
  }

  setLoading(true);
  try {
    const items = carrito.map((item) => ({
      product: item.id,
      quantity: item.cantidad,
    }));

    const response = await API.post(
      "/orders/",
      {
        shipping_name,
        shipping_address,
        shipping_city,
        shipping_phone,
        payment_method,
        items,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 201 || response.status === 200) {
      const nuevoPedido = response.data;

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
    } else {
      setError("❌ No se pudo registrar el pedido. Intenta nuevamente.");
    }
  } catch (err) {
    console.error(err);
    setError("❌ Error al conectar con el servidor.");
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
            {/* --- Datos de envío --- */}
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                name="shipping_name"
                className="form-control"
                value={shippingData.shipping_name}
                onChange={handleChange}
                required
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
                required
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
                required
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
                required
              />
            </div>

            {/* --- Método de pago --- */}
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

            {/* --- Campos de tarjeta --- */}
            {(shippingData.payment_method === "credit_card" ||
              shippingData.payment_method === "debit_card") && (
              <>
                <div className="mb-3">
                  <label className="form-label">Número de tarjeta</label>
                  <input
                    type="text"
                    name="card_number"
                    className="form-control"
                    value={shippingData.card_number}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha de expiración</label>
                  <input
                    type="text"
                    name="card_expiry"
                    className="form-control"
                    value={shippingData.card_expiry}
                    onChange={handleChange}
                    placeholder="MM/AA"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">CVV</label>
                  <input
                    type="text"
                    name="card_cvv"
                    className="form-control"
                    value={shippingData.card_cvv}
                    onChange={handleChange}
                    placeholder="123"
                  />
                </div>
              </>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            <button
              type="submit"
              className="btn btn-dark w-100"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar pedido"}
            </button>
          </form>
        </div>

        {/* --- Resumen del carrito --- */}
        <div className="col-md-6">
          <h4>🛍️ Resumen del carrito</h4>
          <ul className="list-group mb-3">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.nombre} × {item.cantidad}
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    ❌
                  </button>
                </div>
                <span>${(item.precio * item.cantidad).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h5 className="text-end">Total: ${total.toFixed(2)}</h5>
          <button
            className="btn btn-secondary w-100 mt-2"
            onClick={limpiarCarrito}
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
}












