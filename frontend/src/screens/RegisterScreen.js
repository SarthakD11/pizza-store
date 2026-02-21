import React, { useState } from "react";
import axios from "axios";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));
      props.history.push("/account");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Register</h2>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="text"
            placeholder="Enter name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterScreen;