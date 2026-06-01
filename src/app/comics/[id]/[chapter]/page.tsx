import { comics } from "@/app/lib/comics";
import { ComicInterface } from "@/app/lib/types/comic";
import ComicReader from "@/app/components/comics/ComicReader";

interface ChapterPageParams {
    params: {
        id: string;
        chapter: string;
    };
}

export default async function ChapterPage({ params }: ChapterPageParams) {
    const { id, chapter } = await params;
    const comic: ComicInterface | undefined = comics.find((c) => c.id === parseInt(id));

    if (!comic) {
        return <p className="p-8">Comic not found.</p>;
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
