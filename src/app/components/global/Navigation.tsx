"use client";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const router = useRouter();
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Comics", path: "/comics" },
        { name: "Art", path: "/art" },
        { name: "Writing", path: "/writing" },
        { name: "Commissions", path: "/commissions" },
    ];
    return (
        <nav className="w-full bg-white  shadow-md">
            <div className="px-8 flex justify-between items-center py-8 h-full">
                <div>
                    <a onClick={() => router.push("/")}>
                        <h1 className="text-3xl cursor-pointer font-bold text-black">VictoryCloudWorks</h1>
                    </a>
                </div>
                <ul className="flex text-black  font-semibold space-x-8 px-1">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <div className=" cursor-pointer">
                                <a onClick={() => router.push(item.path)}>{item.name}</a>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>

        </nav>
    );
}