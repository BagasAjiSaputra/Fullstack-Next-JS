"use client"

import { useState } from "react";
import TableView from "../components/Table"
import InputView from "../components/Input"
import { Plus } from "lucide-react";

export default function ProductPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex w-full justify-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-3 py-2 flex justify-center gap-2 bg-blue-200 text-blue-700 rounded hover:bg-blue-300"
                >
                    <Plus /> Tambah Produk
                </button>
            </div>

            {/* Modal reusable */}
            <InputView
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <TableView />
        </>
    )
}
