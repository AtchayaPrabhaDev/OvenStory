import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMenuCards } from "../../services/api";

export default function Customize() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMenuCards().then(setItems);
  }, []);

  return (
    <div className="customize">
      <div className="custom-grid">
        {items.map((item) => (
          <div key={item._id} className="card1">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Starting From ₹{item.price}</p>

            <button onClick={() =>
               navigate(`/builder/${item._id}`,{
                state:{
                  image:item.image
                }
                })
                }
                >
              Customize
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

