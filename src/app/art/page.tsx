import ArtDisplayGrid from "../components/art/ArtDisplayGrid";
import Filters from "../components/global/Filters";

export default function Art() {

    return (
        <main style={{ backgroundColor: 'var(--cms-art-bg)' }} className="flex-1">
            <div className="w-full max-w-5xl mx-auto p-8">
                <h1 style={{ color: 'var(--cms-art-heading)' }} className="text-3xl font-bold mb-4">Art</h1>
                <ArtDisplayGrid/>
            </div>
        </main>
    )
}