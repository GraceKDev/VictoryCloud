import { WritingInterface } from "@/app/lib/types/writing";

export default function WritingDetailsTab({ writing }: { writing: WritingInterface }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <div className="flex flex-col gap-2">
                <div>
                    <p>Uploaded: {writing.uploadedAt}</p>
                    <hr />
                </div>
                {writing.links && writing.links.length > 0 && (
                    <div>
                        <p className="font-semibold mb-1">Links:</p>
                        <ul className="flex flex-col gap-1">
                            {writing.links.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <hr className="mt-2" />
                    </div>
                )}
            </div>
        </section>
    );
}
