import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/orderModel.js";

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


/*
========================================
1️⃣ CREATE RAZORPAY ORDER
========================================
*/
router.post("/create-order", async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Create order in DB first (Pending)
    const order = new Order({
      orderItems,
      totalPrice,
      isPaid: false,
    });

    const createdOrder = await order.save();

    const options = {
      amount: totalPrice * 100, // Convert ₹ to paisa
      currency: "INR",
      receipt: createdOrder._id.toString(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: createdOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: options.amount,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: error.message });
  }
});

/*
========================================
2️⃣ VERIFY PAYMENT SIGNATURE
========================================
*/
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }

    // Update order as Paid
    const order = await Order.findById(orderId);

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentId = razorpay_payment_id;

    await order.save();

    res.json({ success: true });

  } catch (error) {
    console.error("Verify Error:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
