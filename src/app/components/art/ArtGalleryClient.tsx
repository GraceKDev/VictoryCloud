"use client"

import { use, useState } from "react"
import ArtItem, { ArtItemProps } from "./ArtItem"
import ArtModal from "./ArtModal"
import { ArtInterface } from "@/app/lib/types/art"
import { useFilter } from "@/app/lib/filters/FilterContext"

interface ArtGalleryClientProps {
    art: ArtInterface[]
}

export default function ArtGalleryClient({ art }: ArtGalleryClientProps) {
    const { state } = useFilter()
    const [selectedArt, setSelectedArt] = useState<ArtInterface | null>(null)
    const filtered = art.filter((artItem) => {
        const term = state.search.toLowerCase();
        const matchesSearch =
            artItem.title.toLowerCase().includes(term) ||
            artItem.description.toLowerCase().includes(term) ||
            artItem.tags.some((tag) => tag.toLowerCase().includes(term));
        const matchesCategory =
            !state.artCategory ||
            artItem.tags.some((tag) => tag.toLowerCase() === state.artCategory.toLowerCase());
        return matchesSearch && matchesCategory;
    });
    return (
        <>
            <div className="relative">
                <p className=" z-10 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-4  rounded">
                    {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </p>
                <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,280px))] auto-rows-[280px] justify-center">
                    {filtered.map((artItem) => (
                        <ArtItem
                            key={artItem.id}
                            {...artItem}
                            onClick={() => setSelectedArt(artItem)}
                        />
                    ))}
                </section>
            </div>
            {selectedArt && (
                <ArtModal onClose={() => setSelectedArt(null)} {...selectedArt} />
            )}
        </>
    )
}
