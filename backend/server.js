import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import menuCardRoutes from "./routes/menuCards.js";
import menuBuilderRoutes from "./routes/menuBuilders.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* 🔥 FINAL CORS CONFIG (WORKS FOR LOCAL + VERCEL + RENDER) */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      /https:\/\/.*vercel\.app$/,
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// handle preflight requests
app.options("*", cors());

app.use(express.json());

// 🔥 MongoDB
connectDB();

// ROUTES
app.use("/api/menucards", menuCardRoutes);
app.use("/api/menubuilder", menuBuilderRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/auth", authRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("OvenStory Backend Running 🚀");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


