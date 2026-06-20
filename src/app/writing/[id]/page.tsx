import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WritingApiDto } from "@/app/lib/types/writing";
import Tab from "@/app/components/comics/Tab";
import WritingChapterTab from "@/app/components/writing/WritingChapterTab";
import WritingDetailsTab from "@/app/components/writing/WritingDetailsTab";
import { getSafeImageSrc, hasUsableImageSrc } from "@/app/lib/utils/image";

interface WritingPageParams {
    params: { id: string };
}

export default async function WritingPage({ params }: WritingPageParams) {
    const { id } = await params;
    let writingItem: WritingApiDto | null = null;

    try {
        const res = await fetch(`http://localhost:5266/Api/Writing/Get/${id}`, { cache: "no-store" });
        if (res.ok) writingItem = await res.json();
    } catch (error) {
        console.error("Error fetching writing by id:", error);
    }

    if (!writingItem) notFound();
    const hasCoverImage = hasUsableImageSrc(writingItem.coverUrl);
    const safeCoverUrl = getSafeImageSrc(writingItem.coverUrl);

    return (
        <main style={{ backgroundColor: "var(--cms-writing-bg)" }} className="flex-1 text-offWhite">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <Link href="/writing" className="mb-6 inline-flex items-center gap-2 text-sm text-offWhite/70 hover:text-offWhite">
                    ← Back to Writing
                </Link>

                <section className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <div
                        className="overflow-hidden rounded-2xl border shadow-2xl"
                        style={{
                            backgroundColor: "var(--cms-writing-card-bg)",
                            borderColor: "var(--cms-writing-card-border)",
                        }}
                    >
                        {hasCoverImage ? (
                            <div className="relative aspect-2/3 w-full">
                                <Image src={safeCoverUrl} alt={writingItem.title} fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="flex aspect-2/3 w-full items-center justify-center px-4 text-center text-sm text-offWhite/70">
                                No image available
                            </div>
                        )}
                    </div>

                    <div
                        className="rounded-2xl border p-5 sm:p-6 lg:p-8 shadow-2xl"
                        style={{
                            backgroundColor: "var(--cms-writing-panel-bg)",
                            borderColor: "var(--cms-writing-panel-accent)",
                        }}
                    >
                        <p className="text-sm uppercase tracking-[0.25em] text-offWhite/60">Writing Series</p>
                        <h1 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight" style={{ color: "var(--cms-writing-panel-text)" }}>
                            {writingItem.title}
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed" style={{ color: "var(--cms-writing-panel-text)" }}>
                            {writingItem.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {writingItem.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full px-3 py-1 text-xs sm:text-sm"
                                    style={{
                                        backgroundColor: "var(--cms-writing-tag-bg)",
                                        color: "var(--cms-writing-tag-text)",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mt-10">
                    <Tab
                        className="overflow-hidden rounded-2xl border shadow-2xl"
                        tabs={[
                            {
                                title: "Chapters",
                                content: <WritingChapterTab writing={writingItem} />,
                            },
                            {
                                title: "Details",
                                content: <WritingDetailsTab writing={writingItem} />,
                            },
                        ]}
                    />
                </section>
            </div>
        </main>
    );
}
