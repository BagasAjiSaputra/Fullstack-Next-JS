import Link from "next/link";

export default function SiteHeader() {

    let nav = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" }
    ];
    return (
        <>
            <header className="w-full h-[10vh] backdrop-blur-md fixed top-0 left-0 bg-blue-200 flex items-center justify-end px-10 py-2">
                <div className="flex gap-3">
                    {nav.map((item) => {
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="hover:bg-black hover:text-white px-4 py-2 transition ease-in-out">
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </header>
        </>
    )
}