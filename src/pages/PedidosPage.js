import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function PedidosPage() {
  const { token, user } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Obtener pedidos al cargar
  useEffect(() => {
    if (!token) return;

    const fetchPedidos = async () => {
      try {
        const response = await API.get("/orders/");
        setPedidos(response.data);
      } catch (err) {
        console.error("Error al obtener pedidos:", err);
        setError("No se pudieron cargar los pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [token]);

  // 🔹 Cambiar estado (solo admin)
  const actualizarEstado = async (id, nuevoEstado) => {
    const { isConfirmed } = await Swal.fire({
      title: `¿Actualizar pedido #${id}?`,
      text: `¿Seguro que querés marcar este pedido como '${nuevoEstado}'?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
    });

    if (!isConfirmed) return;

    try {
      await API.patch(`/orders/${id}/update_status/`, { status: nuevoEstado });

      setPedidos((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, status: nuevoEstado } : p
        )
      );

      Swal.fire({
        title: "Actualizado ✅",
        text: `El pedido #${id} se marcó como '${nuevoEstado}'.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      Swal.fire({
        title: "Error ❌",
        text: "No se pudo actualizar el estado del pedido.",
        icon: "error",
      });
    }
  };

  // 🔹 Traducción de estados
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

  if (loading) return <p className="text-center mt-5">Cargando pedidos...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!pedidos.length)
    return <p className="text-center mt-5">No hay pedidos registrados.</p>;

  // 🔹 Admin ve todos — usuarios solo los suyos
  const pedidosVisibles = user?.is_staff
    ? pedidos
    : pedidos.filter((p) => p.user === user?.id && p.status === "paid"); // solo mostrar confirmados

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">
        {user?.is_staff ? "📋 Panel de Pedidos (Admin)" : "📦 Mis Pedidos"}
      </h2>

      {/* =================== PANEL ADMIN =================== */}
      {user?.is_staff ? (
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Método de pago</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidosVisibles.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.user_name || pedido.user}</td>
                  <td>{pedido.payment_method}</td>
                  <td>
                    <span
                      className={`badge ${
                        pedido.status === "paid"
                          ? "bg-success"
                          : pedido.status === "cancelled"
                          ? "bg-danger"
                          : pedido.status === "rejected"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {traducirEstado(pedido.status)}
                    </span>
                  </td>
                  <td>
                    $
                    {pedido.items
                      ?.reduce(
                        (total, item) =>
                          total +
                          (Number(item.price) || 0) * (Number(item.quantity) || 1),
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => actualizarEstado(pedido.id, "paid")}
                      >
                        ✅ Pagar
                      </button>
                      <button
                        className="btn btn-sm btn-warning text-dark"
                        onClick={() => actualizarEstado(pedido.id, "rejected")}
                      >
                        ⚠️ Rechazar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => actualizarEstado(pedido.id, "cancelled")}
                      >
                        ❌ Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* =================== VISTA USUARIO =================== */
        pedidosVisibles.map((pedido) => (
          <div key={pedido.id} className="card mb-3 shadow-sm border-0">
            <div className="card-body bg-light">
              <h5>Pedido N° {pedido.id}</h5>
              <p>
                Método de pago: <strong>{pedido.payment_method}</strong>
              </p>
              <p>
                Estado:{" "}
                <span
                  className={`badge ${
                    pedido.status === "paid"
                      ? "bg-success"
                      : pedido.status === "cancelled"
                      ? "bg-danger"
                      : pedido.status === "rejected"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {traducirEstado(pedido.status)}
                </span>
              </p>

              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cant.</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {pedido.items?.map((item, i) => {
                    const price = Number(item.price) || 0;
                    const quantity = Number(item.quantity) || 1;
                    return (
                      <tr key={i}>
                        <td>{item.product_name || "Producto"}</td>
                        <td>{quantity}</td>
                        <td>${price.toFixed(2)}</td>
                        <td>${(price * quantity).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan="3" className="text-end">
                      Total:
                    </th>
                    <th>
                      $
                      {pedido.items
                        ?.reduce(
                          (sum, item) =>
                            sum +
                            (Number(item.price) || 0) * (Number(item.quantity) || 1),
                          0
                        )
                        .toFixed(2)}
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}






