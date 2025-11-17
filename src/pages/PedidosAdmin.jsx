import React, { useEffect, useState, useContext } from "react";
import { apiFetch } from "../api";
import { Badge, Modal, Button } from "react-bootstrap";  // Importar Modal y Button
import { AuthContext } from "../context/AuthContext";

export default function PedidosAdmin() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);  // Estado para el modal
  const [selectedOrder, setSelectedOrder] = useState(null);  // Estado para el pedido seleccionado

  // Cargar pedidos
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await apiFetch("/orders/", {
          method: "GET",
          token,
        });
        setOrders(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // Cambiar estado del pedido (solo admin)
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiFetch(`/orders/${orderId}/update_status/`, {
        method: "PATCH",
        token,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error);

      // Si la API retorna detalles adicionales, mostrarlo aquí.
      if (error.response) {
        console.error("Response error:", error.response.data);
        Swal.fire({
          title: "Error ❌",
          text: `No se pudo actualizar el estado del pedido. ${error.response.data}`,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error ❌",
          text: "No se pudo actualizar el estado del pedido.",
          icon: "error",
        });
      }
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
                  (sum, item) => sum + Number(item.price) * Number(item.quantity),
                  0
                );

                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.shipping_name}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleOpenModal(order)} // Abre el modal al hacer clic
                      >
                        Ver productos
                      </button>
                    </td>

                    <td>${total.toLocaleString()}</td>
                    <td>{order.payment_method}</td>

                    <td>
                      {order.shipping_address}, {order.shipping_city}
                    </td>

                    <td>
                      <Badge
                        bg={
                          order.status === "paid"
                            ? "success"
                            : order.status === "pending"
                            ? "secondary"
                            : order.status === "cancelled"
                            ? "danger"
                            : "warning"
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
                        <option value="paid">Pagado</option>
                        <option value="cancelled">Cancelado</option>
                        <option value="rejected">Rechazado</option>
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

