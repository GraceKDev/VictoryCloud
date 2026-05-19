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
        return (
            artItem.title.toLowerCase().includes(term) ||
            artItem.description.toLowerCase().includes(term) ||
            artItem.tags.some((tag) => tag.toLowerCase().includes(term))
        );
    });
    return (
        <>
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
