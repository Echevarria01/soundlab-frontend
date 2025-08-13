export default function Checkout() {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Dirección de Envío</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Método de Pago</label>
          <select className="form-select">
            <option>Tarjeta de Crédito</option>
            <option>PayPal</option>
            <option>Transferencia Bancaria</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Pagar</button>
      </form>
    </div>
  );
}
