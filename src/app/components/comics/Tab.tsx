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
            <div className="flex w-full overflow-hidden rounded-t-2xl border-b border-ashGrey/20">
                {tabs.map((tab, i) => (
                    <button
                        className={`flex-1 min-w-0 p-2 ${active === i ? "" : ""}`}
                        style={{
                            backgroundColor: active === i ? "var(--cms-tab-active-bg, #121619)" : "var(--cms-tab-inactive-bg, #2d4739)",
                            color: "var(--cms-tab-text, #f5f5f5)",
                        }}
                        key={i}
                        onClick={() => setActive(i)}
                    >
                        <span className="truncate block w-full">{tab.title}</span>
                    </button>
                ))}
            </div>
            <div
                className="border-x border-b rounded-b-2xl p-4 overflow-hidden"
                style={{
                    backgroundColor: "var(--cms-tab-panel-bg, #2d4739)",
                    borderColor: "var(--cms-tab-panel-border, #b5cbb7)",
                    color: "var(--cms-tab-panel-text, #f5f5f5)",
                }}
            >
                {tabs[active].content}
            </div>
        </div>
    );
}
