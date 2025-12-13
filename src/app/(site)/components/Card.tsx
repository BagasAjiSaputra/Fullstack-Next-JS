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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Terjadi kesalahan saat mengambil data.");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setList(data);
        setLoading(false);
      } catch (err) {
        setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-red-500 font-semibold text-lg mb-4">{error}</p>
        <p className="text-gray-500">Silakan refresh halaman atau coba beberapa saat lagi.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="w-full mx-auto flex flex-wrap gap-6 justify-start">
        {list.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] 
            bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md 
            transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="h-56 flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={180}
                height={180}
                className="object-contain p-2"
              />
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
