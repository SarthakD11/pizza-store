import React from "react";

function Footer() {
  return (
    <div>
      <section id="aa-subscribe">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="aa-subscribe-area">
                <h3>Subscribe for Latest Pizza Deals 🍕</h3>
                <p>Get exclusive offers & fresh updates directly in your inbox!</p>
                <form className="aa-subscribe-form">
                  <input type="email" placeholder="Enter your Email" />
                  <input type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="aa-footer">
        <div className="aa-footer-top">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="aa-footer-top-area">
                  <div className="row">

                    {/* ABOUT SECTION */}
                    <div className="col-md-3 col-sm-6">
  <div className="aa-footer-widget">
    <h3>About PizzaStore</h3>
    <p style={{ color: "#ccc", lineHeight: "1.8" }}>
      We serve hot, fresh and delicious pizzas made with premium ingredients.
      Delivering happiness in every slice since 2024.
    </p>
    <p style={{ color: "#ccc", lineHeight: "1.8" }}>
      🚀 Fast Delivery <br />
      ❤️ Made with Passion <br />
      🍅 100% Fresh Ingredients
    </p>
  </div>
</div>

                    {/* QUICK LINKS */}
                    <div className="col-md-3 col-sm-6">
                      <div className="aa-footer-widget">
                        <h3>Quick Links</h3>
                        <ul className="aa-footer-nav">
                          <li><a href="/">Home</a></li>
                          <li><a href="/">Our Pizzas</a></li>
                          <li><a href="/cart">Cart</a></li>
                          <li><a href="/shipping">Checkout</a></li>
                        </ul>
                      </div>
                    </div>

                    {/* BEST SELLERS */}
                    <div className="col-md-3 col-sm-6">
                      <div className="aa-footer-widget">
                        <h3>Best Sellers</h3>
                        <ul className="aa-footer-nav">
                          <li><a href="#">Margherita</a></li>
                          <li><a href="#">BBQ Pizza</a></li>
                          <li><a href="#">Cheese Burst</a></li>
                          <li><a href="#">Veggie Supreme</a></li>
                        </ul>
                      </div>
                    </div>

                    {/* CONTACT */}
                    <div className="col-md-3 col-sm-6">
                      <div className="aa-footer-widget">
                        <h3>Contact Us</h3>
                        <address>
                          <p>📍 Kalyan, Maharashtra, India</p>
                          <p>📞 +91 98765 43210</p>
                          <p>
                            <span className="fa fa-envelope" /> support@pizzastore.com
                          </p>
                          <p>⏰ Open Daily: 10 AM – 11:30 PM</p>
                        </address>
                        <div className="aa-footer-social">
                          <a href="#"><span className="fa fa-facebook" /></a>
                          <a href="#"><span className="fa fa-instagram" /></a>
                          <a href="#"><span className="fa fa-twitter" /></a>
                          <a href="#"><span className="fa fa-youtube" /></a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="aa-footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="aa-footer-bottom-area">
                  <p>
                    © {new Date().getFullYear()} PizzaStore | Designed with ❤️ by Sarthak Shukla
                  </p>
                  <div className="aa-footer-payment">
                    <span className="fa fa-cc-mastercard" />
                    <span className="fa fa-cc-visa" />
                    <span className="fa fa-credit-card" />
                    <span className="fa fa-cc-discover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal (UNCHANGED) */}
      <div
        className="modal fade"
        id="login-modal"
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
              <h4>Login or Register</h4>
              <form className="aa-login-form">
                <label>
                  Username or Email address<span>*</span>
                </label>
                <input type="text" placeholder="Username or email" />
                <label>
                  Password<span>*</span>
                </label>
                <input type="password" placeholder="Password" />
                <button className="aa-browse-btn" type="submit">
                  Login
                </button>
                <label className="rememberme">
                  <input type="checkbox" /> Remember me
                </label>
                <p className="aa-lost-password">
                  <a href="#">Lost your password?</a>
                </p>
                <div className="aa-register-now">
                  Don't have an account?<a href="#"> Register now!</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Footer;
