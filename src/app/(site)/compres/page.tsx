"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { removeBackground } from "@imgly/background-removal";

type ProcessedFile = {
  name: string;
  originalSize: number;
  compressedSize: number;
  blob: Blob;
  previewUrl: string;
};

export default function ImageCompressorPage() {
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fungsi untuk kompres gambar ke format WebP
  const compressImage = (file: File, maxWidth = 1920, quality = 0.7) => {
    return new Promise<Blob>((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const scale = Math.min(maxWidth / img.width, 1);
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
          },
          "image/webp",
          quality
        );
      };
    });
  };

  // ✅ Fungsi hapus background (fix error Zod)
  const removeBg = async (file: File) => {
    try {
      const blob = await removeBackground(file, {
        output: { format: "image/png" }, // 🔧 fix: output harus object
        progress: (p) => console.log("Progress:", p),
      });
      return blob;
    } catch (error) {
      console.error("Remove BG failed:", error);
      return file;
    }
  };

  // ✅ Fungsi utama untuk handle file drop
  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);
    const processedFiles: ProcessedFile[] = [];

    for (const file of acceptedFiles) {
      // 1️⃣ Hapus background dulu
      const bgRemovedBlob = await removeBg(file);

      // 2️⃣ Kompres hasil remove background
      const compressedBlob = await compressImage(
        new File([bgRemovedBlob], file.name, { type: "image/png" })
      );

      const previewUrl = URL.createObjectURL(compressedBlob);

      processedFiles.push({
        name: file.name.replace(/\.[^/.]+$/, ".webp"),
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        blob: compressedBlob,
        previewUrl,
      });
    }

    setFiles(processedFiles);
    setLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const downloadFile = (file: ProcessedFile) => {
    saveAs(file.blob, file.name);
  };

  const downloadAll = () => {
    files.forEach((file) => saveAs(file.blob, file.name));
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">
        🧩 Remove Background & Compress WebP
      </h1>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center mx-auto max-w-3xl cursor-pointer transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the files here...</p>
        ) : (
          <p className="text-gray-600">
            Drag & drop images here, or click to select files
          </p>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-6 text-blue-500 animate-pulse">
          ⏳ Processing images... please wait
        </p>
      )}

      {/* Preview hasil */}
      {files.length > 0 && !loading && (
        <div className="mt-8 max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          {files.map((file, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-4"
            >
              <img
                src={file.previewUrl}
                alt={file.name}
                className="w-full rounded-md object-contain"
              />
              <div className="mt-3 text-center">
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {Math.round(file.originalSize / 1024)} KB →{" "}
                  {Math.round(file.compressedSize / 1024)} KB
                </p>
              </div>
              <button
                onClick={() => downloadFile(file)}
                className="mt-3 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Download
              </button>
            </motion.div>
          ))}

          {files.length > 1 && (
            <div className="sm:col-span-2 text-center">
              <button
                onClick={downloadAll}
                className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Download All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
