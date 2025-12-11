"use client";

import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
}

export default function InputView() {
      const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !title || !desc) {
      alert("Missing fields")
      return
    }

    const formData = new FormData()
    formData.append("image", file)
    formData.append("title", title)
    formData.append("description", desc)

    const res = await fetch("/api/productsdb", {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    alert(data.message)

    setFile(null)
    setTitle("")
    setDesc("")
  }

      const [products, setProducts] = useState<Product[]>([]);
      const [editProduct, setEditProduct] = useState<Product | null>(null);
    
      const fetchProducts = async () => {
        const res = await fetch("/api/productsdb");
        const data = await res.json();
        setProducts(data);
      }
    
      useEffect(() => {
        fetchProducts();
      }, []);
    
      const handleUpdate = async () => {
    
        if (!editProduct) return;
    
        await fetch("api/productsdb", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editProduct),
        });
    
        setEditProduct(null);
        fetchProducts();
      }
    
      const handleDelete = async (id: number) => {
        await fetch(`/api/productsdb?id=${id}`, { method: "DELETE" });
        fetchProducts();
      };
    return (
        <>
        <main className="w-full p-4 sm:p-8">
        <div className="max-w-xl mx-auto flex flex-col justify-start border w-full gap-6 p-5">

          <h1 className="text-2xl font-semibold text-gray-800">Add Products</h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white p-6 shadow-sm border border-gray-100"
          >
            {/* Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Name"
              className="w-full p-3 border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition"
            />

            {/* Image */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
              className="w-full p-3 border border-gray-300 bg-white focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition"
            />

            {/* Desc */}
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Product Description"
              className="w-full p-3 border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition"
            />

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 hover:bg-gray-700 transition font-medium"
            >
              Add
            </button>
          </form>

        </div>
      </main>
        </>
    )
}