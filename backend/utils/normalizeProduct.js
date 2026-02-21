export function normalizeProduct(product) {
  // Convert Mongoose document to plain object
  const plainProduct = product.toObject ? product.toObject() : product;

  const name = plainProduct.name?.toLowerCase() || "";
  const category = plainProduct.category?.toLowerCase() || "";
  const brand = plainProduct.brand?.toLowerCase() || "";

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

  const isVeg = explicitVeg;
  const isFish = !explicitVeg && explicitFish;
  const isMeat = !explicitVeg && !explicitFish && explicitMeat;

  const isSpicy =
    brand.includes("spicy") ||
    name.includes("bbq") ||
    name.includes("pepper");

  let normalizedCategory = "veg";
  if (isFish) normalizedCategory = "fish";
  if (isMeat) normalizedCategory = "meat";

  let proteinLevel = 1;
  if (isFish || isMeat) proteinLevel = 4;

  return {
    ...plainProduct,   // ✅ IMPORTANT FIX
    normalizedCategory,
    isVeg,
    isSpicy,
    proteinLevel,
  };
}