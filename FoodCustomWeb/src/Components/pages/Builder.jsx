import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBuilderItem,getVideos } from "../../services/api";

export default function Builder({ addToCart }) {
  const { id } = useParams();
  const location = useLocation();

  const [item, setItem] = useState(null);
  const [videos, setVideos] = useState(null);
  const [step, setStep] = useState("base");
  

  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState(null);

  // GET IMAGE FROM CUSTOMIZE PAGE
  const finalImage = location.state?.image;


  /* FETCH BUILDER DATA */
  useEffect(() => {
    getBuilderItem(id).then(setItem);
  }, [id]);


    // Fetch video by item id
  useEffect(() => {
    getVideos(id)
      .then(setVideos)
      .catch(err => console.error("Error fetching video:", err));
  }, [id]);


  if (!item) return <p className="loading">Loading...</p>;

  /* TOGGLE TOPPINGS */
  const toggleTopping = (topping) => {
    setSelectedToppings((prev) =>
      prev.some((t) => t.name === topping.name)
        ? prev.filter((t) => t.name !== topping.name)
        : [...prev, topping]
    );
  };

  /* TOTAL */
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

      {/* LEFT SIDE OPTIONS */}
      <div className="builder-container">
        <h1 className="builder-title">{item.name} Builder</h1>

        {/* STEPPER */}
        <div className="builder-steps">
          {stepLabels.map((s, i) => (
            <div key={s.key} className="step-wrapper">
              <Step
                label={s.title}
                active={step === s.key}
                completed={
                  (s.key === "base" && step !== "base") ||
                  (s.key === "toppings" && step === "sauces")
                }
              />
              {i < stepLabels.length - 1 && (
                <Line active={step === "toppings" || step === "sauces"} />
              )}
            </div>
          ))}
        </div>

        <h2 className="total">Total ₹{total}</h2>

        {/* BASE OPTIONS */}
        {step === "base" && (
          <div className="options">
            <h3>{item.base.title}</h3>

            <div className="options-group">
              {item.base.options.map((item) => (
                <label key={item.name} className="option-item">
                  <input
                    type="radio"
                    name="base"
                    checked={selectedBase?.name === item.name}
                    onChange={() => setSelectedBase(item)}
                  />
                  {item.name} (+₹{item.price})
                </label>
              ))}
            </div>

            <button
              className="next-btn"
              disabled={!selectedBase}
              onClick={() => setStep("toppings")}
            >
              Next →
            </button>
          </div>
        )}

        {/* TOPPINGS OPTIONS */}
        {step === "toppings" && (
          <div className="options">
            <h3>{item.toppings.title}</h3>

            <div className="options-group">
              {item.toppings.options.map((item) => (
                <label key={item.name} className="option-item">
                  <input
                    type="checkbox"
                    checked={selectedToppings.some((x) => x.name === item.name)}
                    onChange={() => toggleTopping(item)}
                  />
                  {item.name} (+₹{item.price})
                </label>
              ))}
            </div>

            <button className="next-btn" onClick={() => setStep("sauces")}>
              Next →
            </button>
          </div>
        )}

        {/* SAUCE OPTIONS */}
        {step === "sauces" && (
          <div className="options">
            <h3>{item.sauces.title}</h3>

            <div className="options-group">
              {item.sauces.options.map((item) => (
                <label key={item.name} className="option-item">
                  <input
                    type="radio"
                    name="sauce"
                    checked={selectedSauce?.name === item.name}
                    onChange={() => setSelectedSauce(item)}
                  />
                  {item.name} (+₹{item.price})
                </label>
              ))}
            </div>

            <button
              className="add-to-cart"
              disabled={!selectedBase}
              onClick={() => {
                const customizedItem = {
                  id: item._id || item.id,
                  name: item.name,
                  image: finalImage,
                  base: selectedBase,
                  toppings: selectedToppings,
                  sauce: selectedSauce,
                  price: total,
                };

                addToCart(customizedItem);
              }}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>

      {/* RIGHT SIDE IMAGE */}
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

/* STEP COMPONENT */
function Step({ label, active, completed }) {
  return (
    <div className={`step ${active ? "active" : ""} ${completed ? "completed" : ""}`}>
      {label}
    </div>
  );
}

/* LINE */
function Line({ active }) {
  return <div className={`step-line ${active ? "active" : ""}`} />;
}




