import mongoose from "mongoose";

const MenuCardSchema = new mongoose.Schema({
  _id: String,
  name: String,
  image: String,
  description: String,
  price: Number
});

export default mongoose.model(
  "MenuCard", 
  MenuCardSchema,
  "cards"
);
