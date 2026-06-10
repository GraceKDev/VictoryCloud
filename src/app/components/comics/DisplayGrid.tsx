"use client";
import { useFilter } from "@/app/lib/filters/FilterContext";
import ComicItem from "./ComicItem";
import Filters from "../global/Filters";
import { ComicApiDto } from "@/app/lib/types/comic";


interface DisplayGridProps {
    comics: ComicApiDto[];
}
export default function DisplayGrid(props: DisplayGridProps) {
    const { comics } = props;
    const { state } = useFilter();
    const filtered = comics.filter((comic) => {
        const term = state.search.toLowerCase();
        const matchesSearch =
            comic.title.toLowerCase().includes(term) ||
            comic.description.toLowerCase().includes(term) ||
            comic.tags.some((tag) => tag.toLowerCase().includes(term));
        const matchesCategory =
            !state.comicCategory ||
            comic.tags.some((tag) => tag.toLowerCase() === state.comicCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });

    return (
        <div>
            <Filters numResults={filtered.length} />
            <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,280px))] auto-rows-[540px] justify-center">
                {filtered.map((comic) => (
                    <ComicItem
                        key={comic.comicId}
                        comic={comic}
                    />
                ))}
            </section>
        </div>
    );
}