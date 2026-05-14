"use client"

import { useState } from "react"
import ArtItem, { ArtItemProps } from "./ArtItem"
import ArtModal from "./ArtModal"
import { ArtInterface } from "@/app/lib/types/art"

interface ArtGalleryClientProps {
    art: ArtInterface[]
}

export default function ArtGalleryClient({ art }: ArtGalleryClientProps) {
    const [selectedArt, setSelectedArt] = useState<ArtInterface | null>(null)

    return (
        <>
            {art.map((artItem) => (
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
