"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
}

export default function TableCRUD() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Fetch semua produk (Read)
  const fetchProducts = async () => {
    const res = await fetch("/api/productsdb");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update produk (PUT)
  const handleUpdate = async () => {
    if (!editProduct) return;
    await fetch("/api/productsdb", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editProduct),
    });
    setEditProduct(null);
    fetchProducts();
  };

  // Delete produk
  const handleDelete = async (id: number) => {
    await fetch(`/api/productsdb?id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Product CRUD (Read / Update / Delete)</h1>

      {/* List Produk */}
      <ul className="mb-4">
        {products.map((p) => (
          <li key={p.id} className="mb-2">
            <strong>{p.title}</strong> - {p.description}
            <button
              className="ml-2 text-blue-500"
              onClick={() => setEditProduct(p)}
            >
              Edit
            </button>
            <button
              className="ml-2 text-red-500"
              onClick={() => handleDelete(p.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Form Edit */}
      {editProduct && (
        <div className="border p-2">
          <h2 className="font-semibold mb-2">Edit Product</h2>
          <input
            type="text"
            placeholder="Title"
            value={editProduct.title}
            onChange={(e) =>
              setEditProduct({ ...editProduct, title: e.target.value })
            }
            className="border p-1 mb-2 block w-full"
          />
          <input
            type="text"
            placeholder="Image"
            value={editProduct.image}
            onChange={(e) =>
              setEditProduct({ ...editProduct, image: e.target.value })
            }
            className="border p-1 mb-2 block w-full"
          />
          <input
            type="text"
            placeholder="Description"
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
            className="border p-1 mb-2 block w-full"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-2 py-1 mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setEditProduct(null)}
            className="bg-gray-300 px-2 py-1"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
