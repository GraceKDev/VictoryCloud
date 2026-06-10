import DisplayGrid from "../components/comics/DisplayGrid";

import { ComicApiDto } from "../lib/types/comic";

export default async function Comics() {
    const res = await fetch("http://localhost:5266/Api/Comic/GetAll", {
        cache: "no-store",
    }).catch((error) => {
        console.error("Error fetching comics:", error);
        throw new Error("Failed to load comics.");
    });

    if (!res.ok) {
        console.error("Failed to load comics. Status:", res.status);
    }

   
    const comics: ComicApiDto[] = await res.json();
    return (
        <main style={{ backgroundColor: 'var(--cms-comics-bg)' }} className="flex-1 bg-white">
            <div className="w-full max-w-5xl mx-auto p-8">
                <h1 style={{ color: 'var(--cms-comics-heading)' }} className="text-3xl font-bold mb-4">Comics</h1>
                <DisplayGrid comics={comics} />
                {comics && comics.length === 0 && (
                    <p style={{ color: 'var(--cms-comics-text)' }} className="text-gray-600">No comics found.</p>
                )}
            </div>
        </main>
    )
}