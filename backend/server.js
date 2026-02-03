import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import menuCardRoutes from "./routes/menuCards.js";
import menuBuilderRoutes from "./routes/menuBuilders.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

// ROUTES 👇🔥
app.use("/api/menucards", menuCardRoutes);
app.use("/api/menubuilder", menuBuilderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("OvenStory Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
