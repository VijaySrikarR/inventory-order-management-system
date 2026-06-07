import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaBoxOpen,
  FaUsers,
  FaShoppingCart
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaChartPie />
    },
    {
      name: "Products",
      path: "/products",
      icon: <FaBoxOpen />
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <FaUsers />
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <FaShoppingCart />
    }
  ];

  return (
    <aside className="sidebar">

      <div>
        <h2>InventoryPro</h2>

        <p
          style={{
            color: "#94A3B8",
            fontSize: "13px",
            marginTop: "8px"
          }}
        >
          Enterprise Management Platform
        </p>
      </div>

      <nav
        style={{
          marginTop: "40px"
        }}
      >
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "active-link"
                : ""
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

    </aside>
  );
}