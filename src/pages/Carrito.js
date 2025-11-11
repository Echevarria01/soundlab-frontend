import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, limpiarCarrito, registrarPedido } =
    useContext(CarritoContext);
  const navigate = useNavigate();

  // Calcular total
  const total = carrito.reduce(
    (sum, item) => sum + item.price * item.cantidad,
    0
  );

  // Si el carrito está vacío
  if (carrito.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2 className="mb-3">🛒 Tu carrito está vacío</h2>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/productos")}
        >
          Ver productos
        </button>
      </div>
    );
  }

  // Vista principal del carrito
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">🛍️ Carrito de Compras</h2>

      <table className="table table-striped align-middle text-center shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td className="text-start">{item.name}</td>
              <td>${item.price.toLocaleString()}</td>
              <td>{item.cantidad}</td>
              <td>${(item.price * item.cantidad).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: ${total.toLocaleString()}</h4>
        <div>
          <button
            className="btn btn-outline-danger me-3"
            onClick={limpiarCarrito}
          >
            Vaciar carrito
          </button>
          <button
            className="btn btn-success"
            onClick={async () => {
              await registrarPedido();
              navigate("/"); // redirige al home tras comprar
            }}
          >
            Finalizar compra ✅
          </button>
        </div>
      </div>
    </div>
  );
}


