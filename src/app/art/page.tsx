import ArtDisplayGrid from "../components/art/ArtDisplayGrid";
import Filters from "../components/global/Filters";

export default function Art() {
  
    return (
        <main className="flex-1 bg-white">
            <div className="w-full max-w-5xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-4">Art</h1>
                <Filters/>
                <ArtDisplayGrid/>
            </div>
          
        </main>
    )
}