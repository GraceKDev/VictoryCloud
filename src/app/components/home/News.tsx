import NewsCard from "./NewsCard";

export default function News() {
    return (
        <section style={{ backgroundColor: 'var(--cms-news-bg)' }} className="w-full min-h-[95vh] flex flex-col justify-center">
            <div className="max-w-7xl mx-auto py-16 sm:py-20 px-4 sm:px-8">
                <h2 style={{ color: 'var(--cms-news-heading)' }} className="mb-4 text-2xl sm:text-3xl lg:text-4xl leading-tight">Latest News</h2>
                <hr className="mb-6 border-pineTeal border-t" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
