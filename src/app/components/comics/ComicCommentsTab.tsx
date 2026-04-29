"use client"
import { ComicInterface } from "../../lib/types/comic";
export default function ComicCommentsTab({ comic }: { comic: ComicInterface }) {
    return (
        <section> 
         <h2 className="text-2xl font-bold mb-4">Comments</h2>
         <form className="mb-4">
            <input className="w-full p-2 border rounded mb-2" placeholder="Name" />
            <select className="w-full p-2 border rounded mb-2">
                <option value="">Select Chapter</option>
                {comic.chapters.map((chapter, index) => (
                    <option key={index} value={chapter.chapterTitle}>
                        {chapter.chapterTitle}
                    </option>
                ))}
            </select>
            <textarea
                className="w-full p-2 border rounded mb-2"
                placeholder="Add a comment..."
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Submit
            </button>
        </form>
            {comic.comments?.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
            ) : (
                comic.comments?.map((comment, index) => (
                    <div key={index} className="mb-4 p-4 border rounded">
                        <h3 className="text-xl font-semibold mb-2">{comment.author}</h3>
                        <p>{comment.comment}</p>
                    </div>
                ))
            )}

       </section>
    );
};