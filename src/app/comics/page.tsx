import DisplayGrid from "../components/comics/DisplayGrid";
import Filters from "../components/global/Filters";
import { FilterProvider } from "../lib/filters/FilterContext";

export default function Art() {
    return (
     
            <main className="flex-1 bg-white">
                <div className="w-full max-w-5xl mx-auto p-8">
                    <h1 className="text-3xl font-bold mb-4">Comics</h1>
                    <Filters/>
                    <DisplayGrid/>
                </div>
            </main>
  
    )
}