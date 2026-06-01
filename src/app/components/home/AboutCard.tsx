import Image from "next/image";
export default function AboutCard() {
    return (
        <div className="w-full aspect-square p-4 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <div className="relative w-full h-1/2 shrink-0">
                <Image src="/images/HomeCarousel/placeholder1.jpg" alt="Placeholder Image" fill className="object-cover" />
            </div>
            <div className="flex-1 min-h-0 p-5 flex flex-col overflow-hidden">
                <h3 className="mb-2 shrink-0">Card Title</h3>
                <p className="text-gray-600 text-sm line-clamp-4">
                    This is a placeholder description for the AboutCard component.
                    You can replace this text with actual content relevant to your project.
                </p>
            </div>
        </div>
    )
}