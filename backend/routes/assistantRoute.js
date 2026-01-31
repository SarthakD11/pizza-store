import express from "express";
import data from "../data.js";
import { normalizeProduct } from "../utils/normalizeProduct.js";

const router = express.Router();

router.post("/build-pizza", (req, res) => {
  const { budget, veg, spicy } = req.body;

  // ✅ VALIDATION MUST BE INSIDE THE FUNCTION
  if (typeof budget !== "number") {
    return res.status(400).json({ error: "Budget must be a number" });
  }

  let scoredPizzas = data.products.map((rawPizza) => {
    const pizza = normalizeProduct(rawPizza);

    let score = 0;
    let reasons = [];

    // Budget
    if (pizza.price <= budget) {
      score += 3;
      reasons.push("Fits within your budget");
    } else {
      score -= 2;
    }

    // Veg preference
    if (veg) {
      if (pizza.isVeg) {
        score += 3;
        reasons.push("Vegetarian friendly");
      } else {
        score -= 3;
      }
    }

    // Spicy preference
    if (spicy && pizza.isSpicy) {
      score += 2;
      reasons.push("Spicy flavor profile");
    }

    // Protein (only if non-veg)
    if (!veg) {
      score += pizza.proteinLevel;
    }

    // Rating
    if (pizza.rating) {
      score += pizza.rating;
      reasons.push(`Highly rated (${pizza.rating}⭐)`);
    }

    return {
      ...pizza,
      score,
      reasons: [...new Set(reasons)],
    };
  });

  scoredPizzas.sort((a, b) => {
    if (b.score === a.score) {
      return a.price - b.price;
    }
    return b.score - a.score;
  });

  res.json({
    preferences: { budget, veg, spicy },
    recommendations: scoredPizzas.slice(0, 3),
  });
});

export default router;
