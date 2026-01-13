import express from "express";
import mongoose from "mongoose";
import path from "path";

import data from "./data";
import config from "./config";
import userRoute from "./routes/userRoute";

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

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find(
    (x) => x._id === req.params.id
  );

  if (product) res.send(product);
  else res.status(404).send({ msg: "Product Not Found" });
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