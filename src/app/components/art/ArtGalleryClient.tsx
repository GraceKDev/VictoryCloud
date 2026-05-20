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
    const {state} = useFilter() 
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
            <p className="text-sm text-gray-500 mb-4">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            {filtered.map((artItem) => (
                <ArtItem
                    key={artItem.id}
                    {...artItem}
                    onClick={() => setSelectedArt(artItem)}
                />
            ))}
            {selectedArt && (
                <ArtModal onClose={() => setSelectedArt(null)} {...selectedArt} />
            )}
        </>
    )
}
