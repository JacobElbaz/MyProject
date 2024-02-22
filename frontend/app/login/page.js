"use client";
import React, { useState } from "react";
import { logInUser } from "../../services/userServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setFormError("Please complete all fields.");
      return;
    }

    setFormError("");

    try {
      const result = await logInUser({ email, password });
      console.log("User logged in successfully!", result);
      toast.success(`Welcome ${result.userName} !`);
      router.push("/users");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
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
      <Toaster/>
    </div>
  );
}

export default LoginPage;
