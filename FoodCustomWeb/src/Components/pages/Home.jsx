import Menu from "../../data/Menu.json";
import Banner from "../Banner";

export default function Home({ addToCart }) {
  return (
    <>
      <Banner />

      <div className="home">
        <div className="menu-grid">
          {Menu.map((item) => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} className="food-img" />

              <div className="card-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h4>₹{item.price}</h4>

                <button onClick={() => addToCart(item)}>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
