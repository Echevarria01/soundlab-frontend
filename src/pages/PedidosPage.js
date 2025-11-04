import React, { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";

export default function PedidosPage() {
  const { historialPedidos } = useContext(CarritoContext);
  const [pedidoActivo, setPedidoActivo] = useState(null); // ID del pedido expandido

  if (!historialPedidos || historialPedidos.length === 0) {
    return (
      <div className="container mt-4">
        <h2>Historial de pedidos</h2>
        <p className="text-muted">Aún no realizaste ningún pedido.</p>
      </div>
    );
  }

  const toggleDetalle = (id) => {
    setPedidoActivo(pedidoActivo === id ? null : id);
  };

  return (
    <div className="container mt-4">
      <h2>📦 Historial de pedidos</h2>

      {historialPedidos.map((pedido) => (
        <div
          key={pedido.id}
          className="card mb-3 shadow-sm border-0"
          style={{ borderRadius: "15px" }}
        >
          <div
            className="card-body"
            style={{ cursor: "pointer" }}
            onClick={() => toggleDetalle(pedido.id)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">
                Pedido N° {pedido.id} — {pedido.payment_method}
              </h5>
              <span>{pedidoActivo === pedido.id ? "▲" : "▼"}</span>
            </div>

            {/* Detalle expandido */}
            {pedidoActivo === pedido.id && (
              <div className="mt-3">
                <p className="mb-1">
                  <strong>Nombre:</strong> {pedido.shipping_name}
                </p>
                <p className="mb-1">
                  <strong>Dirección:</strong> {pedido.shipping_address},{" "}
                  {pedido.shipping_city}
                </p>
                <p className="mb-2">
                  <strong>Teléfono:</strong> {pedido.shipping_phone}
                </p>

                <h6>🛒 Productos:</h6>
                <ul className="list-group list-group-flush mb-2">
                  {pedido.items?.map((item, i) => (
                    <li key={i} className="list-group-item">
                      {item.product_name || `Producto ID ${item.product}`} —{" "}
                      {item.quantity} × ${item.price}
                    </li>
                  ))}
                </ul>

                <p className="fw-bold">
                  Total: $
                  {pedido.items
                    ?.reduce(
                      (total, item) =>
                        total + item.price * (item.quantity || 1),
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

