import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Producto from "./pages/Producto";
import ProductoDetalle from "./pages/ProductoDetalle";

export default function App() {
  const token = localStorage.getItem("token"); // 📌 Para proteger rutas

  return (
    <Router>
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Ruta protegida */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route path="/productos" element={<Producto />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}




