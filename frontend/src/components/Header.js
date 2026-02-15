import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header(props) {
  const cart = useSelector((state) => state.cart);

  return (
    <header id="aa-header">
      {/* start header top  */}
      <div className="aa-header-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="aa-header-top-area">

                {/* start header top left */}
                <div className="aa-header-top-left">

                  {/* INDIA FLAG */}
                  <div className="aa-language">
                    <a className="btn">
                      <img
                        src="https://flagcdn.com/w40/in.png"
                        alt="india flag"
                        style={{ width: "20px", marginRight: "8px" }}
                      />
                      INDIA
                    </a>
                  </div>

                </div>
                {/* / header top left */}

                <div className="aa-header-top-right">
                  <ul className="aa-head-top-nav-right">
                    <li>
                      <a href="account.html">My Account</a>
                    </li>
                    <li className="hidden-xs">
                      <Link to="/cart">My Cart</Link>
                    </li>
                    <li className="hidden-xs">
                      <Link to="/Checkout">Checkout</Link>
                    </li>
                    <li>
                      <a href="#" data-toggle="modal" data-target="#login-modal">
                        Login
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* / header top  */}

      {/* start header bottom  */}
      <div className="aa-header-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="aa-header-bottom-area">

                {/* logo  */}
                <div className="aa-logo">
                  <a href="/">
                    <span className="fa fa-shopping-cart" />
                    <p>
                      Pizza<strong>Store</strong>
                      <span>Get your pizza on Door </span>
                    </p>
                  </a>
                </div>
                {/* / logo  */}

                {/* cart box */}
                <div className="aa-cartbox">
                  <Link to="/cart">
                    <a className="aa-cart-link" href="#">
                      <span className="fa fa-shopping-basket" />
                      <span className="aa-cart-title">SHOPPING CART</span>
                      <span className="aa-cart-notify">
                        {cart.cartItems.length}
                      </span>
                    </a>
                  </Link>
                </div>
                {/* / cart box */}

              

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* / header bottom  */}
    </header>
  );
}

export default Header;
