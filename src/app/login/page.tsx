"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res?.error) {
      router.push("/dashboard");
    } else {
      toast.error("Login gagal");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4"
      >
        <div className="text-center mb-2">
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-sm text-gray-600">
            Masuk ke dashboard kamu
          </p>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="joksw@gmail.com"
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition disabled:opacity-60"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <div className="flex justify-between">
          <p className="text-center text-sm text-gray-600"><span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/")}
          >
            Kembali
          </span></p>
          <p className="text-center text-sm text-gray-600">
            Belum punya akun?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => router.push("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </motion.form>
    </div>
  );
}