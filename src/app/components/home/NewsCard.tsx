import Image from "next/image";

export default function NewsCard() {
    return (
        <div style={{ backgroundColor: 'var(--cms-news-card-bg)' }} className="w-full border-ashGrey border-2 aspect-auto sm:aspect-square p-3 sm:p-4 rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
            <div className="relative w-full h-28 sm:h-1/2 shrink-0 border-ashGrey border-2 rounded-md overflow-hidden mb-3 sm:mb-4">
                <Image src="/images/HomeCarousel/placeholder1.jpg" alt="News Image" fill className="object-cover" />
            </div>
            <div className="flex-1 min-h-0 p-1 sm:p-2 flex flex-col overflow-hidden">
                <span className="text-[11px] sm:text-xs text-offWhite mb-1 shrink-0">June 2, 2026</span>
                <h3 className="mb-1 sm:mb-2 shrink-0 text-offWhite text-base sm:text-xl leading-tight">News Title</h3>
                <p className="text-offWhite text-xs sm:text-base leading-snug line-clamp-2 sm:line-clamp-4">
                    This is a placeholder description for the NewsCard component.
                    You can replace this text with actual news content.
                </p>
            </div>
        </div>
    )
}
