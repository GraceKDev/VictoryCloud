"use client"
import { FormEvent, useRef, useState } from "react";
import { ComicApiDto } from "../../lib/types/comic";
export default function ComicCommentsTab({ comic }: { comic: ComicApiDto }) {
    const initialComments = comic.comments ?? [];
    const [comments, setComments] = useState(initialComments);
    const [name, setName] = useState("");
    const [chapter, setChapter] = useState("");
    const [newComment, setNewComment] = useState("");
    const [upvotedComments, setUpvotedComments] = useState<Record<number, boolean>>({});
    const [replyingTo, setReplyingTo] = useState<{ id: number; author: string } | null>(null);
    const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

    const getHearts = (id: number) => {
        const comment = comments.find((item) => item.id === id);
        return Math.max(0, Number(comment?.content ?? 0) || 0);
    };

    const handleUpvote = (id: number) => {
        if (upvotedComments[id]) {
            return;
        }

        setComments((current) =>
            current.map((comment) => {
                if (comment.id !== id) {
                    return comment;
                }

                const currentHearts = Math.max(0, Number(comment.content ?? 0) || 0);
                return { ...comment, content: String(currentHearts + 1) };
            })
        );

        setUpvotedComments((current) => ({ ...current, [id]: true }));
    };

    const handleSubmitComment = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim() || !newComment.trim()) {
            return;
        }

        if (replyingTo) {
            const replyComment = {
                id: Date.now(),
                author: name.trim() || "Guest",
                comment: newComment.trim(),
                content: "0",
                date: new Date().toISOString().slice(0, 10),
                thread: null,
            };

            setComments((current) =>
                current.map((comment) => {
                    if (comment.id !== replyingTo.id) {
                        return comment;
                    }

                    return {
                        ...comment,
                        thread: [...(comment.thread ?? []), replyComment],
                    };
                })
            );

            setNewComment("");
            setReplyingTo(null);
            return;
        }

        const createdComment = {
            id: Date.now(),
            author: name.trim(),
            comment: newComment.trim(),
            content: "0",
            date: new Date().toISOString().slice(0, 10),
            thread: null,
        };

        setComments((current) => [createdComment, ...current]);
        setNewComment("");
    };

    const handleReplyClick = (commentId: number, author: string) => {
        setReplyingTo({ id: commentId, author });
        setNewComment((current) => {
            const mention = `@${author} `;
            if (current.startsWith(mention)) {
                return current;
            }

            return mention;
        });

        commentInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        commentInputRef.current?.focus();
    };

    return (
        <section>
            <h2 className="mb-4 text-2xl font-bold">Comments</h2>
         <form onSubmit={handleSubmitComment} className="mb-6 rounded-lg border bg-gray-50 p-4">
            <input
                className="w-full p-2 border rounded mb-2"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <select
                className="w-full p-2 border rounded mb-2"
                value={chapter}
                onChange={(event) => setChapter(event.target.value)}
            >
                <option value="">Select Chapter</option>
                {comic.chapters.map((chapter, index) => (
                    <option key={index} value={chapter.chapterTitle}>
                        {chapter.chapterTitle}
                    </option>
                ))}
            </select>
            {replyingTo && (
                <div className="mb-2 flex items-center justify-between rounded border border-blue-200 bg-blue-50 px-3 py-2 text-sm">
                    <span>Replying to @{replyingTo.author}</span>
                    <button
                        type="button"
                        className="rounded border border-blue-300 px-2 py-0.5 text-xs"
                        onClick={() => setReplyingTo(null)}
                    >
                        Cancel
                    </button>
                </div>
            )}
            <textarea
                ref={commentInputRef}
                className="w-full p-2 border rounded mb-2"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Submit
            </button>
        </form>
            {comments.length === 0 ? (
                <p>No comments yet. Be the first to comment!</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="mb-4 p-4 border rounded">
                        <h3 className="mb-2 text-xl font-semibold">{comment.author}</h3>
                        <p>{comment.comment}</p>

                        {comment.thread && comment.thread.length > 0 && (
                            <div className="mt-3 space-y-2 border-l pl-3">
                                {comment.thread.map((reply) => (
                                    <div key={reply.id} className="rounded bg-gray-50 p-2">
                                        <p className="text-sm font-semibold">{reply.author}</p>
                                        <p className="text-sm">{reply.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-3 flex w-full items-center justify-between">
                                <button
                                    type="button"
                                    className="rounded bg-gray-900 px-3 py-1 text-sm text-white"
                                    onClick={() => handleReplyClick(comment.id, comment.author)}
                                >
                                    Reply
                                </button>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="inline-flex items-center gap-1">
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                                        </svg>
                                        {(comment.thread?.length ?? 0)}
                                    </span>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1  px-2  "
                                        onClick={() => handleUpvote(comment.id)}
                                        disabled={upvotedComments[comment.id]}
                                    >
                                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M12 21s-7.2-4.35-9.6-8.19C.44 9.74 1.3 5.5 5.21 4.3 7.65 3.55 10 5.04 12 7.12c2-2.08 4.35-3.57 6.79-2.82 3.91 1.2 4.77 5.44 2.81 8.51C19.2 16.65 12 21 12 21z" />
                                        </svg>
                                        {getHearts(comment.id)}
                                    </button>
                                </div>
                        </div>
                    </div>
                ))
            )}

       </section>
    );
};