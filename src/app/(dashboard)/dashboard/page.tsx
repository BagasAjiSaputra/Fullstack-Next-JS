import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/login")

  return (
    <div
      className="w-full p-6"
    >
      {/* Welcome Card */}
      <div className="bg-white shadow-sm rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-semibold mb-2">
          Guten Tag グーテンタグ <span className="text-blue-600">{session.user?.name || session.user?.email}</span>
        </h1>

        {/* <p className="text-gray-500 text-sm">
          Role: <span className="font-medium">{session.user?.role}</span>
        </p> */}
      </div>
    </div>
  )
}
