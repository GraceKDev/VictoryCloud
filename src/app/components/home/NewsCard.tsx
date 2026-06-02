import Image from "next/image";

export default function NewsCard() {
    return (
        <div style={{ backgroundColor: 'var(--cms-news-card-bg, #ffffff)' }} className="w-full aspect-square p-4 rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
            <div className="relative w-full h-1/2 shrink-0">
                <Image src="/images/HomeCarousel/placeholder1.jpg" alt="News Image" fill className="object-cover" />
            </div>
            <div className="flex-1 min-h-0 p-5 flex flex-col overflow-hidden">
                <span className="text-xs text-gray-400 mb-1 shrink-0">June 2, 2026</span>
                <h3 className="mb-2 shrink-0">News Title</h3>
                <p className="text-gray-600 text-sm line-clamp-4">
                    This is a placeholder description for the NewsCard component.
                    You can replace this text with actual news content.
                </p>
            </div>
        </div>
    )
}
