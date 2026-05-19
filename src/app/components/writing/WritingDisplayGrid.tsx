"use client"
import { WritingInterface } from "@/app/lib/types/writing";
import {writing} from "../../lib/writing";
import WritingItem from "./WritingItem";
import { useFilter } from "@/app/lib/filters/FilterContext";
export default function WritingDisplayGrid() {
    const {state} = useFilter()
    const filtered = writing.filter((writing) => {
        const term = state.search.toLowerCase();
        return (
            writing.title.toLowerCase().includes(term) ||
            writing.description.toLowerCase().includes(term) ||
            writing.tags.some((tag) => tag.toLowerCase().includes(term))
        );
    });
    return (
        
        <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,280px))] auto-rows-[540px] justify-center">
           {filtered.map((writing:WritingInterface) => (
            <a href={`/writing/${writing.id}`} key={writing.id}>
                <WritingItem {...writing} />
            </a>
        ))}
        </section>
    )
}