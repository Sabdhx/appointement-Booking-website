"use client";
import React from "react";
import Form from "./form/page";

function Registration() {
  const handleSubmit = async (formData: FormData) => {
    try {
      const body = {
        role: formData.get("role")?.toString().trim(),
        username: formData.get("username")?.toString().trim(),
        email: formData.get("email")?.toString().trim().toLowerCase(),
        password: formData.get("password")?.toString()
      };
      console.log(body)
      // Validation
      if (!body.email || !body.password || !body.username || !body.role) {
        throw new Error("All fields are required");
      }

      if (!body.email.includes("@")) {
        throw new Error("Please enter a valid email");
      }

      if (body.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const res = await fetch("/api/auth/registration", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      console.log("Registration success:", result);
    } catch (error: any) {
      console.error("Registration error:", error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Form submission={handleSubmit} />
    </div>
  );
}

export default Registration;