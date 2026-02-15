

import config from "./config.js";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import Pizza from "./models/Pizza.js";
import paymentRoute from "./routes/paymentRoute.js";
import userRoute from "./routes/userRoute.js";
import assistantRoute from "./routes/assistantRoute.js";


const app = express();

// =====================
// Config
// =====================
const PORT = process.env.PORT || 5001;
const mongodbUrl = config.MONGODB_URL;

// =====================
// Middleware
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =====================
// MongoDB
// =====================
console.log("MONGO URL =", mongodbUrl);

mongoose
  .connect(mongodbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error.message));

// =====================
// API Routes
// =====================
app.use("/api/users", userRoute);
app.use("/api/assistant", assistantRoute);
app.use("/api/payment", paymentRoute);



app.get("/api/products", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.send(pizzas);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


app.get("/api/products/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (pizza) {
      res.send(pizza);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(400).send({ message: "Invalid Product ID" });
  }
});


// =====================
// Frontend (Production)
// =====================
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "/frontend/build/index.html")
    );
  });
}

// =====================
// Start Server (ONLY ONCE)
// =====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});