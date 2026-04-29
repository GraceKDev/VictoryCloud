import { ComicInterface } from "@/app/lib/types/comic";

export default function ComicDetailsTab({ comic }: { comic: ComicInterface }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Comic Details</h2>
            <div className="flex flex-col gap-2">
                <div> 
                    <p className="">Status: {comic.details.status}</p>
                    <hr />
                </div>
                <div>
                    <p className="">Year: {comic.details.year}</p>
                    <hr />
                </div>
                <div>
                    <p className="">Original Language: {comic.details.originalLanguage}</p>
                    <hr />
                </div>
                <div>
                    <p className="">Content Rating: {comic.details.contentRating}</p>
                    <hr />
                </div>
            </div>
        </section>
    );
}