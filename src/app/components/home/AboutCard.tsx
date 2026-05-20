import Image from "next/image";
export default function AboutCard() {
    return (
        <div className="w-full p-8">
            <Image src="/images/HomeCarousel/placeholder1.jpg" alt="Placeholder Image" width={500} height={300} className="w-full h-auto mb-4" />
            <h3 className="mb-2">Card Title</h3>
            <p className="text-gray-600">
                This is a placeholder description for the AboutCard component. You can replace this text with actual content relevant to your project.
            </p>
        </div>
    )
}