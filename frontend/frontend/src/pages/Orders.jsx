import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Orders() {

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: 1
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    try {

      const customersRes =
        await api.get("/customers");

      const productsRes =
        await api.get("/products");

      const ordersRes =
        await api.get("/orders");

      setCustomers(customersRes.data);
      setProducts(productsRes.data);
      setOrders(ordersRes.data);

    } catch (err) {
      console.log(err);
    }
  }

  async function createOrder(e) {

    e.preventDefault();

    try {

      const payload = {
        customer_id:
          Number(form.customer_id),

        items: [
          {
            product_id:
              Number(form.product_id),

            quantity:
              Number(form.quantity)
          }
        ]
      };

      await api.post(
        "/orders/",
        payload
      );

      alert(
        "Order Created Successfully"
      );

      setForm({
        customer_id: "",
        product_id: "",
        quantity: 1
      });

      loadData();

    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Failed to create order"
      );
    }
  }

  return (

    <div>

      <h1>
        Order Management
      </h1>

      <p>
        Create and manage customer orders.
      </p>

      <div className="chart-card">

        <h2>
          Create Order
        </h2>

        <form
          onSubmit={createOrder}
          className="form-grid"
        >

          <select
            value={form.customer_id}
            onChange={(e)=>
              setForm({
                ...form,
                customer_id:
                  e.target.value
              })
            }
            required
          >

            <option value="">
              Select Customer
            </option>

            {
              customers.map(
                customer => (

                  <option
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.name}
                  </option>

                )
              )
            }

          </select>

          <select
            value={form.product_id}
            onChange={(e)=>
              setForm({
                ...form,
                product_id:
                  e.target.value
              })
            }
            required
          >

            <option value="">
              Select Product
            </option>

            {
              products.map(
                product => (

                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                    {" "}
                    (
                    Stock:
                    {product.stock_quantity}
                    )
                  </option>

                )
              )
            }

          </select>

          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e)=>
              setForm({
                ...form,
                quantity:
                  e.target.value
              })
            }
            required
          />

          <button
            className="primary-btn"
          >
            Create Order
          </button>

        </form>

      </div>

      <div className="chart-card">

        <h2>
          Order History
        </h2>

        <table className="data-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total Amount</th>
            </tr>

          </thead>

          <tbody>

          {
            orders.length === 0
            ? (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign:
                    "center"
                  }}
                >
                  No Orders Found
                </td>
              </tr>
            )
            : (
              orders.map(order => (

                <tr
                  key={order.id}
                >

                  <td>
                    {order.id}
                  </td>

                  <td>
                    {
                      order.customer_id
                    }
                  </td>

                  <td>
                    ₹
                    {
                      order.total_amount
                    }
                  </td>

                </tr>

              ))
            )
          }

          </tbody>

        </table>

      </div>

    </div>
  );
}