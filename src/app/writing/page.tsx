import Filters from "../components/global/Filters";
import WritingDisplayGrid from "../components/writing/WritingDisplayGrid";

export default function Writing() {
    return (
        <main style={{ backgroundColor: 'var(--cms-writing-bg)' }} className="flex-1">
            <div className="w-full max-w-5xl mx-auto p-8">
                <h1 style={{ color: 'var(--cms-writing-heading)' }} className="text-3xl font-bold mb-4">Writing</h1>
                <p style={{ color: 'var(--cms-writing-body)' }} className="mb-8">Explore my collection of written works, including short stories, essays, and poetry. Each piece reflects my passion for storytelling and my desire to connect with readers on a deeper level.</p>
                <Filters/>
                <WritingDisplayGrid />
            </div>
        </main>
    )
}