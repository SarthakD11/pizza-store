import React from "react";
import { useSelector } from "react-redux";

function CheckoutScreen(props) {

  const cart = useSelector((state) => state.cart);

  const handleRazorpayPayment = async () => {
    try {
      const response = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems: cart.cartItems,
          totalPrice: cart.cartItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0
          ),
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
            props.history.push(
  `/order-success?orderId=${data.orderId}&paymentId=${response.razorpay_payment_id}`
);
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
  };

  const totalPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <section id="checkout">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h3>Checkout</h3>
          </div>

          <div className="col-md-4">
            <div className="checkout-right">
              <h4>Order Summary</h4>

              <div className="aa-order-summary-area">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cart.cartItems.length === 0 ? (
                      <tr>
                        <td colSpan="2">Your cart is empty</td>
                      </tr>
                    ) : (
                      cart.cartItems.map((item) => (
                        <tr key={item.product}>
                          <td>
                            {item.name} <strong>x {item.qty}</strong>
                          </td>
                          <td>₹{item.price * item.qty}</td>
                        </tr>
                      ))
                    )}
                  </tbody>

                  <tfoot>
                    <tr>
                      <th>Total</th>
                      <td>₹{totalPrice}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <button
                type="button"
                onClick={handleRazorpayPayment}
                className="aa-browse-btn"
                disabled={cart.cartItems.length === 0}
              >
                Pay Now
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutScreen;
