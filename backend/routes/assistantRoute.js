import express from "express";
import Pizza from "../models/Pizza.js";
import { normalizeProduct } from "../utils/normalizeProduct.js";

const router = express.Router();

router.post("/build-pizza", async (req, res) => {
  try {
    const { budget, veg, spicy } = req.body;

    if (typeof budget !== "number") {
      return res.status(400).json({ error: "Budget must be a number" });
    }

    // 🔥 FETCH FROM DATABASE
    const pizzasFromDB = await Pizza.find();

    let scoredPizzas = pizzasFromDB.map((rawPizza) => {
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

      if (!veg) {
        score += pizza.proteinLevel || 0;
      }

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

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
