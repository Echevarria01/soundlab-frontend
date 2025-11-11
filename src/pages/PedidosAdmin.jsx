import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Badge } from "react-bootstrap";

export default function PedidosAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get("/orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.patch(`/orders/${orderId}/`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  if (loading)
    return <div className="text-center mt-5 text-light">Cargando pedidos...</div>;

  return (
    <div className="container py-4 text-light">
      <h2 className="mb-4">Panel de Pedidos</h2>
      {orders.length === 0 ? (
        <p>No hay pedidos disponibles.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Método Pago</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const total = order.items.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                );
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.shipping_name}</td>
                    <td>
                      {order.items.map((item) => (
                        <div key={item.id}>
                          {item.product_name} × {item.quantity} — $
                          {item.price}
                        </div>
                      ))}
                    </td>
                    <td>${total.toLocaleString()}</td>
                    <td>{order.payment_method}</td>
                    <td>
                      {order.shipping_address}, {order.shipping_city}
                    </td>
                    <td>
                      <Badge
                        bg={
                          order.status === "completed"
                            ? "success"
                            : order.status === "pending"
                            ? "secondary"
                            : "danger"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="form-select form-select-sm bg-dark text-light border-secondary"
                      >
                        <option value="pending">Pendiente</option>
                        <option value="completed">Completado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
