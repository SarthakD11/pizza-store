import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      props.history.push("/account");
    }
  }, [props.history]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      props.history.push("/account");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "50px", maxWidth: "400px" }}>
      <h2>Login</h2>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      <form onSubmit={submitHandler}>
        <div>
          <input
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <br />

        <div>
          <input
            type="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <br />

        <button
          type="submit"
          style={{
            padding: "8px 15px",
            backgroundColor: "#ff4d4d",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      <br />

      <p>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginScreen;