// app/(dashboard)/dashboard/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardClient from "./Dashboard"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/login")

  return (
<>
<p>Welcome {session.user?.email}</p>
      <p>Welcome {session.user?.role}</p>
<DashboardClient />
</>
)
}
