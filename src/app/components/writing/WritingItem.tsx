"use client"
import { WritingInterface } from "@/app/lib/types/writing";
import router from "next/router";


export default function WritingItem(props:WritingInterface) {
    const { id,title, description, tags, coverUrl, links, uploadedAt, chapters, comments } = props;

    return (
        <div onClick={() => router.push(`/comics/${id}`)}
            className="bg-white shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300 cursor-pointer flex flex-col">
            <img
                src={coverUrl}
                alt={title}
                className="w-full aspect-2/3 object-cover mb-2"
            />
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
    )
}  