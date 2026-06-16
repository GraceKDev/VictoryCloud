import NewsCard from "./NewsCard";

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
        const res = await fetch("http://localhost:3000/api/latest-news", {
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data?.items ?? [];
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
