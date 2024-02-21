"use client";
import { addUser } from "../../services/userServices";
import React, { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !telephone || !password) {
      setFormError("Please complete all fields.");
      return;
    }

    setFormError("");

    try {
      const result = await addUser({ name, email, telephone, password });
      console.log("User added successfully!", result);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="form">
      <h1>Register</h1>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="tel">Telephone:</label>
        <input
          type="tel"
          id="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
