import Image from "next/image";

interface AboutCardProps {
    title?: string;
    description?: string;
    imageUrl?: string;
}

export default function AboutCard({ title = "Card Title", description = "", imageUrl = "/images/HomeCarousel/placeholder1.jpg" }: AboutCardProps) {
    return (
        <div style={{ backgroundColor: 'var(--cms-about-card-bg, #ffffff)' }} className="w-full aspect-square p-4 rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
            <div className="relative w-full h-1/2 shrink-0">
                <Image src={imageUrl} alt={title} fill className="object-cover" unoptimized />
            </div>
            <div className="flex-1 min-h-0 p-5 flex flex-col overflow-hidden">
                <h3 className="mb-2 shrink-0">{title}</h3>
                <p className="text-gray-600 text-sm line-clamp-4">
                    {description || "No description provided."}
                </p>
            </div>
        </div>
    )
}