"use client"
import Link from "next/link";
import { ComicApiDto } from "@/app/lib/types/comic";

export default function ComicChapterTab({ comic }: { comic: ComicApiDto }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--cms-comics-panel-text, var(--cms-tab-panel-text, #f5f5f5))" }}>
                Chapters: {comic.chapters.length}
            </h2>
            {comic.chapters.map((chapter, index) => (
                <Link
                    key={index}
                    href={`/comics/${comic.comicId}/${index}`}
                    className="block mb-4"
                >
                    <div
                        className="p-4 border rounded hover:-translate-y-0.5 transition-transform duration-150 cursor-pointer"
                        style={{
                            backgroundColor: "var(--cms-comics-panel-bg, var(--cms-tab-panel-bg, #2d4739))",
                            borderColor: "var(--cms-comics-panel-accent, var(--cms-tab-panel-border, #b5cbb7))",
                        }}
                    >
                        <h3 className="text-xl font-semibold mb-1" style={{ color: "var(--cms-comics-panel-text, var(--cms-tab-panel-text, #f5f5f5))" }}>
                            {chapter.chapterTitle}
                        </h3>
                        <p className="text-sm" style={{ color: "var(--cms-comics-panel-text, var(--cms-tab-panel-text, #f5f5f5))" }}>
                            {chapter.images.length} {chapter.images.length === 1 ? "page" : "pages"}
                        </p>
                    </div>
                </Link>
            ))}
        </section>
    );
};
