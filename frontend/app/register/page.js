"use client";
import {
  formatPhoneNumber,
  isEmailValid,
  isPasswordValid,
  isPhoneNumberValid,
} from "../../utils/validations";
import { addUser } from "../../services/userServices";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !telephone || !password) {
      setFormError({ empty: true, message: "Please complete all fields." });
      return;
    }

    if (!isEmailValid(email)) {
      setFormError({
        email: true,
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (!isPhoneNumberValid(telephone)) {
      setFormError({
        phone: true,
        message: "Please enter a valid phone number.",
      });
      return;
    }

    if (!isPasswordValid(password)) {
      setFormError({
        password: true,
        message:
          "The password must contain at least one lowercase letter, one uppercase letter, one number and one special character, and have a minimum length of 8 characters.",
      });
      return;
    }

    setFormError(null);

    try {
      const result = await addUser({ name, email, telephone, password });
      console.log("User added successfully!", result);
      router.push("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="form">
      <h1>Register</h1>
      {formError?.empty && (
        <p style={{ color: "red", fontSize: "12px" }}>{formError.message}</p>
      )}
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
          style={formError?.email && { borderColor: "red" }}
        />
        {formError?.email && (
          <p style={{ color: "red", fontSize: "12px" }}>{formError.message}</p>
        )}

        <label htmlFor="tel">Phone Number:</label>
        <input
          type="tel"
          id="tel"
          value={telephone}
          style={formError?.phone && { borderColor: "red" }}
          onChange={(e) => setTelephone(formatPhoneNumber(e.target.value))}
        />
        {formError?.phone && (
          <p style={{ color: "red", fontSize: "12px" }}>{formError.message}</p>
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          style={formError?.password && { borderColor: "red" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {formError?.password && (
          <p style={{ color: "red", fontSize: "12px" }}>{formError.message}</p>
        )}

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?<Link href={"/login"}>{" Log In"}</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
