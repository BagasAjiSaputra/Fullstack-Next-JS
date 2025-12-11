"use client";

import { create } from "zustand";
import { motion, AnimatePresence } from "framer-motion";

// ==== STORE UNTUK MENGONTROL DIALOG ====
type ConfirmState = {
  isOpen: boolean;
  message: string;
  resolve?: (value: boolean) => void;
  open: (message: string) => Promise<boolean>;
  close: (value: boolean) => void;
};

export const useConfirm = create<ConfirmState>((set) => ({
  isOpen: false,
  message: "",
  resolve: undefined,

  open: (message: string) => {
    return new Promise<boolean>((resolve) => {
      set({ isOpen: true, message, resolve });
    });
  },

  close: (value: boolean) =>
    set((state) => {
      state.resolve?.(value);
      return { isOpen: false, message: "" };
    }),
}));

// ==== KOMPONEN UI DIALOG ====
export default function ConfirmDialog() {
  const { isOpen, message, close } = useConfirm();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-[999]"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg"
          >
            <p className="text-lg font-medium">{message}</p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => close(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Batal
              </button>

              <button
                onClick={() => close(true)}
                className="px-4 py-2 bg-red-200 text-red-700 rounded-lg hover:bg-red-300"
              >
                Hapus
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
