import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cart = useSelector((state) => state.cart);
  const history = useHistory();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // Listen for storage changes
  useEffect(() => {
    const checkUser = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", checkUser);
    checkUser();

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
    history.push("/");
  };

  return (
    <header id="aa-header">
      <div className="aa-header-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="aa-header-top-area">

                <div className="aa-header-top-left">
                  <span className="btn">INDIA</span>
                </div>

                <div className="aa-header-top-right">
                  <ul className="aa-head-top-nav-right">

                    {user ? (
                      <>
                        <li>
                          <Link to="/account">{user.name}</Link>
                        </li>
                        <li>
                          <button
                            onClick={logoutHandler}
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer"
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    )}

                    <li>
                      <Link to="/cart">My Cart</Link>
                    </li>

                    <li>
                      <Link to="/Checkout">Checkout</Link>
                    </li>

                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aa-header-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="aa-header-bottom-area">

                <div className="aa-logo">
                  <Link to="/">
                    <p>
                      Pizza<strong>Store</strong>
                    </p>
                  </Link>
                </div>

                <div className="aa-cartbox">
                  <Link to="/cart" className="aa-cart-link">
                    <span className="aa-cart-notify">
                      {cart.cartItems.length}
                    </span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;