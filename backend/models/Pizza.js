import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    image: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    brand: { type: String },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// This will use collection name "pizzas" automatically
// If you REALLY want collection name = "pizza", use third parameter

const Pizza = mongoose.model("Pizza", pizzaSchema);

export default Pizza;
