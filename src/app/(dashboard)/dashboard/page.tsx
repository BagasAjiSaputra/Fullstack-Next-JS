"use client";
import { useState } from "react";
import TableCRUD from "@/components/ui/Table";

export default function DashboardPage() {
    // const [image, setImage] = useState("");

    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file || !title || !desc) {
            alert("Midding Fields");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("description", desc);

        const res = await fetch("/api/productsdb", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        alert(data.message);
        // alert("Product Added !");

        setFile(null);
        setTitle("");
        setDesc("");
    };

    return (
        <>
            <main className=" w-full p-4 border">
                <div className="flex flex-col">
                    <h1>Add Products</h1>

                    <form onSubmit={(handleSubmit)} className="flex gap-2">

                        {/* Title */}
                        <input type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            placeholder="Product Name"
                            className="p-2 outline-none border border-gray-500"
                        />

                        {/* Image */}
                        <input type="file"
                            accept="image/*"
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                            placeholder="Image Product"
                            className="p-2 outline-none border border-gray-500"
                        />

                        {/* Desc */}
                        <input type="text"
                            value={desc}
                            onChange={(e) => {
                                setDesc(e.target.value);
                            }}
                            placeholder="Product Desc"
                            className="p-2 outline-none border border-gray-500"
                        />

                        <button type="submit" className="bg-green-300 text-green-700 px-4 py-2 hover:bg-green-400">
                            Add
                        </button>
                    </form>
                </div>
            </main>

            <TableCRUD />
        </>
    )
}