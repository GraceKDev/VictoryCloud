import Image from "next/image";

interface AboutCardProps {
    title?: string;
    description?: string;
    imageUrl?: string;
    imageLink?: string;
}

export default function AboutCard({ title = "Card Title", description = "", imageUrl = "/images/HomeCarousel/placeholder1.jpg", imageLink = "" }: AboutCardProps) {
    return (
        <div style={{ backgroundColor: "var(--cms-about-card-bg, #121619)" }} className="w-full border-pineTeal border-2 aspect-auto sm:aspect-square p-3 sm:p-4 rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
            <div className="relative w-full h-28 sm:h-1/2 shrink-0 border-2 border-pineTeal rounded-md overflow-hidden mb-3 sm:mb-4 flex items-center justify-center bg-ashGrey/20">
            {imageUrl && imageUrl !== "" ? (
                <Image src={imageUrl} alt={title} fill className="object-cover" unoptimized />
            ) : (
                <p className="text-white text-sm sm:text-base font-medium">No image</p>
            )}
            </div>
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                <h3 className="text-lg sm:text-xl text-offWhite font-semibold leading-tight shrink-0">{title}</h3>
                <hr className="my-2 border-ashGrey/50"/>
                <p className="text-offWhite text-xs sm:text-base leading-snug line-clamp-2 sm:line-clamp-4">
                    {description || "No description provided."}
                </p>
                {imageLink && (
                    <a href={imageLink} className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-ashGrey text-onyx cursor-pointer rounded hover:bg-ashGrey hover:contrast-175 inline-block text-center text-sm sm:text-base">
                        Go to {title}
                    </a>
                )}
            </div>
        </div>
    )
}
