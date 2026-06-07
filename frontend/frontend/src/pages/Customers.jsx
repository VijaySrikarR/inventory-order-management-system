import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Customers() {

  const [customers,setCustomers] =
    useState([]);

  const [search,setSearch] =
    useState("");

  const [form,setForm] =
    useState({
      name:"",
      email:""
    });

  useEffect(()=>{
    fetchCustomers();
  },[]);

  async function fetchCustomers(){

    const res =
      await api.get("/customers");

    setCustomers(res.data);
  }

  async function addCustomer(e){

    e.preventDefault();

    try{

      await api.post(
        "/customers/",
        form
      );

      toast.success(
  "Customer Added Successfully"
);

      setForm({
        name:"",
        email:""
      });

      fetchCustomers();

    }catch(err){

      toast.error(
      err.response?.data?.detail ||
      "Failed to add customer"
      );
    }
  }

  const filtered =
    customers.filter(customer =>
      customer.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div>

      <h1>
        Customer Management
      </h1>

      <p>
        Manage customers and track customer records.
      </p>

      <div className="chart-card">

        <form
          onSubmit={addCustomer}
          className="form-grid"
        >

          <input
            placeholder="Customer Name"
            value={form.name}
            onChange={(e)=>
              setForm({
                ...form,
                name:e.target.value
              })
            }
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e)=>
              setForm({
                ...form,
                email:e.target.value
              })
            }
          />

          <button
            className="primary-btn"
          >
            Add Customer
          </button>

        </form>

      </div>

      <div className="chart-card">

        <input
          className="search-box"
          placeholder="Search Customer..."
          value={search}
          onChange={(e)=>
            setSearch(e.target.value)
          }
        />

        <table className="data-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>

          </thead>

          <tbody>

          {
            filtered.map(customer=>(
              <tr key={customer.id}>

                <td>{customer.id}</td>

                <td>
                  {customer.name}
                </td>

                <td>
                  {customer.email}
                </td>

              </tr>
            ))
          }

          </tbody>

        </table>

      </div>

    </div>
  );
}