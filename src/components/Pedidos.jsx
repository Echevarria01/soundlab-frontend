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
              <div className="mt-4">
                <h6>Productos:</h6>
                <ul className="list-group">

                  {pedido.items.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center gap-3">

                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />

                        <div>
                          <strong>{item.product.name}</strong>
                          <br />
                          <small className="text-muted">
                            Precio unitario: ${Number(item.product.price).toLocaleString()}
                          </small>
                        </div>
                      </div>

                      <div className="text-end">
                        <strong>{item.quantity} unidades</strong>
                        <br />
                        <span className="text-muted">
                          Subtotal: $
                          {Number(item.quantity * item.product.price).toLocaleString()}
                        </span>
                      </div>
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
