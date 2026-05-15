import { writing } from "@/app/lib/writing";
import { WritingContentImageBlockInterface, WritingContentWritingBlockInterface } from "@/app/lib/types/writing";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ChapterPageParams {
    params: {
        id: string;
        chapter: string;
    };
}

export default async function ChapterPage({ params }: ChapterPageParams) {
    const { id, chapter } = await params;
    const writingItem = writing.find((w) => w.id === parseInt(id));

    if (!writingItem) notFound();

    const chapterIndex = parseInt(chapter);
    const chapterData = writingItem.chapters[chapterIndex];

    if (!chapterData) notFound();

    const sortedContent = [...chapterData.content].sort(
        (a, b) => a.contentPosition - b.contentPosition
    );

    const prevIndex = chapterIndex - 1;
    const nextIndex = chapterIndex + 1;
    const hasPrev = prevIndex >= 0;
    const hasNext = nextIndex < writingItem.chapters.length;

    return (
        <section className="bg-white flex-1">
            <div className="max-w-3xl mx-auto px-6 py-10">
                {/* Back link */}
                <Link
                    href={`/writing/${id}`}
                    className="text-sm text-gray-500 hover:text-gray-800 mb-6 inline-block"
                >
                    ← Back to {writingItem.title}
                </Link>

                <h1 className="text-3xl font-bold mb-8">{chapterData.chapterTitle}</h1>

                <div className="flex flex-col gap-6">
                    {sortedContent.map((block, i) => {
                        if (block.contentType === "Text") {
                            const textBlock = block.content as WritingContentWritingBlockInterface;
                            return (
                                <p key={i} className="leading-relaxed text-gray-800">
                                    {textBlock.content}
                                </p>
                            );
                        }

                        if (block.contentType === "Image") {
                            const imageBlock = block.content as WritingContentImageBlockInterface;
                            return (
                                <div key={i} className="flex justify-center">
                                    <Image
                                        src={imageBlock.imageUrl}
                                        alt={imageBlock.altText}
                                        width={300}
                                        height={200}
                                        className="object-contain rounded"
                                    />
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>

                {/* Chapter navigation */}
                <div className="flex justify-between mt-12 pt-6 border-t">
                    {hasPrev ? (
                        <Link
                            href={`/writing/${id}/${prevIndex}`}
                            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                        >
                            ← {writingItem.chapters[prevIndex].chapterTitle}
                        </Link>
                    ) : <span />}

                    {hasNext ? (
                        <Link
                            href={`/writing/${id}/${nextIndex}`}
                            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                        >
                            {writingItem.chapters[nextIndex].chapterTitle} →
                        </Link>
                    ) : <span />}
                </div>
            </div>
        </section>
    );
}
