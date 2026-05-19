"use client";
import { comics } from "@/app/lib/comics";
import { useFilter } from "@/app/lib/filters/FilterContext";
import ComicItem from "./ComicItem";

export default function DisplayGrid() {
    const { state } = useFilter();

    const filtered = comics.filter((comic) => {
        const term = state.search.toLowerCase();
        return (
            comic.title.toLowerCase().includes(term) ||
            comic.description.toLowerCase().includes(term) ||
            comic.tags.some((tag) => tag.toLowerCase().includes(term))
        );
    });

    return (
        <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,280px))] auto-rows-[540px] justify-center">
            {filtered.map((comic) => (
                <ComicItem
                    key={comic.id}
                    id={comic.id}
                    title={comic.title}
                    description={comic.description}
                    tags={comic.tags}
                    imageUrl={comic.coverImageUrl}
                />
            ))}
        </section>
    );
}