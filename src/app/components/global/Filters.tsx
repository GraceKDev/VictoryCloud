export default function Filters() {
    return (
        <section className="flex space-x-8 w-full ">
            <div className="flex justify-between w-full">
                <div className="flex items-center space-x-2 mb-4">
                    <p>0 Results</p>
                </div>
                <div className="flex space-x-4">
                    <div className="flex space-x-4 mb-4">
                        <select className="p-2 border border-gray-300 rounded">
                            <option value="">All Categories</option>
                            <option value="comics">Comics</option>
                            <option value="illustrations">Illustrations</option>
                        </select>
                    </div>
                    <input type="text" placeholder="Search..." className=" p-2 border border-gray-300 rounded mb-4" />
                </div>
            </div>
        </section>
    )
}