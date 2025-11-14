import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
    const [rows] = await db.query("SELECT * FROM products");
    return NextResponse.json(rows);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { title, image, description} = body;

    const [result] = await db.query(
        "INSERT INTO products (title, image, description) VALUES (?, ?, ?)",
        [title, image, description]
    );

    return NextResponse.json({
        message: "Product Added !",
        id: result
    });
};