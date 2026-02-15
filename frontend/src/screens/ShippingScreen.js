import React, { useState } from "react";
import { useSelector } from "react-redux";

function ShippingScreen(props) {

  const cart = useSelector((state) => state.cart);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const totalPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const handleSubmit = async () => {

    if (!address || !city || !postalCode) {
      alert("Please fill all shipping details");
      return;
    }

    if (cart.cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (paymentMethod === "COD") {
      alert("Order placed successfully with Cash on Delivery 🎉");
      props.history.push("/");
      return;
    }

    if (paymentMethod === "RAZORPAY") {
      try {
        const response = await fetch("/api/payment/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderItems: cart.cartItems,
            totalPrice: totalPrice,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.message);
          return;
        }

        const options = {
          key: data.key,
          amount: data.amount,
          currency: "INR",
          name: "Pizza Store",
          description: "Pizza Order Payment",
          order_id: data.razorpayOrderId,

          handler: async function (response) {
            const verifyRes = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: data.orderId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              alert("Payment Successful 🎉");
              props.history.push("/");
            } else {
              alert("Payment verification failed");
            }
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (error) {
        console.error(error);
        alert("Payment Error");
      }
    }
  };

  return (
    <div className="container" style={{ marginTop: "40px" }}>
      <div className="row">

        {/* LEFT SIDE - SHIPPING FORM */}
        <div className="col-md-8">
          <h3>Shipping Address</h3>

          <div className="form-group">
            <input
              type="text"
              placeholder="Address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="City"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Postal Code"
              className="form-control"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT SIDE - ORDER + PAYMENT */}
        <div className="col-md-4">
          <h4>Order Summary</h4>

          <table className="table">
            <tbody>
              {cart.cartItems.map((item) => (
                <tr key={item.product}>
                  <td>{item.name} x {item.qty}</td>
                  <td>₹{item.price * item.qty}</td>
                </tr>
              ))}

              <tr>
                <th>Total</th>
                <th>₹{totalPrice}</th>
              </tr>
            </tbody>
          </table>

          <h4>Payment Method</h4>

          <div>
            <label>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                value="RAZORPAY"
                checked={paymentMethod === "RAZORPAY"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Razorpay
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="btn btn-danger"
            style={{ marginTop: "20px", width: "100%" }}
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default ShippingScreen;
