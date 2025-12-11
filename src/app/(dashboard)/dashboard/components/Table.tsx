"use client";

import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Image from "next/image";
import toast from "react-hot-toast";
import { useConfirm } from "./Confirm";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
}

export default function TableView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const confirm = useConfirm();

  const fetchProducts = async () => {
    const res = await fetch("/api/productsdb");
    const data = await res.json();
    setProducts(data);
    // toast.success("Refreshed")
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
    toast.success("Produk Diperbarui")
  }

  const handleDelete = async (id: number) => {
    const yes = await confirm.open("Yakin ingin menghapus produk ini?");
    if (!yes) return;

    await fetch(`/api/productsdb?id=${id}`, { method: "DELETE" });
    fetchProducts();
    toast.error("Product Dihapus")
  };

  return (
    <>
      <div className="w-full mx-auto bg-white p-4 mt-4 rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-semibold text-2xl text-gray-900">List Produk</h1>
          <button
            onClick={fetchProducts}
            className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
          >
            <FiRefreshCcw size={18} />
          </button>
        </div>

        {/* List Product */}
        <ul className="flex flex-col gap-3 w-full">
          {products.map((item) => (
            <li
              key={item.id}
              className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between 
       p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-all"
            >
              {/* Wrapper utama konten (text + image) */}
              <div className="flex flex-row-reverse justify-between sm:justify-start sm:flex-row gap-3 w-full sm:w-2/3 lg:w-3/4">
                {/* Gambar: muncul di KANAN di mobile, di KIRI di desktop */}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover flex"
                />

                {/* Teks */}
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900 text-base lg:text-lg">{item.title}</p>
                  <p className="text-sm lg:text-base text-gray-600 leading-snug max-w-[500px]">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Tombol aksi */}
              <div className="flex gap-2 w-full sm:w-auto mt-3 sm:mt-0 justify-start sm:justify-end flex-wrap">
                <button
                  onClick={() => setEditProduct(item)}
                  className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal Edit */}
        {editProduct && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg border border-gray-200 animate-fadeIn">

              <h1 className="font-semibold text-xl mb-4 text-gray-900">Edit Product</h1>

              <div className="flex flex-col gap-3">

                <input
                  type="text"
                  placeholder="Title"
                  value={editProduct.title}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, title: e.target.value })
                  }
                  className="px-4 py-2 outline-none border border-gray-300 rounded-xl w-full"
                />

                <input
                  type="text"
                  placeholder="Image"
                  value={editProduct.image}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, image: e.target.value })
                  }
                  className="px-4 py-2 outline-none border border-gray-300 rounded-xl w-full"
                />

                <input
                  type="text"
                  placeholder="Description"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, description: e.target.value })
                  }
                  className="px-4 py-2 outline-none border border-gray-300 rounded-xl w-full"
                />

                <div className="flex gap-2 justify-end pt-2">

                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                  >
                    Simpan
                  </button>

                  <button
                    onClick={() => setEditProduct(null)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                  >
                    Batal
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}
      </div>


    </>
  )
}