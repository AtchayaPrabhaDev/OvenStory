import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const MenuBuilderSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: String,
  base:{
    title: String,
    options: [OptionSchema]
  },
  
  toppings:
  {
    title: String,
    options: [OptionSchema]
  },
  sauces:{
    title: String,
    options: [OptionSchema]
  }
});

export default mongoose.model(
  "MenuBuilder",
  MenuBuilderSchema,
  "Toppings"
);
