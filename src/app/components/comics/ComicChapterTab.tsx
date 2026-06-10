"use client"
import Link from "next/link";
import { ComicApiDto } from "@/app/lib/types/comic";

export default function ComicChapterTab({ comic }: { comic: ComicApiDto }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Chapters: {comic.chapters.length}</h2>
            {comic.chapters.map((chapter, index) => (
                <Link
                    key={index}
                    href={`/comics/${comic.comicId}/${index}`}
                    className="block mb-4"
                >
                    <div className="p-4 border rounded hover:bg-gray-50 hover:-translate-y-0.5 transition-transform duration-150 cursor-pointer">
                        <h3 className="text-xl font-semibold mb-1">{chapter.chapterTitle}</h3>
                        <p className="text-sm text-gray-500">
                            {chapter.images.length} {chapter.images.length === 1 ? "page" : "pages"}
                        </p>
                    </div>
                </Link>
            ))}
        </section>
    );
};