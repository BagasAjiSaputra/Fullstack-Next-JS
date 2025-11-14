"use client";
import { useState } from "react";

export default function DashboardPage() {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch("/api/productsdb", {
            method: "POST",
            body: JSON.stringify({
                image,
                title,
                description : desc,
            }),
        });

        alert("Product Added !");

        setImage("");
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
                        <input type="text"
                            value={image}
                            onChange={(e) => {
                                const val = e.target.value;

                                if (!val.startsWith("/")) {
                                    setImage("/" + val);
                                } else {
                                    setImage(val);
                                }

                            }}
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
        </>
    )
}