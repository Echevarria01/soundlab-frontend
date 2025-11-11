// pages/ConfirmacionCompra.js
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function ConfirmacionCompra() {
  const location = useLocation();
  const pedido = location.state?.pedido;

  if (!pedido) {
    return (
      <div className="container text-center mt-5">
        <h3>No hay pedido para mostrar 😕</h3>
        <Link to="/" className="btn btn-dark mt-3">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-3">✅ ¡Compra confirmada!</h2>
        <p>Gracias por tu pedido, <strong>{pedido.shipping_name}</strong>.</p>
        <p>Recibirás tu pedido en:</p>
        <ul>
          <li><strong>Dirección:</strong> {pedido.shipping_address}</li>
          <li><strong>Ciudad:</strong> {pedido.shipping_city}</li>
          <li><strong>Teléfono:</strong> {pedido.shipping_phone}</li>
        </ul>

        <h4 className="mt-4">🧾 Detalle del pedido</h4>
        <ul className="list-group mb-3">
          {pedido.items.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.product_name} × {item.quantity}
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <h5 className="text-end">
          <strong>Total: ${Number(pedido.total).toFixed(2)}</strong>
        </h5>

        <div className="text-center mt-4">
          <Link to="/" className="btn btn-dark">
            🏠 Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
