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
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">🤖 Build My Pizza</h4>
           <button className="close" onClick={onClose}>×</button>
          </div>

          <div className="modal-body">
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

        </div>
      </div>
    </div>
  );
};

export default PizzaAssistantModal;
