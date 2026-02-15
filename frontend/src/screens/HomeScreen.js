/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Slider from "../components/Slider";
import Testimonial from "../components//Testimonial";
import PizzaAssistantModal from "../components/PizzaAssistantModal";

const HomeScreen = (props) => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const [showAssistant, setShowAssistant] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const handleAddToCart = () => {
    props.history.push("/product/");
  };

  return loading ? (
    <div> Loading....</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
      {/* Banner */}
      <section style={{ marginTop: 19 }} id="aa-catg-head-banner">
        <img src="/img/fashion/fashion-header-bg-8.jpg" alt="fashion img" />
        <div className="aa-catg-head-banner-area">
          <div className="container">
            <div className="aa-catg-head-banner-content">
              <h2>A little slice of heaven!</h2>
            </div>
          </div>
        </div>
      </section>

      <Slider />

      {/* PRODUCTS SECTION (Tabs Removed) */}
      <div className="container" style={{ marginTop: "50px" }}>
        <ul className="aa-product-catg">
          {products &&
            products.map((product) => (
              <li key={product._id}>
                <figure>
                  <Link
                    className="aa-product-img"
                    to={"/product/" + product._id}
                  >
                    <img src={product.image} alt="pizza image" />

                    <a
                      className="aa-add-card-btn"
                      onClick={handleAddToCart}
                    >
                      <span className="fa fa-shopping-cart" />
                      View Details
                    </a>
                  </Link>
                  <figcaption>
                    <h4 className="aa-product-title">
                      <a href="#">{product.name}</a>
                    </h4>
                    <span className="aa-product-price">
                      ₹{product.price}
                    </span>
                    <span className="aa-product-price">
                      <del>₹100</del>
                    </span>
                  </figcaption>
                </figure>

                <div className="aa-product-hvr-content">
                  <a href="#">
                    <span className="fa fa-heart-o" />
                  </a>
                  <a href="#">
                    <span className="fa fa-exchange" />
                  </a>
                  <a href="#">
                    <span className="fa fa-search" />
                  </a>
                </div>

                <span className="aa-badge aa-sale">
                  SALE!
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* Banner Image (kept same) */}
      <section style={{ marginTop: -53 }} id="aa-banner">
        <div className="container">
          <div className="aa-banner-area">
            <a href="#">
              <img
                src="img/fashion-banner.jpg"
                alt="fashion banner img"
              />
            </a>
          </div>
        </div>
      </section>

      <Testimonial />

      {showAssistant && (
        <PizzaAssistantModal onClose={() => setShowAssistant(false)} />
      )}

      {/* Floating Button */}
      <button
        className="btn btn-warning btn-lg"
        onClick={() => setShowAssistant(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          borderRadius: "50px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        🤖 Build My Pizza
      </button>
    </>
  );
};

export default HomeScreen;
