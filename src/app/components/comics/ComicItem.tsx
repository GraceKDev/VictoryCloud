"use client"
import { useRouter } from "next/navigation";
import { ComicApiDto } from "@/app/lib/types/comic";

export default function ComicItem({ comic }: { comic: ComicApiDto }) {
    const router = useRouter();
    const { comicId, title, description, tags, coverImageUrl } = comic;
    return (
        <div onClick={() => router.push(`/comics/${comicId}`)}
            className="bg-white shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col">
            {coverImageUrl ? (
                <img
                    src={coverImageUrl}
                    alt={title}
                    className="w-full aspect-2/3 object-cover mb-2"
                />
            ) : (
                <div className="w-full aspect-2/3 mb-2 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                    No image available
                </div>
            )}
            <div className="p-3 flex-1 flex flex-col">
                <h2 className="text-lg font-bold mb-1 text-center">{title}</h2>
                <div className="flex flex-wrap justify-center gap-1 mb-2">
                    {tags.map((tag, i) => (
                        <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-xs text-gray-600 text-center line-clamp-2">{description}</p>
            </div>
        </div>

    );
}
