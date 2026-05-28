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
        const res = await fetch("http://localhost:5266/Api/Auth/Logout", {
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
        <nav className="w-full bg-white shadow-md">
            <div className="px-8 flex justify-between items-center py-4 h-full">
                <div>
                    <a onClick={() => navigate("/")}>
                        <h1 className="text-2xl cursor-pointer font-bold text-black">VictoryCloudWorks</h1>
                    </a>
                </div>

                <ul className="hidden md:flex text-black font-medium text-xl space-x-8 px-1">
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
                    className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded focus:outline-none"
                >
                    <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden border-t border-gray-100">
                    <ul className="flex flex-col px-8 py-4 space-y-4 text-black font-medium text-sm">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a onClick={() => navigate(item.path)} className="cursor-pointer hover:text-gray-500 transition-colors block">
                                    {item.name}
                                </a>
                            </li>
                        ))}
                        {isAdmin && (
                            <li className="border-t border-gray-100 pt-4">
                                <button onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-800 transition-colors w-full text-left">
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}