import Image from "next/image";
import { getSafeImageSrc } from "@/app/lib/utils/image";

export type NewsCardProps = {
    title: string;
    description: string;
    imageUrl: string;
    dateLabel: string;
    accentLabel: string;
};

export default function NewsCard({ title, description, imageUrl, dateLabel, accentLabel }: NewsCardProps) {
    const safeImageUrl = getSafeImageSrc(imageUrl);

    return (
        <article
            style={{ backgroundColor: "var(--cms-news-card-bg, #2d4739)" }}
            className="w-full border-ashGrey border-2 aspect-auto sm:aspect-square p-3 sm:p-4 rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
        >
            <div className="relative w-full h-28 sm:h-1/2 shrink-0 border-ashGrey border-2 rounded-md overflow-hidden mb-3 sm:mb-4">
                <Image src={safeImageUrl} alt={title} fill className="object-cover" />
            </div>
            <div className="flex-1 min-h-0 p-1 sm:p-2 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[11px] sm:text-xs text-offWhite/80 shrink-0">{dateLabel}</span>
                    <span className="px-2 py-1 rounded-full text-[10px] sm:text-xs bg-ashGrey/15 text-offWhite border border-ashGrey/20 shrink-0">
                        {accentLabel}
                    </span>
                </div>
                <h3 className="mb-2 shrink-0 text-offWhite text-base sm:text-xl leading-tight">
                    {title}
                </h3>
                <p className="text-offWhite text-xs sm:text-base leading-snug line-clamp-2 sm:line-clamp-4">
                    {description}
                </p>
            </div>
        </article>
    );
}
