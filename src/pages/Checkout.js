// pages/Checkout.js
import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { carrito, registrarPedido } = useContext(CarritoContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    shipping_name: user?.username || "",
    shipping_address: "",
    shipping_city: "",
    shipping_phone: "",
    payment_method: "transfer",
    card_number: "",
    card_name: "",
    card_expiration: "",
    card_cvc: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // <-- NUEVO

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // <-- LIMPIA MENSAJE PREVIO

    if (carrito.length === 0) return setError("El carrito está vacío.");

    const {
      shipping_name,
      shipping_address,
      shipping_city,
      shipping_phone,
      payment_method,
    } = shippingData;

    if (!shipping_name || !shipping_address || !shipping_city || !shipping_phone) {
      return setError("Debes completar todos los datos de envío.");
    }

    if (payment_method === "credit_card" || payment_method === "debit_card") {
      if (
        !shippingData.card_number ||
        !shippingData.card_name ||
        !shippingData.card_expiration ||
        !shippingData.card_cvc
      ) {
        return setError("Debes completar los datos de la tarjeta.");
      }
    }

    try {
      setLoading(true);
      const pedidoConfirmado = await registrarPedido(shippingData);

      if (pedidoConfirmado.ok) {
        // Mostramos un alert verde de confirmación
        setSuccessMessage(pedidoConfirmado.message || "✅ Pedido realizado con éxito!");
        // Redirigimos después de 2s
        setTimeout(() => {
          navigate("/confirmacion-compra", { state: { pedido: pedidoConfirmado.pedido } });
        }, 2000);
      } else {
        setError(pedidoConfirmado.message || "❌ Error al confirmar el pedido.");
      }

    } catch (err) {
      console.error(err);
      setError("❌ Error al confirmar el pedido.");
    } finally {
      setLoading(false);
    }
  };

  const isCard =
    shippingData.payment_method === "credit_card" ||
    shippingData.payment_method === "debit_card";

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
          {/* ------------------ ALERTA DE ÉXITO ------------------ */}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

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

            {isCard && (
              <div className="border p-3 rounded mb-3 bg-light">
                <h5>Datos de la tarjeta</h5>

                <input
                  type="text"
                  name="card_number"
                  placeholder="Número de tarjeta"
                  className="form-control mb-2"
                  value={shippingData.card_number}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="card_name"
                  placeholder="Nombre del titular"
                  className="form-control mb-2"
                  value={shippingData.card_name}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="card_expiration"
                  placeholder="MM/AA"
                  className="form-control mb-2"
                  value={shippingData.card_expiration}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="card_cvc"
                  placeholder="CVC"
                  className="form-control"
                  value={shippingData.card_cvc}
                  onChange={handleChange}
                />
              </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? "Procesando..." : "Confirmar pedido"}
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <h4>🛍️ Resumen del carrito</h4>

          {carrito.map((item) => (
            <div key={item.id} className="d-flex align-items-center border rounded p-2 mb-2">
              <img
                src={item.image}
                alt={item.name}
                width="70"
                className="me-3 rounded"
                style={{ objectFit: "cover" }}
              />
              <div>
                <p className="m-0 fw-bold">{item.name}</p>
                <p className="m-0">Cantidad: {item.quantity}</p>
                <p className="m-0">Precio: ${item.price}</p>
                <p className="m-0 text-success">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <h4 className="text-end mt-3">Total: ${total.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}















