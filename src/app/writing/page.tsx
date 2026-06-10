import Filters from "../components/global/Filters";
import WritingDisplayGrid from "../components/writing/WritingDisplayGrid";
import { writing } from "../lib/writing";

export default async function Writing() {

    const res = await fetch("http://localhost:5266/Api/Writing/GetAll", {
        cache: "no-store",
    }).catch((error) => {
        console.error("Error fetching writings:", error);
        throw new Error("Failed to load writings.");
    });

    if(!res.ok) {
        console.error("Failed to load writings. Status:", res.status);
    }
    const writings = await res.json();
    return (
        <main style={{ backgroundColor: 'var(--cms-writing-bg)' }} className="flex-1">
            <div className="w-full max-w-5xl mx-auto p-8">
                <h1 style={{ color: 'var(--cms-writing-heading)' }} className="text-3xl font-bold mb-4">Writing</h1>
                <p style={{ color: 'var(--cms-writing-body)' }} className="mb-8">Explore my collection of written works, including short stories, essays, and poetry. Each piece reflects my passion for storytelling and my desire to connect with readers on a deeper level.</p>
                {writings && writings.length === 0 ? (
                    <p style={{ color: 'var(--cms-writing-text)' }} className="text-gray-600">No writing found.</p>
                ) : (
                    <WritingDisplayGrid writings={writings} />
                )}
                
            </div>
        </main>
    )
}