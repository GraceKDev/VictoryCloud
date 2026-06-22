import { WritingApiDto } from "../components/admin/writingShared";

import WritingDisplayGrid from "../components/writing/WritingDisplayGrid";


export default async function Writing() {
    let writings: WritingApiDto[] = [];
    try {
        const res = await fetch(`${process.env.BACKEND_URL_DEV}/Api/Writing/GetAll`, {
            next: {
                revalidate: 60,
            }
        });
        if (!res.ok) {
            console.error("Failed to load writings. Status:", res.status);
            writings = [];
        } else {
            writings = await res.json();
        }
    } catch (error) {
        console.error("Error fetching writings:", error);
        writings = [];
    }
    if(writings.length === 0) {
        return (
            <main style={{ backgroundColor: 'var(--cms-writing-bg)' }} className="flex-1">
                <div className="w-full max-w-5xl mx-auto p-8">
                    <h1 style={{ color: 'var(--cms-writing-heading)' }} className="text-3xl font-bold mb-4">Writing</h1>
                    <p style={{ color: 'var(--cms-writing-text)' }} className="text-gray-600">No writing found.</p>
                </div>
            </main>
        )
    }
    return (
        <main style={{ backgroundColor: 'var(--cms-writing-bg)' }} className="flex-1">
            <div className="w-full max-w-5xl mx-auto p-8">
                <h1 style={{ color: 'var(--cms-writing-heading)' }} className="text-3xl font-bold mb-4">Writing</h1>
                <p style={{ color: 'var(--cms-writing-body)' }} className="mb-8">Explore my collection of written works, including short stories, essays, and poetry. Each piece reflects my passion for storytelling and my desire to connect with readers on a deeper level.</p>
                <WritingDisplayGrid writings={writings} />

            </div>
        </main>
    )
}