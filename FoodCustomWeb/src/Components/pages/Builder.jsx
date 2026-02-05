import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBuilderItem, getVideos } from "../../services/api";
import { useCart } from "../context/CartContext";

export default function Builder() {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [videos, setVideos] = useState(null);
  const [step, setStep] = useState("base");

  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState(null);

  const finalImage = location.state?.image;

  useEffect(() => {
    getBuilderItem(id).then(setItem);
    getVideos(id).then(setVideos).catch(console.error);
  }, [id]);

  if (!item) return <p className="loading">Loading...</p>;

  const toggleTopping = (topping) => {
    setSelectedToppings((prev) =>
      prev.some((t) => t.name === topping.name)
        ? prev.filter((t) => t.name !== topping.name)
        : [...prev, topping]
    );
  };

  const total =
    (selectedBase?.price || 0) +
    selectedToppings.reduce((sum, t) => sum + t.price, 0) +
    (selectedSauce?.price || 0);

  const stepLabels = [
    { key: "base", title: item.base.title },
    { key: "toppings", title: item.toppings.title },
    { key: "sauces", title: item.sauces.title },
  ];

  return (
    <div className="builder-layout">
      <div className="builder-container">
        <h1 className="builder-title">{item.name} Builder</h1>

        <div className="builder-steps">
          {stepLabels.map((s, i) => (
            <div key={s.key} className="step-wrapper">
              <Step label={s.title} active={step === s.key} completed={(s.key === "base" && step !== "base") || (s.key === "toppings" && step === "sauces")} />
              {i < stepLabels.length - 1 && <Line active={step === "toppings" || step === "sauces"} />}
            </div>
          ))}
        </div>

        <h2 className="total">Total ₹{total}</h2>

        {step === "base" && (
          <div className="options">
            <h3>{item.base.title}</h3>
            {item.base.options.map((b) => (
              <label key={b.name}>
                <input type="radio" name="base" checked={selectedBase?.name === b.name} onChange={() => setSelectedBase(b)} />
                {b.name} (+₹{b.price})
              </label>
            ))}
            <button disabled={!selectedBase} onClick={() => setStep("toppings")}>Next →</button>
          </div>
        )}

        {step === "toppings" && (
          <div className="options">
            <h3>{item.toppings.title}</h3>
            {item.toppings.options.map((t) => (
              <label key={t.name}>
                <input type="checkbox" checked={selectedToppings.some((x) => x.name === t.name)} onChange={() => toggleTopping(t)} />
                {t.name} (+₹{t.price})
              </label>
            ))}
            <button onClick={() => setStep("sauces")}>Next →</button>
          </div>
        )}

        {step === "sauces" && (
          <div className="options">
            <h3>{item.sauces.title}</h3>
            {item.sauces.options.map((s) => (
              <label key={s.name}>
                <input type="radio" name="sauce" checked={selectedSauce?.name === s.name} onChange={() => setSelectedSauce(s)} />
                {s.name} (+₹{s.price})
              </label>
            ))}
            <button disabled={!selectedBase} onClick={() => {
              const customizedItem = {
                id: item._id,
                name: item.name,
                image: finalImage,
                base: selectedBase,
                toppings: selectedToppings,
                sauce: selectedSauce,
                price: total,
              };
              addToCart(customizedItem);
              alert("Added to cart!");
            }}>
              Add to Cart
            </button>
          </div>
        )}
      </div>

      <div className="builder-preview">
        {videos ? (
          <video src={videos.video} autoPlay loop muted className="builder-image" />
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </div>
  );
}

function Step({ label, active, completed }) {
  return <div className={`step ${active ? "active" : ""} ${completed ? "completed" : ""}`}>{label}</div>;
}
function Line({ active }) {
  return <div className={`step-line ${active ? "active" : ""}`} />;
}
