import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";

import "./styles/dashboard.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/products"
              element={<Products />}
            />

            <Route
              path="/customers"
              element={<Customers />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;