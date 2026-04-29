import Image from "next/image"
import { comics } from "@/app/lib/comics";
import ComicItem from "./ComicItem";


export default function DisplayGrid() {
    return (
        <section className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(200px,280px))] auto-rows-[540px] justify-center">
            {comics.map((comic) => (
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
    )

}