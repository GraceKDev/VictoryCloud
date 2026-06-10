"use client"
import { WritingApiDto } from "@/app/lib/types/writing";
import Link from "next/link";

export default function WritingChapterTab({ writing }: { writing: WritingApiDto }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Chapters: {writing.chapters.length}</h2>
            {writing.chapters.map((chapter, index) => (
                <Link
                    key={index}
                    href={`/writing/${writing.writingId}/${index}`}
                    className="mb-3 flex items-center justify-between p-4 border rounded bg-gray-50 hover:bg-gray-100"
                >
                    <span className="font-semibold">{chapter.writingChapterTitle}</span>
                    <span className="text-gray-500 text-sm">Read →</span>
                </Link>
            ))}
        </section>
    );
}
