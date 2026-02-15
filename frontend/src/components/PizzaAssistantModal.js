import React, { useState } from "react";
import axios from "axios";

const PizzaAssistantModal = ({ onClose }) => {
  const [budget, setBudget] = useState(70);
  const [veg, setVeg] = useState(true);
  const [spicy, setSpicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const submitHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/assistant/build-pizza", {
        budget,
        veg,
        spicy,
      });
      setResults(data.recommendations);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1040,
        }}
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "900px",
          background: "#fff",
          borderRadius: "8px",
          padding: "25px",
          zIndex: 1050,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>🤖 Build My Pizza</h3>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: "22px" }}>×</button>
        </div>

        <hr />

        {/* Controls */}
        <div className="row">
          <div className="col-md-4">
            <label>Budget (₹)</label>
            <input
              type="range"
              min="30"
              max="150"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="form-control"
            />
            <strong>₹{budget}</strong>
          </div>

          <div className="col-md-4">
            <label>
              <input
                type="checkbox"
                checked={veg}
                onChange={() => setVeg(!veg)}
              />{" "}
              Vegetarian
            </label>
          </div>

          <div className="col-md-4">
            <label>
              <input
                type="checkbox"
                checked={spicy}
                onChange={() => setSpicy(!spicy)}
              />{" "}
              Spicy
            </label>
          </div>
        </div>

        <hr />

        <button
          className="btn btn-primary"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Get AI Recommendation"}
        </button>

        <hr />

        {/* Results */}
        {results.length > 0 && (
          <div className="row">
            {results.map((pizza) => (
              <div className="col-md-4" key={pizza._id}>
                <div className="panel panel-default">
                  <div className="panel-body">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="img-responsive"
                      style={{ borderRadius: "6px" }}
                    />
                    <h4>{pizza.name}</h4>
                    <p><strong>₹{pizza.price}</strong></p>
                    <ul>
                      {pizza.reasons.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PizzaAssistantModal;
