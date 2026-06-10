
import Tab from "@/app/components/comics/Tab";
import Image from "next/image";
import Link from "next/link";
import { ComicApiDto } from "@/app/lib/types/comic";
import ComicChapterTab  from "@/app/components/comics/ComicChapterTab";
import ComicCommentsTab from "@/app/components/comics/ComicCommentsTab";
import ComicDetailsTab from "@/app/components/comics/ComicDetailsTab";
import { notFound } from "next/navigation";

function getSafeImageSrc(src: string | null | undefined): string {
    if (!src) return "/placeholder.png";
    if (src.startsWith("/")) return src;

    try {
        const parsed = new URL(src);
        if (parsed.protocol === "http:" || parsed.protocol === "https:") {
            return src;
        }
    } catch {
        // Invalid URL string; fall through to placeholder.
    }

    return "/placeholder.png";
}

interface ComicPageParams {
    params: {
        id: string;
    };
}

export default async function ComicPage({ params }: ComicPageParams) {
    const { id } = await params;
    let comic: ComicApiDto | null = null;
    try {
        const res = await fetch(`http://localhost:5266/Api/Comic/Get/${id}`, {
            cache: "no-store",
        });

        if (res.ok) {
            comic = await res.json();
        }
    } catch (error) {
        console.error("Error fetching comic by id:", error);
    }
    if (!comic) {
        notFound();
    }
    
    const { title, description, coverImageUrl } = comic;
    const safeCoverImageUrl = getSafeImageSrc(coverImageUrl);

    return (
        <section className="bg-white flex-1">
            <div className="p-8 w-full max-w-5xl mx-auto">
                <Link href="/comics" className="text-sm text-gray-500 hover:text-gray-800 mb-6 inline-block">← Back to Comics</Link>
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src={safeCoverImageUrl}
                        alt={title}
                        width={200}
                        height={200}
                        className="aspect-2/3 object-cover mb-2"
                    />
                    <div className="w-full max-w-xl p-8 text-left">
                        <h1 className="text-3xl text-center font-bold mb-4">{title}</h1>
                        {comic.tags && (
                            <div className="flex flex-wrap justify-center gap-1 mb-4">
                                {comic.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-gray-200 text-gray-800 text-sm font-semibold px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <p className="mb-4">{description}</p>
                    </div>
                    <div className="w-full max-w-xl justify-center flex">
                        <Tab className="w-full" tabs={[
                            { title: "Chapters", content: <ComicChapterTab comic={comic} /> },
                            { title: "Details", content: <ComicDetailsTab comic={comic} /> },
                            // { title: "Comments", content: <ComicCommentsTab comic={comic} /> }
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    );
}
