import express from "express";
import MenuCard from "../models/MenuCard.js";

const router = express.Router();

// GET all menu cards
router.get("/", async (req, res) => {
  try {
    const data = await MenuCard.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch menu cards" });
  }
});

export default router;

