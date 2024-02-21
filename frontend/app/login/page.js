"use client";
import React, { useState } from "react";
import { logInUser } from "../../services/userServices";
import Link from "next/link";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setFormError("Please complete all fields.");
      return;
    }

    setFormError("");

    try {
      const result = await logInUser({ email, password });
      console.log("User added successfully!", result);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="form">
      <h1>Login</h1>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log in</button>
      </form>
      <p>
        Don't have an account?<Link href={"/register"}>{" Register"}</Link>
      </p>
    </div>
  );
}

export default LoginPage;
