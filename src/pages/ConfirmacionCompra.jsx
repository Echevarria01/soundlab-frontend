import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ConfirmacionCompra() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(location.state?.pedido || null);

  // 🔹 Recuperar pedido desde localStorage si recarga la página
  useEffect(() => {
    if (!pedido) {
      const pedidosGuardados = JSON.parse(localStorage.getItem("pedidos") || "[]");
      if (pedidosGuardados.length > 0) {
        setPedido(pedidosGuardados[pedidosGuardados.length - 1]);
      } else {
        navigate("/"); // Redirigir si no hay pedido
      }
    }
  }, [pedido, navigate]);

  // Verificar si el pedido es nulo o está vacío
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

  // Traducir estado del pedido
  const traducirEstado = (status) => {
    switch (status) {
      case "paid":
        return "Pagado";
      case "cancelled":
        return "Cancelado";
      case "rejected":
        return "Rechazado";
      case "pending":
      default:
        return "Pendiente";
    }
  };

  // Asegurarse de que el pedido tiene productos y que `items` es un array
  if (!Array.isArray(pedido.items) || pedido.items.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h3>Error: No hay productos en el pedido.</h3>
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
          {pedido.items.map((item, index) => (
            <li
              key={index} // Usar índice como clave
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.product_name || item.product?.name} × {item.quantity}
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <h5 className="text-end">
          <strong>Total: ${
            Number(
              pedido.total ||
              pedido.items.reduce(
                (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
                0
              )
            ).toFixed(2)
          }</strong>
        </h5>

        <h6 className="mt-2">
          Estado del pedido:{" "}
          <span className="badge bg-success">{traducirEstado(pedido.status)}</span>
        </h6>

        <div className="text-center mt-4">
          <Link to="/" className="btn btn-dark">
            🏠 Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}


