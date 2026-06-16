"use client"
import { WritingApiDto } from "@/app/lib/types/writing";
import Link from "next/link";

export default function WritingChapterTab({ writing }: { writing: WritingApiDto }) {
    return (
        <section>
            <h2
                style={{ color: "var(--cms-writing-heading)" }}
                className="text-2xl font-bold mb-4"
            >
                Chapters: {writing.chapters.length}
            </h2>

            {writing.chapters.map((chapter, index) => (
                <div key={index}>
                    <Link
                        href={`/writing/${writing.writingId}/${index}`}
                        className="
                    flex items-center justify-between p-4 rounded
                    transition-all duration-200
                    hover:saturate-40
                "
                        style={{
                            backgroundColor: "var(--cms-writing-card-bg)",
                            borderColor: "var(--cms-writing-card-border)",
                        }}
                    >
                        <div className="flex items-center gap-4">
                            <span>Chapter {index + 1} |</span>
                            <span className="font-semibold">
                                {chapter.writingChapterTitle}
                            </span>
                        </div>

                        <span
                            style={{ color: "var(--cms-writing-body)" }}
                            className="text-sm"
                        >
                            Read →
                        </span>
                    </Link>

                    <hr />
                </div>
            ))}
        </section>
    );
}
