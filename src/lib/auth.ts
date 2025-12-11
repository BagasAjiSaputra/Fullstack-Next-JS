import "server-only"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { supabaseAdmin } from "@/lib/supabase" 

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

        /* ========================
           ✅ 1. Ambil user dari Supabase
        ======================== */
        const { data: user, error } = await supabaseAdmin
          .from("users")
          .select("id, email, password, name, role")
          .eq("email", credentials.email)
          .single()

        if (error || !user) return null

        /* ========================
           ✅ 2. Compare bcrypt hash
        ======================== */
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isValid) return null

        /* ========================
           ✅ 3. Return user → JWT
        ======================== */
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 30 // 5 menit
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },

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


