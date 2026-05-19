"use client";
import { usePathname } from "next/navigation";
import { useFilter } from "../../lib/filters/FilterContext";



export default function Filters() {
    const { state, dispatch } = useFilter();
    const pathname = usePathname();
    const category = () => {
        switch (pathname) {
            case "/art":
                return (
                    <div className="flex space-x-4 mb-4">
                        <select className="p-2 border border-gray-300 rounded"
                            onChange={(e) => dispatch({ type: "SET_ART_CATEGORY", payload: e.target.value })}>
                            <option value="">All Categories</option>
                            <option value="comics">Comics</option>
                            <option value="illustrations">Illustrations</option>
                        </select>
                    </div>
                )
            case "/writing":
                    return (
                    <div className="flex space-x-4 mb-4">
                        <select className="p-2 border border-gray-300 rounded"
                            onChange={(e) => dispatch({ type: "SET_WRITING_CATEGORY", payload: e.target.value })}>
                            <option value="">All Categories</option>
                            <option value="comics">Comics</option>
                            <option value="illustrations">Illustrations</option>
                        </select>
                    </div>
                )
            case "/comics":
                    return (
                    <div className="flex space-x-4 mb-4">
                        <select className="p-2 border border-gray-300 rounded"
                            onChange={(e) => dispatch({ type: "SET_COMIC_CATEGORY", payload: e.target.value })}>
                            <option value="">All Categories</option>
                            <option value="comics">Comics</option>
                            <option value="illustrations">Illustrations</option>
                        </select>
                    </div>
                )
            default:
                return "";
        }

    }
    return (
        <section className="flex space-x-8 w-full ">
            <div className="flex justify-between w-full">
                <div className="flex items-center space-x-2 mb-4">
                    <p>0 Results</p>
                </div>
                <div className="flex space-x-4">
                        {category()}
                    <input
                        type="text"
                        placeholder="Search..."
                        value={state.search}
                        onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
                        className="p-2 border border-gray-300 rounded mb-4"
                    />
                </div>
            </div>
        </section>
    );
}