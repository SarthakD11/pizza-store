/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import { detailsProduct } from "../actions/productActions";
import Slider from "../components/Slider";
import Testimonial from "../components//Testimonial";
import PizzaAssistantModal from "../components/PizzaAssistantModal";


const HomeScreen = (props) => {
  const productList = useSelector((state) => state.productList);

  const { products, loading, error } = productList;
  const [showAssistant, setShowAssistant] = useState(false);


  console.log(products);

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
      <div>
        <div>
          <section style={{ marginTop: 19 }} id="aa-catg-head-banner">
            <img src="/img/fashion/fashion-header-bg-8.jpg" alt="fashion img" />
            <div className="aa-catg-head-banner-area">
              <div className="container">
                <div className="aa-catg-head-banner-content">
                  <h2>Enjoy Our COVID-19 Deals </h2>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Slider />

      <section id="aa-popular-category">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="aa-popular-category-area">
                  <ul className="nav nav-tabs aa-products-tab">
                    <li className="active">
                      <a href="#popular" data-toggle="tab">
                        Pizzas
                      </a>
                    </li>
                    <li>
                      <a href="#featured" data-toggle="tab">
                        Pasta
                      </a>
                    </li>
                    <li>
                      <a href="#latest" data-toggle="tab">
                        Buger
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tab-content">
        <div className="tab-pane fade in active" id="men">
          <ul className="aa-product-catg">
            {products.map((product) => (
              <li key={product._id}>
                <figure>
                  <Link
                    className="aa-product-img"
                    to={"/product/" + product._id}
                  >
                    <img src={product.image} alt="piiza image" />

                    <a className="aa-add-card-btn" onClick={handleAddToCart}>
                      <span className="fa fa-shopping-cart" />
                      View Details
                    </a>
                  </Link>
                  <figcaption>
                    <h4 className="aa-product-title">
                      <a href="#">{product.name}</a>
                    </h4>
                    <span className="aa-product-price">₹{product.price}</span>
                    <span className="aa-product-price">
                      <del>₹100</del>
                    </span>
                  </figcaption>
                </figure>
                <div className="aa-product-hvr-content">
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add to Wishlist"
                  >
                    <span className="fa fa-heart-o" />
                  </a>
                  <a
                    href="#"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Compare"
                  >
                    <span className="fa fa-exchange" />
                  </a>
                  <a
                    href="#"
                    data-toggle2="tooltip"
                    data-placement="top"
                    title="Quick View"
                    data-toggle="modal"
                    data-target="#quick-view-modal"
                  >
                    <span className="fa fa-search" />
                  </a>
                </div>
                {/* product badge */}
                <span className="aa-badge aa-sale" href="#">
                  SALE!
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section style={{ marginTop: -53 }} id="aa-banner">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="aa-banner-area">
                  <a href="#">
                    <img
                      src="img/fashion-banner.jpg"
                      alt="fashion banner img"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonial />
      {showAssistant && (
        <PizzaAssistantModal onClose={() => setShowAssistant(false)} />
      )}
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
