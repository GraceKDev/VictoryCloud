import DisplayGrid from "../components/comics/DisplayGrid";

import { ComicApiDto } from "../lib/types/comic";

export default async function Comics() {
    let comics: ComicApiDto[] = [];
    try {
        const res = await fetch("http://localhost:5266/Api/Comic/GetAll", {
            next: {
                revalidate: 60,
            },
        });
        if (!res.ok) {
            console.error("Failed to load comics. Status:", res.status);
            comics = [];
        } else {
            comics = await res.json();
        }
    } catch (error) {
        console.error("Error fetching comics:", error);
        comics = [];
    }
    if (comics.length === 0) {
        return (
            <main style={{ backgroundColor: 'var(--cms-comics-bg)' }} className="flex-1 bg-white">
                <div className="w-full max-w-5xl mx-auto p-8">
                    <h1 style={{ color: 'var(--cms-comics-heading)' }} className="text-3xl font-bold mb-4">Comics</h1>
                    <p style={{ color: 'var(--cms-comics-body)' }} className="text-offWhite">No comics found.</p>
                </div>
            </main>
        )
    }
    return (
        <main style={{ backgroundColor: 'var(--cms-comics-bg)' }} className="flex-1 bg-white">
            <div className="w-full max-w-5xl mx-auto p-8">
                <h1 style={{ color: 'var(--cms-comics-heading)' }} className="text-3xl font-bold mb-4">Comics</h1>
                <DisplayGrid comics={comics} />
            </div>
        </main>
    )
}