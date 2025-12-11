"use client";

import { motion } from "framer-motion";
import { Home, LayoutList, CopyPlus, Eye} from "lucide-react";
import Link from "next/link";
import LogoutButton from "./Logout";
import { useEffect, useState } from "react";



export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const menu = [
    { name: "Beranda", href: "/dashboard", icon: Home },
    { name: "Produk", href: "/dashboard/product", icon: LayoutList },
    // { name: "Create", href: "/dashboard/create", icon: CopyPlus },
    { name: "Lihat", href: "/", icon: Eye },
  ];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Deteksi mobile (hanya di client)
  const isMobile = isClient && window.innerWidth < 768;

  return (
    <>
      {/* Overlay untuk mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        // Desktop: selalu tampil, posisi statis
        // Mobile: hanya tampil jika isOpen, posisi fixed
        className={`
          h-screen w-64 bg-white border-r border-gray-200 p-6 flex flex-col
          ${isMobile
            ? `fixed left-0 top-0 z-50 ${isOpen ? 'visible' : 'hidden'}`
            : 'sticky top-0 hidden md:flex'
          }
        `}
        initial={isMobile ? { x: "-100%" } : undefined}
        animate={isMobile ? (isOpen ? { x: 0 } : { x: "-100%" }) : undefined}
        transition={isMobile ? { type: "tween", duration: 0.3 } : undefined}
      >
        <div className="text-2xl font-bold mb-10">Dashboard</div>
        <nav className="flex flex-col gap-4 flex-1">
          {menu.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-100 hover:text-orange-700 transition"
                onClick={isMobile ? onClose : undefined}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <LogoutButton />
      </motion.aside>
    </>
  );
}