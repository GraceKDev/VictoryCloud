import WritingDisplayGrid from "../components/writing/WritingDisplayGrid";

export default function Writing() {
    return (
        <main className="flex-1 bg-white">
            <div className="w-full p-8">
                <h1 className="text-3xl font-bold mb-4">Writing</h1>
                <p className="text-gray-700 mb-8 ">Explore my collection of written works, including short stories, essays, and poetry. Each piece reflects my passion for storytelling and my desire to connect with readers on a deeper level.</p>
                <WritingDisplayGrid />
            </div>
        </main>
    )
}