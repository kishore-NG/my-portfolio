"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Message sent!");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Me</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="p-3 border rounded"
        />

        <input
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          className="p-3 border rounded"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          onChange={handleChange}
          className="p-3 border rounded"
        />

        <button className="bg-black text-white py-3 rounded hover:bg-gray-800">
          Send Message
        </button>
      </form>
    </div>
  );
}