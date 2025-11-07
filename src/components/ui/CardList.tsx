"use client";

import Image from "next/image";

export default function CardList() {
  const list = [
    { id: 1, image: "/images/ip12.webp", title: "iPhone", desc: "A15 Bionic" },
    { id: 2, image: "/images/mac.webp", title: "Mac", desc: "M1 Chip" },
    { id: 3, image: "/images/ipad.webp", title: "iPad", desc: "A13 Bionic" },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-lg w-full">
        {list.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
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
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>

              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 rounded-lg bg-green-100 text-green-700 font-medium hover:bg-green-200 transition">
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
