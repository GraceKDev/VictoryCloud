"use client"
import { ComicInterface } from "@/app/lib/types/comic";


export default function ComicChapterTab({ comic }: { comic: ComicInterface }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Chapters: {comic.chapters.length}</h2>
            {comic.chapters.map((chapter, index) => (
                <div key={index} className="mb-4 p-4 border rounded">
                    <h3 className="text-xl font-semibold mb-2">{chapter.chapterTitle}</h3>
                    <p>ye</p>
                </div>
            ))}
        </section>
    );
};