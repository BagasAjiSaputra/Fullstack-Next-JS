import Link from "next/link";

export default function Sidebar() {

    let sidebar = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
    ]

    return (
        <>
            <div className="w-1/5 min-h-screen bg-purple-200 p-4">
                <div className="flex flex-col">
                    {sidebar.map((item) => {
                        return (
                            <Link key={item.name} href={item.path} className="hover:bg-black hover:text-white px-4 py-2 transition ease-out">
                                {item.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}