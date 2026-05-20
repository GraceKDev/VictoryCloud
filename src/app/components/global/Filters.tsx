"use client";
import { usePathname } from "next/navigation";
import { useFilter } from "../../lib/filters/FilterContext";
import { art } from "@/app/lib/art";
import { comics } from "@/app/lib/comics";
import { writing } from "@/app/lib/writing";

export default function Filters() {
    const { state, dispatch } = useFilter();
    const pathname = usePathname();

    const artTags = [...new Set(art.flatMap((a) => a.tags))];
    const comicTags = [...new Set(comics.flatMap((c) => c.tags))];
    const writingTags = [...new Set(writing.flatMap((w) => w.tags))];

    const category = () => {
        switch (pathname) {
            case "/art":
                return (
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={state.artCategory}
                        onChange={(e) => dispatch({ type: "SET_ART_CATEGORY", payload: e.target.value })}
                    >
                        <option value="">All Tags</option>
                        {artTags.map((tag) => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                );
            case "/writing":
                return (
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={state.writingCategory}
                        onChange={(e) => dispatch({ type: "SET_WRITING_CATEGORY", payload: e.target.value })}
                    >
                        <option value="">All Tags</option>
                        {writingTags.map((tag) => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                );
            case "/comics":
                return (
                    <select
                        className="p-2 border border-gray-300 rounded"
                        value={state.comicCategory}
                        onChange={(e) => dispatch({ type: "SET_COMIC_CATEGORY", payload: e.target.value })}
                    >
                        <option value="">All Tags</option>
                        {comicTags.map((tag) => (
                            <option key={tag} value={tag}>{tag}</option>
                        ))}
                    </select>
                );
            default:
                return null;
        }
    };

    return (
        <section className="flex w-full mb-4">
            <div className="flex justify-end w-full gap-4">
                {category()}
                <input
                    type="text"
                    placeholder="Search..."
                    value={state.search}
                    onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
        </section>
    );
}