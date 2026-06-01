export default function CommissionsForm() {
    return (
        <section className=" bg-white">
            <div className=" p-4">
                <div>
                    <form className="w-full bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Commission Request Form</h2>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Your email</label>
                            <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-700 font-semibold mb-2">Type of commission</label>
                            <select id="type" name="type" className="w-full p-2 border border-gray-300 rounded">
                                <option value="">Select a type</option>
                                <option value="writing">Writing</option>
                                <option value="art">Art</option>
                                <option value="comic">Comic</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="details" className="block text-gray-700 font-semibold mb-2">Project details</label>
                            <textarea id="details" name="details" rows={5} className="w-full p-2 border border-gray-300 rounded"></textarea>
                        </div>
                        <div className="mb-4">
                            <button type="submit" style={{ backgroundColor: 'var(--cms-commissions-button)' }} className="w-full text-white p-2 rounded hover:opacity-90 transition-opacity">Submit Request</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}