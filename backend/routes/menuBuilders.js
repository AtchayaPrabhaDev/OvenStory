import express from "express";
import MenuBuilder from "../models/MenuBuilder.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const data = await MenuBuilder.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ message: "Builder item not found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch builder data" });
  }
});

export default router;


