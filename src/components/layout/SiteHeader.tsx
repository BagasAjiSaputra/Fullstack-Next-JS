"use client"
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  const nav = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboards" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full h-[10vh] bg-blue-200/70 backdrop-blur-md flex items-center justify-between px-6 md:px-10 z-50">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-semibold"
      >
        MySite
      </motion.div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-4">
        {nav.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="px-4 py-2 rounded-xl hover:bg-black hover:text-white transition"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Toggle */}
      <button onClick={() => setOpen(!open)} className="md:hidden">
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[10vh] left-0 w-full bg-blue-200/90 backdrop-blur-lg flex flex-col gap-3 py-4 px-6 md:hidden shadow-lg"
          >
            {nav.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg hover:bg-black hover:text-white transition"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}