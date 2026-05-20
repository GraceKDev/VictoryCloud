"use client"
import { WritingInterface } from "@/app/lib/types/writing";
import {writing} from "../../lib/writing";
import WritingItem from "./WritingItem";
import { useFilter } from "@/app/lib/filters/FilterContext";
export default function WritingDisplayGrid() {
    const {state} = useFilter()
    const filtered = writing.filter((item) => {
        const term = state.search.toLowerCase();
        const matchesSearch =
            item.title.toLowerCase().includes(term) ||
            item.description.toLowerCase().includes(term) ||
            item.tags.some((tag) => tag.toLowerCase().includes(term));
        const matchesCategory =
            !state.writingCategory ||
            item.tags.some((tag) => tag.toLowerCase() === state.writingCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });
    return (
        <>
            <p className="text-sm text-gray-500 mb-4">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,280px))] auto-rows-[540px] justify-center">
           {filtered.map((writing:WritingInterface) => (
            <a href={`/writing/${writing.id}`} key={writing.id}>
                <WritingItem {...writing} />
            </a>
        ))}
        </section>
        </>
    )
}