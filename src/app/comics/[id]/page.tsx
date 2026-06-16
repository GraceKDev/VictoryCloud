import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComicApiDto } from "@/app/lib/types/comic";
import Tab from "@/app/components/comics/Tab";
import ComicChapterTab from "@/app/components/comics/ComicChapterTab";
import ComicDetailsTab from "@/app/components/comics/ComicDetailsTab";

function getSafeImageSrc(src: string | null | undefined): string {
    if (!src) return "/placeholder.png";
    if (src.startsWith("/")) return src;

    try {
        const parsed = new URL(src);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") return src;
    } catch {
        return "/placeholder.png";
    }

    return "/placeholder.png";
}

interface ComicPageParams {
    params: { id: string };
}

export default async function ComicPage({ params }: ComicPageParams) {
    const { id } = await params;
    let comic: ComicApiDto | null = null;

    try {
        const res = await fetch(`http://localhost:5266/Api/Comic/Get/${id}`, { cache: "no-store" });
        if (res.ok) comic = await res.json();
    } catch (error) {
        console.error("Error fetching comic by id:", error);
    }

    if (!comic) notFound();

    const safeCoverImageUrl = getSafeImageSrc(comic.coverImageUrl);

    return (
        <main style={{ backgroundColor: "var(--cms-comics-bg)" }} className="flex-1 text-offWhite">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <Link href="/comics" className="mb-6 inline-flex items-center gap-2 text-sm text-offWhite/70 hover:text-offWhite">
                    ← Back to Comics
                </Link>

                <section className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
                    <div
                        className="overflow-hidden rounded-2xl border shadow-2xl"
                        style={{
                            backgroundColor: "var(--cms-comics-card-bg)",
                            borderColor: "var(--cms-comics-card-border)",
                        }}
                    >
                        <div className="relative aspect-[2/3] w-full">
                            <Image src={safeCoverImageUrl} alt={comic.title} fill className="object-cover" />
                        </div>
                    </div>

                    <div
                        className="rounded-2xl border p-5 sm:p-6 lg:p-8 shadow-2xl"
                        style={{
                            backgroundColor: "var(--cms-comics-panel-bg)",
                            borderColor: "var(--cms-comics-panel-accent)",
                        }}
                    >
                        <p className="text-sm uppercase tracking-[0.25em] text-offWhite/60">Comic Series</p>
                        <h1 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight" style={{ color: "var(--cms-comics-panel-text)" }}>
                            {comic.title}
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed" style={{ color: "var(--cms-comics-panel-text)" }}>
                            {comic.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {comic.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full px-3 py-1 text-xs sm:text-sm"
                                    style={{
                                        backgroundColor: "var(--cms-comics-tag-bg)",
                                        color: "var(--cms-comics-tag-text)",
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
                                content: <ComicChapterTab comic={comic} />,
                            },
                            {
                                title: "Details",
                                content: <ComicDetailsTab comic={comic} />,
                            },
                        ]}
                    />
                </section>
            </div>
        </main>
    );
}
