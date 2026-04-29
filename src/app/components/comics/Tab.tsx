"use client"
import { useState, ReactNode } from "react";

// Just simple data and a pre-rendered node
export interface TabItem {
    title: string;
    content: ReactNode; 
}

interface TabProps {
    tabs: TabItem[];
    className?: string;
}

export default function Tab({ tabs, className }: TabProps) {
    const [active, setActive] = useState(0);
    return (
        <div className={className}>
            <div className="flex w-full">
                {tabs.map((tab, i) => (
                    <button
                        className={`flex-1 min-w-0 p-2 ${active === i ? "bg-gray-800 text-white" : "bg-gray-600 text-gray-200"}`}
                        key={i}
                        onClick={() => setActive(i)}
                    >
                        <span className="truncate block w-full">{tab.title}</span>
                    </button>
                ))}
            </div>
            <div>{tabs[active].content}</div>
        </div>
    );
}