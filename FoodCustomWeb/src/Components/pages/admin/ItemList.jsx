import { useEffect, useState } from "react";
import {getItems,deleteItem} from "../../../services/api";

export default function ItemList() {
  const [items, setItems] = useState([]);
  useEffect(() => {
  getItems()
    .then((res) => setItems(res.data))
    .catch((err) => console.log(err));
}, []);


  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div>
      <h2>Items</h2>
      {items.map((item) => (
        <div key={item._id}>
          {item.name} - ₹{item.price}
          <button onClick={() => handleDelete(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
