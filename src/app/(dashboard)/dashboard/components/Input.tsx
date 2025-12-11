"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
}

// Tambahkan props untuk kontrol modal
interface InputViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InputView({ isOpen, onClose }: InputViewProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title || !desc) {
      toast.error("Missing fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", desc);

try {
  const res = await fetch("/api/productsdb", {
    method: "POST",
    body: formData,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    toast.error(data?.message || "Gagal mengirim data");
    return;
  }

  toast.success(data?.message || "Berhasil!");
} catch (e) {
  toast.error("Network error!");
}


    // Reset form
    setFile(null);
    setTitle("");
    setDesc("");
    onClose(); // Tutup modal setelah sukses
  };

  // Reset form saat modal dibuka/tutup
  useEffect(() => {
    if (isOpen) {
      setFile(null);
      setTitle("");
      setDesc("");
    }
  }, [isOpen]);

  // Cegah scroll body saat modal terbuka (opsional)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop gelap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()} // Cegah tutup saat klik di dalam modal
          >
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Tambah Produk</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Product Name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition"
                    required
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setFile(e.target.files[0])}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition"
                    required
                  />

                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Product Description"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition font-medium"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}