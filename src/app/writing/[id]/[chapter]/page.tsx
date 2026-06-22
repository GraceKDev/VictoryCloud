import { WritingApiDto } from "@/app/lib/types/writing";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSafeImageSrc, hasUsableImageSrc } from "@/app/lib/utils/image";

interface ChapterPageParams {
    params: {
        id: string;
        chapter: string;
    };
}

export default async function ChapterPage({ params }: ChapterPageParams) {
    const { id, chapter } = await params;
    let writingItem: WritingApiDto | null = null;

    try {
        const res = await fetch(`${process.env.BACKEND_URL_DEV}/Api/Writing/Get/${id}`, {
            cache: "no-store",
        });
        if (res.ok) {
            writingItem = await res.json();
        }
    } catch (error) {
        console.error("Error fetching writing by id:", error);
    }

    if (!writingItem) notFound();

    const chapterIndex = parseInt(chapter);
    const chapterData = writingItem.chapters[chapterIndex];

    if (!chapterData) notFound();

    const sortedContent = [...chapterData.writingChapterContent].sort(
        (a, b) => a.writingContentPosition - b.writingContentPosition
    );

    const prevIndex = chapterIndex - 1;
    const nextIndex = chapterIndex + 1;
    const hasPrev = prevIndex >= 0;
    const hasNext = nextIndex < writingItem.chapters.length;

    return (
        <section style={{ backgroundColor: "var(--cms-writing-bg)" }} className="flex-1 text-offWhite">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
                <Link
                    href={`/writing/${id}`}
                    className="mb-6 inline-block text-sm text-offWhite/70 hover:text-offWhite"
                >
                    ← Back to {writingItem.title}
                </Link>

                <h1 className="mb-8 text-3xl font-bold" style={{ color: "var(--cms-writing-heading)" }}>
                    {chapterData.writingChapterTitle}
                </h1>

                <div className="flex flex-col gap-6">
                    {sortedContent.map((block, i) => {
                        const contentBlock = block.writingContentBlock?.[0];

                        if (block.writingContentType === "Text") {
                            return (
                                <p key={i} className="leading-relaxed text-offWhite/90">
                                    {contentBlock?.writingContentBlockContent}
                                </p>
                            );
                        }

                        if (block.writingContentType === "Image") {
                            const imageUrl = contentBlock?.writingContentBlockImageUrl;
                            const altText = contentBlock?.writingContentBlockAltText ?? "Chapter image";
                            const safeImageUrl = getSafeImageSrc(imageUrl);
                            return (
                                <div key={i} className="flex justify-center">
                                    {hasUsableImageSrc(imageUrl) ? (
                                        <Image
                                            src={safeImageUrl}
                                            alt={altText}
                                            width={300}
                                            height={200}
                                            className="rounded-xl border border-ashGrey/30 object-contain"
                                        />
                                    ) : (
                                        <div className="flex h-48 w-full items-center justify-center rounded-xl border border-ashGrey/30 text-sm text-offWhite/70">
                                            No image available
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>

                <div className="mt-12 flex justify-between gap-4 border-t border-ashGrey/20 pt-6">
                    {hasPrev ? (
                        <Link
                            href={`/writing/${id}/${prevIndex}`}
                            className="rounded px-4 py-2 hover:opacity-90"
                            style={{
                                backgroundColor: "var(--cms-writing-panel-bg)",
                                color: "var(--cms-writing-panel-text)",
                            }}
                        >
                            ← {writingItem.chapters[prevIndex].writingChapterTitle}
                        </Link>
                    ) : (
                        <span />
                    )}

                    {hasNext ? (
                        <Link
                            href={`/writing/${id}/${nextIndex}`}
                            className="rounded px-4 py-2 hover:opacity-90"
                            style={{
                                backgroundColor: "var(--cms-writing-panel-bg)",
                                color: "var(--cms-writing-panel-text)",
                            }}
                        >
                            {writingItem.chapters[nextIndex].writingChapterTitle} →
                        </Link>
                    ) : (
                        <span />
                    )}
                </div >
            </div >
        </section >
    );
}
