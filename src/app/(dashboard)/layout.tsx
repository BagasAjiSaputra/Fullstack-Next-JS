"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./dashboard/components/Sidebar";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import ConfirmDialog from "./dashboard/components/Confirm";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar: tetap dirender, logika tampil disembunyikan di dalam Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Hamburger hanya di mobile */}
        <header className="md:hidden p-4 bg-white shadow-sm sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </header>

        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-6"
        >
          {children}
        </motion.main>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "border border-gray-300 shadow-lg rounded-xl bg-white dark:bg-neutral-900 ", // ← ini kuncinya!
          style: { fontSize: "18px", fontWeight: 400, color: "#1f2937" },
          success: { style: { color: "#059669" } },
          error: { style: { color: "#dc2626" } },
        }}
      />
      <ConfirmDialog />
    </div>
  );
}