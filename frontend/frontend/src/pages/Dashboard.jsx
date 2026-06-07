import { useEffect, useState } from "react";

import Header from "../components/Header";
import StatCard from "../components/StatCard";

import api from "../services/api";

import {
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaExclamationTriangle
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Dashboard() {

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {

      const productsRes =
        await api.get("/products");

      const customersRes =
        await api.get("/customers");

      const ordersRes =
        await api.get("/orders");

      setProducts(productsRes.data);
      setCustomers(customersRes.data);
      setOrders(ordersRes.data);

    } catch (err) {
      console.error(err);
    }
  }

  const lowStockProducts =
    products.filter(
      (p) => p.stock_quantity <= 10
    );

  const analyticsData = [
    {
      name: "Products",
      value: products.length
    },
    {
      name: "Customers",
      value: customers.length
    },
    {
      name: "Orders",
      value: orders.length
    }
  ];

  const pieData = [
    {
      name: "Healthy Stock",
      value:
        products.filter(
          (p) => p.stock_quantity > 10
        ).length
    },
    {
      name: "Low Stock",
      value:
        products.filter(
          (p) => p.stock_quantity <= 10
        ).length
    }
  ];

  return (
    <>

      <Header />

      <div className="welcome-banner">

        <div>

          <h2>
            Welcome Back 👋
          </h2>

          <p>
            Manage products, customers,
            inventory and orders from
            one powerful dashboard.
          </p>

        </div>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Products"
          value={products.length}
          icon={<FaBox />}
          color="#3B82F6"
        />

        <StatCard
          title="Customers"
          value={customers.length}
          icon={<FaUsers />}
          color="#22C55E"
        />

        <StatCard
          title="Orders"
          value={orders.length}
          icon={<FaShoppingCart />}
          color="#F59E0B"
        />

        <StatCard
          title="Low Stock"
          value={lowStockProducts.length}
          icon={<FaExclamationTriangle />}
          color="#EF4444"
        />

      </div>

      <div className="dashboard-charts">

        <div className="chart-card">

          <h2>
            Business Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#3B82F6"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h2>
            Inventory Health
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >

                <Cell fill="#22C55E" />
                <Cell fill="#EF4444" />

              </Pie>

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

      <div className="chart-card">

        <h2>
          System Status
        </h2>

        <div className="status-grid">

          <div className="status-item">
            🟢 Backend Online
          </div>

          <div className="status-item">
            🟢 PostgreSQL Connected
          </div>

          <div className="status-item">
            🟢 API Healthy
          </div>

          <div className="status-item">
            🟢 Inventory Service Active
          </div>

        </div>

      </div>

      <div
        className="chart-card"
        style={{
          marginTop: "25px"
        }}
      >

        <h2>
          Low Stock Products
        </h2>

        {
          lowStockProducts.length === 0
          ? (
            <p
              style={{
                marginTop: "20px"
              }}
            >
              No low stock products.
            </p>
          )
          : (
            <table
              className="data-table"
            >

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>SKU</th>
                  <th>Stock</th>
                </tr>

              </thead>

              <tbody>

                {
                  lowStockProducts.map(
                    (product) => (
                      <tr
                        key={product.id}
                      >

                        <td>
                          {product.id}
                        </td>

                        <td>
                          {product.name}
                        </td>

                        <td>
                          {product.sku}
                        </td>

                        <td>
                          {product.stock_quantity}
                        </td>

                      </tr>
                    )
                  )
                }

              </tbody>

            </table>
          )
        }

      </div>

    </>
  );
}