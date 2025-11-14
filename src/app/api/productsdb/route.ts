import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/db";
import fs from "fs";
import path from "path";

export async function GET() {
    const [rows] = await db.query("SELECT * FROM products");
    return NextResponse.json(rows);
}

export async function POST(req: Request) {

    const formData = await req.formData();

    const file = formData.get("image") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    // Validasi Form Lengkap
    if (!file || !title || !description) {
        return NextResponse.json(
            { error: "Missing Fields" },
            { status: 400 }
        );
    };

    // Buat Folder Jika Belum Ada
    const pathImage = path.join(process.cwd(), "public/images");
    if (!fs.existsSync(pathImage)) fs.mkdirSync(pathImage, { recursive: true});

    // Nama + Tanggal Biar Gak Duplikat
    const timestamp = Date.now();
    const nameFile = `${timestamp}_${file.name}`;
    const pathFile = path.join(pathImage, nameFile);

    // Simpan Filenya cuy
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(pathFile, buffer);

    // Path Image String
    const url = `/images/${nameFile}`;

    // Insert SQL
    const [result] = await db.query(
        "INSERT INTO products (title, image, description) VALUES (?, ?, ?)",
        [title, url, description]
    );

    return NextResponse.json({
        message: "Product Added !",
        id: result,
        image: url,
    });

};

export async function PUT(req: NextRequest) {
  try {
    const { id, title, image, description } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    const [result] = await db.query(
      "UPDATE products SET title = ?, image = ?, description = ? WHERE id = ?",
      [title, image, description, id]
    );

    // result.affectedRows bisa digunakan untuk cek apakah ada yang diupdate
    return NextResponse.json({ message: "Product updated successfully" });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
