import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

export default function Pedidos() {
  const { historialPedidos } = useContext(CarritoContext);

  if (!historialPedidos || historialPedidos.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Historial de pedidos</h2>
        <p>No hay pedidos registrados todavía.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Historial de pedidos</h2>

      {historialPedidos.map((pedido) => (
        <div key={pedido.id} className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">
              Pedido #{pedido.id} — Total: ${Number(pedido.total).toLocaleString()}
            </h5>
            <p className="card-text">
              <strong>Nombre:</strong> {pedido.shipping_name} <br />
              <strong>Dirección:</strong> {pedido.shipping_address}, {pedido.shipping_city} <br />
              <strong>Teléfono:</strong> {pedido.shipping_phone} <br />
              <strong>Método de pago:</strong> {pedido.payment_method} <br />
              <strong>Factura:</strong> {pedido.invoice_type}
            </p>

            {pedido.items && pedido.items.length > 0 && (
              <div className="mt-3">
                <h6>Productos:</h6>
                <ul className="list-group">
                  {pedido.items.map((item, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        <strong>ID Producto:</strong> {item.product}
                      </span>
                      <span>
                        {item.quantity} × ${Number(item.price).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
