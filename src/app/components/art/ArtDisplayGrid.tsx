import ArtGalleryClient from "./ArtGalleryClient"
import { art } from "@/app/lib/art"

export default function ArtDisplayGrid() {
    return (
        <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,280px))] auto-rows-[280px] justify-center">
            <ArtGalleryClient art={art} />
        </section>
    )
}