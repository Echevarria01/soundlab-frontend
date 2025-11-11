import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Checkout from "./pages/Checkout";
import PedidosPage from "./pages/PedidosPage";
import PedidosAdmin from "./pages/PedidosAdmin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmacionCompra from "./pages/ConfirmacionCompra"; // ✅ NUEVO IMPORT
import Footer from "./components/Footer";
import API from "./api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/Productos.css";

// -------------------- COMPONENTE PROTEGIDO --------------------
function PrivateRoute({ children }) {
  const { user, token } = useContext(AuthContext);
  if (!token || !user) return <Navigate to="/login" />;
  return children;
}

// -------------------- COMPONENTE ADMIN --------------------
function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user || !user.is_staff) return <Navigate to="/" />;
  return children;
}

// -------------------- CARGA DE PRODUCTOS --------------------
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

  return <Productos productos={productos} />;
}

// -------------------- APP PRINCIPAL --------------------
function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <div
            className="d-flex flex-column min-vh-100"
            style={{ backgroundColor: "#000", color: "white" }}
          >
            <Navbar />

            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<ProductosLoader />} />

                {/* 🛒 Solo usuarios logueados pueden hacer checkout */}
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  }
                />

                {/* ✅ NUEVA RUTA DE CONFIRMACIÓN DE COMPRA */}
                <Route
                  path="/confirmacion-compra"
                  element={
                    <PrivateRoute>
                      <ConfirmacionCompra />
                    </PrivateRoute>
                  }
                />

                {/* 📦 Pedidos */}
                <Route
                  path="/pedidos"
                  element={
                    <PrivateRoute>
                      <PedidosPage />
                    </PrivateRoute>
                  }
                />

                {/* 🔒 Solo admins pueden ver el panel de pedidos */}
                <Route
                  path="/admin/pedidos"
                  element={
                    <AdminRoute>
                      <PedidosAdmin />
                    </AdminRoute>
                  }
                />

                {/* 🔑 Login / Registro */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ❌ Ruta no encontrada */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;

















