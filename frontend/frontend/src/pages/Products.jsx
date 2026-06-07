import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Products() {

  const [products,setProducts] = useState([]);

  const [form,setForm] = useState({
    sku:"",
    name:"",
    price:"",
    stock_quantity:""
  });

  const [search,setSearch] = useState("");

  useEffect(()=>{
    fetchProducts();
  },[]);

  async function fetchProducts(){

    try{

      const res =
      await api.get("/products");

      setProducts(res.data);

    }catch(err){
      console.log(err);
    }
  }

  async function addProduct(e){

    e.preventDefault();

    try{

      await api.post(
        "/products/",
        form
      );

      setForm({
        sku:"",
        name:"",
        price:"",
        stock_quantity:""
      });

      fetchProducts();

    }catch(err){

  toast.error(
    err.response?.data?.detail ||
    "Failed to add product"
  );

}
  }

  async function deleteProduct(id){

    if(
      !window.confirm(
        "Delete Product?"
      )
    ) return;

    await api.delete(
      `/products/${id}`
    );

    fetchProducts();
  }

  const filtered =
  products.filter(
    p =>
      p.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  );

  return (

    <div>

      <h1>
        Product Management
      </h1>

      <div className="chart-card">

        <form
          onSubmit={addProduct}
          className="form-grid"
        >

          <input
            placeholder="SKU"
            value={form.sku}
            onChange={(e)=>
              setForm({
                ...form,
                sku:e.target.value
              })
            }
          />

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e)=>
              setForm({
                ...form,
                name:e.target.value
              })
            }
          />

          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e)=>
              setForm({
                ...form,
                price:e.target.value
              })
            }
          />

          <input
            placeholder="Stock"
            type="number"
            value={form.stock_quantity}
            onChange={(e)=>
              setForm({
                ...form,
                stock_quantity:e.target.value
              })
            }
          />

          <button
            className="primary-btn"
          >
            Add Product
          </button>

        </form>

      </div>

      <div className="chart-card">

        <input
          className="search-box"
          placeholder="Search Product..."
          value={search}
          onChange={(e)=>
            setSearch(e.target.value)
          }
        />

        <table className="data-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>SKU</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

          {
            filtered.map(product=>(
              <tr key={product.id}>

                <td>{product.id}</td>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>
                  ₹{product.price}
                </td>
                <td>
                  {product.stock_quantity}
                </td>

                <td>

                  <button
                    className="danger-btn"
                    onClick={()=>
                      deleteProduct(
                        product.id
                      )
                    }
                  >
                    Delete
                  </button>

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