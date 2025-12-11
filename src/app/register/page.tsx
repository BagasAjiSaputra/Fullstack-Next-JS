"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
      return;
    }

    toast.success("Register success, please login");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">Register</h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nama"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nama@gmail.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          Register
        </button>
        <div className="flex justify-between">
          <p className="text-center text-sm text-gray-600"><span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/")}
          >
            Kembali
          </span></p>
          <p className="text-center text-sm text-gray-600">
            Sudah punya akun ?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => router.push("/login")}
            >
              Login
            </span>
          </p>
        </div>

      </motion.form>
    </div>
  );
}
