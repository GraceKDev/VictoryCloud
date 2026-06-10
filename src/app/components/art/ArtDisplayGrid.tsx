import ArtGalleryClient from "./ArtGalleryClient";
import { ArtApiDto } from "@/app/lib/types/art";

export default async function ArtDisplayGrid() {
    const res = await fetch(
        "http://localhost:5266/Api/Art/GetAll",
        {
            cache: "no-store",
        }).catch((error) => {
            console.error("Error fetching arts:", error);
            throw new Error("Failed to load arts.");
        });

    if (!res.ok) {
        console.error("Failed to load comics. Status:", res.status);
    }

    const arts: ArtApiDto[] = await res.json();
    if(arts.length === 0) {
        return <p style={{ color: 'var(--cms-comics-text)' }} className="text-gray-600">No art found.</p>
    }
    return <ArtGalleryClient art={arts} />;
}