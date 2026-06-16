export default function CommissionsForm() {
    return (
        <section
            className="rounded-2xl border border-ashGrey/30 shadow-2xl"
            style={{ backgroundColor: "var(--cms-commissions-bg)" }}
        >
            <div className="p-4 sm:p-6 lg:p-8">
                <div>
                    <form className="w-full rounded-2xl  p-4 sm:p-6 ">
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-offWhite">Commission Request Form</h2>
                        <p className="mb-6 text-sm sm:text-base text-offWhite/80 leading-relaxed">
                            Tell me what you need and I&apos;ll get back to you with the next steps.
                        </p>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-offWhite">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full rounded-md border border-ashGrey/30 bg-pineTeal/80 px-3 py-2 text-offWhite placeholder:text-offWhite/50 focus:outline-none focus:ring-2 focus:ring-ashGrey/70"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-sm font-semibold mb-2 text-offWhite">
                                Type of commission
                            </label>
                            <select
                                id="type"
                                name="type"
                                className="w-full rounded-md border border-ashGrey/30 bg-pineTeal/80 px-3 py-2 text-offWhite focus:outline-none focus:ring-2 focus:ring-ashGrey/70"
                            >
                                <option value="" className="text-offWhite">
                                    Select a type
                                </option>
                                <option value="writing">Writing</option>
                                <option value="art">Art</option>
                                <option value="comic">Comic</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="details" className="block text-sm font-semibold mb-2 text-offWhite">
                                Project details
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                rows={5}
                                className="w-full rounded-md border border-ashGrey/30 bg-pineTeal/80 px-3 py-2 text-offWhite placeholder:text-offWhite/50 focus:outline-none focus:ring-2 focus:ring-ashGrey/70"
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                style={{ backgroundColor: "var(--cms-commissions-button)" }}
                                className="w-full rounded-md px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
