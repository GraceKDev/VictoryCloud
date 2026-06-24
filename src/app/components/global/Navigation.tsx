"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Comics", path: "/comics" },
        { name: "Art", path: "/art" },
        { name: "Writing", path: "/writing" },
        { name: "Commissions", path: "/commissions" },
    ];
    const adminPaths = ["/admindashboard", "/adminlogin"];
    const isAdmin = adminPaths.some((p) => pathname.startsWith(p));
    const navigate = (path: string) => {
        router.push(path);
        setMenuOpen(false);
    };
    const handleLogout = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_DEV}/Api/Auth/Logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!res.ok) {
            console.error("Logout failed:", res.statusText);
            return;
        }
        router.push("/");
    };
    return (
        <nav className="w-full sticky top-0 z-20 bg-pineTeal border-b-2 border-onyx shadow-md">
            <div className="w-full max-w-7xl mx-auto">
                <div className="px-4 sm:px-8 min-h-16 flex items-center justify-between gap-4">
                    <div>
                        <a onClick={() => navigate("/")}>
                            <h1 className="cursor-pointer font-bold text-offWhite text-2xl sm:text-3xl lg:text-4xl leading-none">
                                VictoryCloudWorks
                            </h1>
                        </a>
                    </div>

                    <ul className="hidden md:flex text-offWhite font-medium text-xl space-x-8 px-1">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a onClick={() => navigate(item.path)} className="cursor-pointer hover:text-gray-500 transition-colors">
                                    {item.name}
                                </a>
                            </li>
                        ))}
                        {isAdmin && (
                            <li>
                                <button onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-800 transition-colors font-medium">
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>

                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label="Toggle menu"
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded focus:outline-none shrink-0"
                    >
                        <span className={`block w-6 h-0.5 bg-offWhite transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-offWhite transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-6 h-0.5 bg-offWhite transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden border-t border-ashGrey/30 bg-onyx/95 backdrop-blur-sm shadow-lg">
                        <ul className="flex flex-col px-4 sm:px-8 py-4 space-y-4 text-offWhite font-medium text-sm">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <a onClick={() => navigate(item.path)} className="cursor-pointer hover:text-ashGrey transition-colors block">
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                            {isAdmin && (
                                <li className="border-t border-ashGrey/20 pt-4">
                                    <button onClick={handleLogout} className="cursor-pointer text-red-400 hover:text-red-300 transition-colors w-full text-left">
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
