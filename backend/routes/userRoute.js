import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

/*
========================
REGISTER USER
========================
*/
router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).send({ message: "User already exists" });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
    });

    const createdUser = await user.save();

    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/*
========================
LOGIN USER
========================
*/
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

export default router;