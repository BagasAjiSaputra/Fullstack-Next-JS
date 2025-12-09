import bcrypt from "bcryptjs"
import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    )
  }

  // ✅ cek email
  const [existing]: any = await db.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  )

  if (existing.length > 0) {
    return NextResponse.json(
      { message: "Email already registered" },
      { status: 409 }
    )
  }

  // ✅ hash password
  const hashed = await bcrypt.hash(password, 10)

  // ✅ insert
  await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashed, "user"]
  )

  return NextResponse.json({ message: "User registered" })
}
