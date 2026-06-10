
import Tab from "@/app/components/comics/Tab";
import { writing } from "../../lib/writing";
import { WritingApiDto } from "@/app/lib/types/writing";
import Image from "next/image";
import Link from "next/link";
import WritingChapterTab from "@/app/components/writing/WritingChapterTab";
import WritingDetailsTab from "@/app/components/writing/WritingDetailsTab";
import WritingCommentsTab from "@/app/components/writing/WritingCommentsTab";

interface WritingPageParams {
    params: {
        id: string;
    };
}

export default async function WritingPage({ params }: WritingPageParams) {
    const { id } = await params;
    const writingItem: WritingApiDto | undefined = writing.find((c) => c.writingId === parseInt(id));

    if (!writingItem) {
        return <p>Writing not found</p>;
    }

    const { title, description, tags, coverUrl, links, uploadedAt, chapters, comments } = writingItem;

    return (
        <section className="bg-white flex-1">
            <div className="p-8 w-full max-w-5xl mx-auto">
                <Link href="/writing" className="text-sm text-gray-500 hover:text-gray-800 mb-6 inline-block">← Back to Writing</Link>
                <div className="flex h-full flex-row w-full ">
                    <div className="shrink-0">
                        <Image
                            src={coverUrl}
                            alt={title}
                            width={150}
                            height={300}
                            className="h-full w-auto object-cover"
                        />
                    </div>
                    <div className="w-full mx-auto ml-8 overflow-hidden text-left flex flex-col ">
                        <h1 className="text-2xl font-bold mb-2">{title}</h1>
                        <p className="mb-2 line-clamp-8  text-ellipsis overflow-hidden">{description}</p>
                         {tags && (
                            <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                                {tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-gray-200 text-gray-800 text-sm font-semibold px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-6">
                    <Tab className="w-full" tabs={[
                        { title: "Chapters", content: <WritingChapterTab writing={writingItem} /> },
                        { title: "Details", content: <WritingDetailsTab writing={writingItem} /> },
                        { title: "Comments", content: <WritingCommentsTab writing={writingItem} /> }
                    ]} />
                </div>
            </div>
        </section>
    );
}
