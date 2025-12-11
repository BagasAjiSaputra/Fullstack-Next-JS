"use client" 

import { useState } from "react";
import TableView from "../components/Table"
import InputView from "../components/Input"
import toast from "react-hot-toast";

export default function CreatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <button
      onClick={() => toast.success("Product Updated!")}
      className="px-4 py-2 rounded-xl bg-blue-600 text-white shadow-md 
                 hover:bg-blue-700 transition-all"
    >
      Success
    </button>
    <button
      onClick={() => toast.error("Product Updated!")}
      className="px-4 py-2 rounded-xl bg-blue-600 text-white shadow-md 
                 hover:bg-blue-700 transition-all"
    >
      Error
    </button>

      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Add New Product
      </button>

      {/* Modal reusable */}
      <InputView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <TableView />
    </>
  )
}
