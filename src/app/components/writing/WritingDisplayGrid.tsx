"use client"
import { WritingApiDto } from "@/app/lib/types/writing";

import WritingItem from "./WritingItem";
import { useFilter } from "@/app/lib/filters/FilterContext";
import Filters from "../global/Filters";

interface WritingDisplayGridProps {
    writings: WritingApiDto[];
}
export default function WritingDisplayGrid(props: WritingDisplayGridProps) {
    const { writings } = props;
    const { state } = useFilter()
    const filtered = writings.filter((item) => {
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
            <Filters numResults={filtered.length} />
           
            <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,280px))] auto-rows-[540px] justify-center">
                {filtered.map((writing: WritingApiDto) => (
                    <a href={`/writing/${writing.writingId}`} key={writing.writingId}>
                        <WritingItem {...writing} />
                    </a>
                ))}
            </section>
        </>
    )
}