import { comics } from "@/app/lib/comics";
import { ComicApiDto } from "@/app/lib/types/comic";
import ComicReader from "@/app/components/comics/ComicReader";
import { notFound } from "next/dist/client/components/navigation";

interface ChapterPageParams {
    params: {
        id: string;
        chapter: string;
    };
}

export default async function ChapterPage({ params }: ChapterPageParams) {
    const { id, chapter } = await params;
    let comic: ComicApiDto | null = null
    try {
        const res = await fetch(`http://localhost:5266/Api/Comic/Get/${id}`, {
            cache: "no-store",
        }).catch((error) => {
            console.error("Error fetching comic:", error);
            throw new Error("Failed to load comic.");
        });
        if(res.ok) {
            comic = await res.json();
        }
    }
    catch (error) {
        console.error("Error fetching comic:", error);
    }
    if (!comic) {
       notFound();     
    }

    const chapterIndex = parseInt(chapter);
    const chapterData = comic.chapters[chapterIndex];

    if (!chapterData) {
        return <p className="p-8">Chapter not found.</p>;
    }

    return (
        <ComicReader
            comic={comic}
            chapter={chapterData}
            chapterIndex={chapterIndex}
        />
    );
}
