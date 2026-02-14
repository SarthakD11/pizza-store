import mongoose from "mongoose";
import config from "./config.js";
import Pizza from "./models/Pizza.js";
import data from "./data.js";

mongoose.connect(config.MONGODB_URL);

const importData = async () => {
  try {
    await Pizza.deleteMany();

    // 🔥 REMOVE _id BEFORE INSERTING
    const cleanedData = data.products.map((pizza) => {
      const { _id, ...rest } = pizza;
      return rest;
    });

    await Pizza.insertMany(cleanedData);

    console.log("✅ Pizza Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();
