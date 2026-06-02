import NewsCard from "./NewsCard";

export default function News() {
    return (
        <section style={{ backgroundColor: 'var(--cms-news-bg)' }} className="w-full min-h-[80vh] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto py-20 px-8">
                <h2 style={{ color: 'var(--cms-news-heading)' }} className="mb-4">Latest News</h2>
                <hr className="mb-6 border-gray-600 border-t" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                    <NewsCard />
                    
                </div>
            </div>
        </section>
    )
}