export function normalizeProduct(product) {
  const name = product.name?.toLowerCase() || "";
  const category = product.category?.toLowerCase() || "";
  const brand = product.brand?.toLowerCase() || "";

  // Explicit signals (strongest)
  const explicitVeg =
    name.includes("veg") ||
    name.includes("vegan") ||
    brand.includes("veg");

  const explicitFish =
    name.includes("fish") ||
    brand.includes("tuna");

  const explicitMeat =
    name.includes("chicken") ||
    name.includes("meat") ||
    brand.includes("meat") ||
    name.includes("bbq");

  // Final flags (priority-based)
  const isVeg = explicitVeg;
  const isFish = !explicitVeg && explicitFish;
  const isMeat = !explicitVeg && !explicitFish && explicitMeat;

  // Spicy
  const isSpicy =
    brand.includes("spicy") ||
    name.includes("bbq") ||
    name.includes("pepper");

  // Normalized category (veg has highest priority)
  let normalizedCategory = "veg";
  if (isFish) normalizedCategory = "fish";
  if (isMeat) normalizedCategory = "meat";

  // Protein (derived)
  let proteinLevel = 1;
  if (isFish || isMeat) proteinLevel = 4;

  return {
    ...product,
    normalizedCategory,
    isVeg,
    isSpicy,
    proteinLevel,
  };
}
