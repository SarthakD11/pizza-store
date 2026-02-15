import React from "react";
import { Link } from "react-router-dom";

function OrderSuccessScreen(props) {
  const orderId = props.match.params.id;

  return (
    <div className="container" style={{ marginTop: "60px", textAlign: "center" }}>
      <h2 style={{ color: "green" }}>🎉 Order Successful!</h2>
      <p>Your payment has been completed successfully.</p>

      <div style={{ marginTop: "20px" }}>
        <h4>Order ID:</h4>
        <p><strong>{orderId}</strong></p>
      </div>

      <Link to="/" className="btn btn-primary" style={{ marginTop: "20px" }}>
        Back to Home
      </Link>
    </div>
  );
}

export default OrderSuccessScreen;
