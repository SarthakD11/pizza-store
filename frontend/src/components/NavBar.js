import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [pizzas, setPizzas] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.error("Error fetching pizzas:", err));
  }, []);

  return (
    <section id="menu">
      <div className="container">
        <div className="menu-area">
          <div className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>

            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/">Home</Link>
                </li>

                {/* 🔥 Dynamic Pizza Dropdown */}
                <li
  className={`dropdown ${open ? "open" : ""}`}
  onMouseEnter={() => setOpen(true)}
  onMouseLeave={() => setOpen(false)}
>
  <a
    href="#"
    className="dropdown-toggle"
    onClick={(e) => {
      e.preventDefault();
      setOpen(!open);
    }}
  >
    Pizza <span className="caret" />
  </a>

  <ul className="dropdown-menu">
    {pizzas.map((pizza) => (
      <li key={pizza._id}>
        <Link to={`/product/${pizza._id}`}>
          {pizza.name}
        </Link>
      </li>
    ))}
  </ul>
</li>
               
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NavBar;
