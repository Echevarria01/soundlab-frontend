export default function Carrito() {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Carrito de Compras</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Producto Ejemplo</td>
            <td>$10</td>
            <td>1</td>
            <td>$10</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary">Proceder al Pago</button>
    </div>
  );
}
