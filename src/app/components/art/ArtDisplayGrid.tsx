import ArtGalleryClient from "./ArtGalleryClient";
import { ArtApiDto } from "@/app/lib/types/art";
export default async function ArtDisplayGrid() {
    let arts: ArtApiDto[] = [];

    try {
        const res = await fetch(
            "${process.env.BACKEND_URL_DEV}/Api/Art/GetAll",
            {
                next: {
                    revalidate: 60,
                },
            }
        );
        if (!res.ok) {
            console.error(
                "Failed to load arts. Status:",
                res.status
            );
            arts = [];
        } else {
            arts = await res.json();
        }
    } catch (error) {
        console.error("Error fetching arts:", error);
        arts = [];
    }
    if (arts.length === 0) {
        return (
            <p
                style={{ color: "var(--cms-comics-text)" }}
                className="text-gray-600"
            >
                No art found.
            </p>
        );
    }
    return <ArtGalleryClient art={arts} />;
}