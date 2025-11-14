"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Products {
  id: number;
  image: string;
  title: string;
  description: string;
}

export default function CardList() {
  const [list, setList] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect( () => {
    const fetchData = async () => {
      const res = await fetch('/api/productsdb');
      const data = await res.json();

      setList(data);
      setLoading(false);
    };

    fetchData();
  },[]);

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-start px-10 py-5 border">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-lg w-full">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Card */}
            <div className="w-full h-56 flex items-center justify-center bg-gray-50">
              <Image
                src={item.image}
                alt={item.title}
                width={180}
                height={180}
                className="object-contain"
              />
            </div>

            {/* Deskripsi */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{item.description}</p>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 rounded-sm bg-black text-white font-medium hover:bg-gray-700 transition">
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
