import NewsCard from "./NewsCard";
import { ArtApiDto } from "@/app/lib/types/art";
import { ComicApiDto } from "@/app/lib/types/comic";
import { WritingApiDto } from "@/app/lib/types/writing";
import { getSafeImageSrc } from "@/app/lib/utils/image";

type LatestNewsItem = {
    source: "art" | "comics" | "writing";
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    uploadedAt: string;
    newsLabel: string;
    newsSummary: string;
};

function formatDate(value: string) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

async function getLatestNews(): Promise<LatestNewsItem[]> {
    try {
        const [artResponse, comicsResponse, writingResponse] = await Promise.all([
            fetch(`${process.env.BACKEND_URL_DEV}/Api/Art/GetAll`, { cache: "no-store" }),
            fetch(`${process.env.BACKEND_URL_DEV}/Api/Comic/GetAll`, { cache: "no-store" }),
            fetch(`${process.env.BACKEND_URL_DEV}/Api/Writing/GetAll`, { cache: "no-store" }),
        ]);

        const artItems: LatestNewsItem[] = artResponse.ok
            ? ((await artResponse.json()) as ArtApiDto[]).map((item) => ({
                  source: "art",
                  id: item.artId,
                  title: item.title,
                  description: item.description,
                  imageUrl: getSafeImageSrc(item.imageUrl),
                  uploadedAt: item.uploadedAt,
                  newsLabel: "Art",
                  newsSummary: item.description,
              }))
            : [];

        const comicItems: LatestNewsItem[] = comicsResponse.ok
            ? ((await comicsResponse.json()) as ComicApiDto[]).map((item) => ({
                  source: "comics",
                  id: item.comicId,
                  title: item.title,
                  description: item.description,
                  imageUrl: getSafeImageSrc(item.coverImageUrl),
                  uploadedAt: item.updatedAt ?? item.uploadedAt ?? `${item.details.year}-01-01`,
                  newsLabel: item.updatedAt ? "Updated Comic" : "New Comic",
                  newsSummary: item.updatedAt ? "A new update is available." : "A new comic is available.",
              }))
            : [];

        const writingItems: LatestNewsItem[] = writingResponse.ok
            ? ((await writingResponse.json()) as WritingApiDto[]).map((item) => ({
                  source: "writing",
                  id: item.writingId,
                  title: item.title,
                  description: item.description,
                  imageUrl: getSafeImageSrc(item.coverUrl),
                  uploadedAt: item.updatedAt ?? item.uploadedAt,
                  newsLabel: item.updatedAt ? "Updated Writing" : "New Writing",
                  newsSummary: item.updatedAt ? "A new update is available." : "A new writing piece is available.",
              }))
            : [];

        return [...artItems, ...comicItems, ...writingItems]
            .sort((left, right) => {
                const rightDate = new Date(right.uploadedAt).getTime();
                const leftDate = new Date(left.uploadedAt).getTime();
                return rightDate - leftDate;
            })
            .slice(0, 6);
    } catch {
        return [];
    }
}

export default async function News() {
    const items = await getLatestNews();

    return (
        <section style={{ backgroundColor: "var(--cms-news-bg, #121619)" }} className="w-full min-h-[95vh] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-8">
                <h2 style={{ color: "var(--cms-news-heading)" }} className="mb-4 text-2xl sm:text-3xl lg:text-4xl leading-tight">
                    Latest News
                </h2>
                <hr className="mb-6 border-pineTeal border-t" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {items.map((item) => (
                        <NewsCard
                            key={`${item.source}-${item.id}`}
                            imageUrl={item.imageUrl}
                            title={item.title}
                            description={item.newsSummary}
                            dateLabel={formatDate(item.uploadedAt)}
                            accentLabel={item.newsLabel}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
