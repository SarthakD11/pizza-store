import React, { useEffect } from "react";

function AccountScreen(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      props.history.push("/login");
    }
  }, [user, props.history]);

  if (!user) return null;

  return (
    <div style={{ padding: "50px" }}>
      <h2>My Account</h2>
      <hr />
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default AccountScreen;