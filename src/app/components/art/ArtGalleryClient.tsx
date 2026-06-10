"use client"

import { useState } from "react"
import ArtItem from "./ArtItem"
import ArtModal from "./ArtModal"

import { useFilter } from "@/app/lib/filters/FilterContext"
import Filters from "../global/Filters"
import { ArtApiDto } from "@/app/lib/types/art"

type ArtGalleryClientProps = {
    art: ArtApiDto[];
};

export default function ArtGalleryClient({ art }: ArtGalleryClientProps) {
    const { state } = useFilter()
    const [selectedArt, setSelectedArt] = useState<ArtApiDto | null>(null)
    const filtered = art.filter((artItem) => {
        const term = state.search.toLowerCase();
        const matchesSearch =
            artItem.title.toLowerCase().includes(term) ||
            artItem.description.toLowerCase().includes(term) ||
            artItem.tags.some((tag: string) => tag.toLowerCase().includes(term));
        const matchesCategory =
            !state.artCategory ||
            artItem.tags.some((tag: string) => tag.toLowerCase() === state.artCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });
    return (
        <div>
            <div className="relative">
                <Filters numResults={filtered.length} />
                <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,280px))] auto-rows-[280px] justify-center">
                    {filtered.map((artItem) => (
                        <ArtItem
                            key={artItem.artId}
                            {...artItem}
                            onClick={() => setSelectedArt(artItem)}
                        />
                    ))}
                </section>
            </div>
            {selectedArt && (
                <ArtModal onClose={() => setSelectedArt(null)} {...selectedArt} />
            )}
        </div>
    )
}
