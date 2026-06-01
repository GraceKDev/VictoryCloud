import ArtGalleryClient from "./ArtGalleryClient"
import { art } from "@/app/lib/art"

export default function ArtDisplayGrid() {
    return (
        <ArtGalleryClient art={art} />
    )
}