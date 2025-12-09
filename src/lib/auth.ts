// src/lib/auth.ts
import "server-only"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import db from "@/lib/db"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // ✅ 1. ambil user dari DB
        const [rows]: any = await db.query(
          "SELECT id, email, password, name, role FROM users WHERE email = ?",
          [credentials.email]
        )

        if (rows.length === 0) return null

        const user = rows[0]

        // ✅ 2. compare password hash (bcrypt)
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValid) return null

        // ✅ 3. return user → masuk JWT
        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 5 // 5 menit ✅
  },

  callbacks: {
    // ✅ JWT PERTAMA KALI LOGIN
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },

    // ✅ SESSION YANG DIPAKAI DI PAGE
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  },

  pages: {
    signIn: "/login"
  },

  secret: process.env.NEXTAUTH_SECRET
}
