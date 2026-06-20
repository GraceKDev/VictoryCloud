"use client";
import { usePathname } from "next/navigation";
import { useFilter } from "../../lib/filters/FilterContext";
import { art } from "@/app/lib/art";
import { comics } from "@/app/lib/comics";
import { writing } from "@/app/lib/writing";

export default function Filters({ numResults }: { numResults: number }) {
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
                        className="w-full rounded border border-ashGrey p-2 sm:w-48"
                        style={{ backgroundColor: "var(--cms-filter-select-bg)", color: "var(--cms-filter-text)" }}
                        value={state.artCategory}
                        onChange={(e) => dispatch({ type: "SET_ART_CATEGORY", payload: e.target.value })}
                    >
                        <option value="" className="text-offWhite">All Tags</option>
                        {artTags.map((tag) => (
                            <option key={tag} value={tag} className="text-offWhite">{tag}</option>
                        ))}
                    </select>
                );
            case "/writing":
                return (
                    <select
                        className="w-full rounded border border-ashGrey p-2 sm:w-48"
                        style={{ backgroundColor: "var(--cms-filter-select-bg)", color: "var(--cms-filter-text)" }}
                        value={state.writingCategory}
                        onChange={(e) => dispatch({ type: "SET_WRITING_CATEGORY", payload: e.target.value })}
                    >
                        <option value="" className="text-offWhite">All Tags</option>
                        {writingTags.map((tag) => (
                            <option key={tag} value={tag} className="text-offWhite">{tag}</option>
                        ))}
                    </select>
                );
            case "/comics":
                return (
                    <select
                        className="w-full rounded border border-ashGrey p-2 sm:w-48"
                        style={{ backgroundColor: "var(--cms-filter-select-bg)", color: "var(--cms-filter-text)" }}
                        value={state.comicCategory}
                        onChange={(e) => dispatch({ type: "SET_COMIC_CATEGORY", payload: e.target.value })}
                    >
                        <option value="" className="text-offWhite">All Tags</option>
                        {comicTags.map((tag) => (
                            <option key={tag} value={tag} className="text-offWhite">{tag}</option>
                        ))}
                    </select>
                );
            default:
                return null;
        }
    };

    return (
        <section className="sticky top-16 z-10 mb-4 w-full">
            <div
                className="flex w-full flex-col gap-3 rounded-2xl border p-3 shadow-lg backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
                style={{ backgroundColor: "rgba(18, 22, 25, 0.92)", borderColor: "var(--cms-filter-select-bg)" }}
            >
                <p style={{ color: "var(--cms-filter-count-text)" }} className="text-sm sm:text-lg rounded">
                    {numResults} result{numResults !== 1 ? "s" : ""}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {category()}
                    <input
                        type="text"
                        placeholder="Search..."
                        value={state.search}
                        onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
                        className="w-full rounded border border-ashGrey p-2 sm:w-56"
                        style={{ backgroundColor: "var(--cms-filter-input-bg)", color: "var(--cms-filter-text)" }}
                    />
                </div>
            </div>
        </section>
    );
}
