import { useState } from "react";
import { addItem } from "../../../services/api";

export default function AddItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await addItem({ name, price });
    alert("Item Added");
    setName("");
    setPrice("");
  } catch (err) {
    alert("Add item failed");
    console.log(err);
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button>Add Item</button>
    </form>
  );
}
