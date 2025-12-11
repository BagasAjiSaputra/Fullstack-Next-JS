import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  /* ================= VALIDATION ================= */
  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "Missing fields" },
      { status: 400 }
    )
  }

  /* ================= CEK EMAIL ================= */
  const { data: existingUser } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", email)
    .single()

  if (existingUser) {
    return NextResponse.json(
      { message: "Email already registered" },
      { status: 409 }
    )
  }

  /* ================= HASH PASSWORD ================= */
  const hashedPassword = await bcrypt.hash(password, 10)

  /* ================= INSERT USER ================= */
  const { error } = await supabaseAdmin.from("users").insert({
    name,
    email,
    password: hashedPassword,
    role: "user"
  })

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ message: "User registered" }, { status: 201 })
}
