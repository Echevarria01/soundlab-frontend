import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import ProductosPage from "./pages/Productos";
import Checkout from "./pages/Checkout";
import PedidosPage from "./pages/PedidosPage"; // ✅ Historial de pedidos
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/Productos.css";
import API from "./api/api";

// -------------------- COMPONENTE PROTEGIDO --------------------
function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}

// -------------------- APP PRINCIPAL --------------------
function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <div className="container py-5">
            <Header />
            <Routes>
              {/* Login */}
              <Route path="/login" element={<LoginRedirect />} />

              {/* Productos protegidos */}
              <Route
                path="/productos"
                element={
                  <PrivateRoute>
                    <ProductosLoader />
                  </PrivateRoute>
                }
              />

              {/* Checkout protegido */}
              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutRedirect />
                  </PrivateRoute>
                }
              />

              {/* ✅ Historial de pedidos protegido */}
              <Route
                path="/pedidos"
                element={
                  <PrivateRoute>
                    <PedidosPage />
                  </PrivateRoute>
                }
              />

              {/* Redirección por defecto */}
              <Route path="*" element={<Navigate to="/productos" />} />
            </Routes>
          </div>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

// -------------------- HEADER --------------------
function Header() {
  const { token, logout } = useContext(AuthContext);

  return (
    <header className="d-flex justify-content-between mb-4 align-items-center">
      <h2>🎸 SoundLab Store</h2>
      {token && (
        <nav className="d-flex gap-3 align-items-center">
          <Link to="/productos" className="btn btn-outline-primary">
            Productos
          </Link>
          <Link to="/checkout" className="btn btn-outline-success">
            Checkout
          </Link>
          <Link to="/pedidos" className="btn btn-outline-secondary">
            Mis pedidos
          </Link>
          <button className="btn btn-outline-danger" onClick={logout}>
            Cerrar sesión
          </button>
        </nav>
      )}
    </header>
  );
}

// -------------------- LOGIN REDIRECT --------------------
function LoginRedirect() {
  const { token } = useContext(AuthContext);
  return token ? <Navigate to="/productos" /> : <Login />;
}

// -------------------- PRODUCTOS CON FETCH --------------------
function ProductosLoader() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await API.get("/products/");
        setProductos(
          response.data.map((item) => ({
            id: item.id,
            nombre: item.name || item.nombre,
            precio: parseFloat(item.price || item.precio),
            categoria: item.category?.name || item.categoria,
            imagen: item.image || item.imagen,
          }))
        );
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return <ProductosPage productos={productos} />;
}

// -------------------- CHECKOUT CON REDIRECCIÓN --------------------
function CheckoutRedirect() {
  const navigate = useNavigate();
  const [pedidoCompletado, setPedidoCompletado] = useState(false);

  // Escucha el localStorage por si el pedido se marca como completado
  useEffect(() => {
    const handlePedidoCompleto = () => {
      const flag = localStorage.getItem("pedidoCompleto");
      if (flag === "true") {
        localStorage.removeItem("pedidoCompleto");
        navigate("/pedidos");
      }
    };
    window.addEventListener("storage", handlePedidoCompleto);
    return () => window.removeEventListener("storage", handlePedidoCompleto);
  }, [navigate]);

  return <Checkout setPedidoCompletado={setPedidoCompletado} />;
}

export default App;









