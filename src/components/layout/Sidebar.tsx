"use client";

import { motion } from "framer-motion";
import { Home, LayoutDashboard, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const menu = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Dashboard", href: "/dashboard/overview", icon: LayoutDashboard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-screen w-64 bg-white border-r border-gray-200 p-6 flex flex-col"
    >
      {/* Logo */}
      <div className="text-2xl font-bold mb-10">MyPanel</div>

      {/* Menu */}
      <nav className="flex flex-col gap-4 flex-1">
        {menu.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-100 transition">
        <LogOut size={20} />
        Logout
      </button>
    </motion.aside>
  );
}
