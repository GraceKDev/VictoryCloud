"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, FormEvent } from "react";
import { ComicApiDto, ComicCommentInterface } from "@/app/lib/types/comic";

interface ComicReaderProps {
    comic: ComicApiDto;
    chapter: ComicApiDto["chapters"][0];
    chapterIndex: number;
}

// ─── End-page chapter comments ────────────────────────────────────────────────

function ChapterEndComments({
    comic,
    chapterTitle,
}: {
    comic: ComicApiDto;
    chapterTitle: string;
}) {
    const initialComments = (comic.comments ?? []).filter(
        (c) => (c as ComicCommentInterface & { chapter?: string }).chapter === chapterTitle
    );
    const [comments, setComments] = useState(initialComments);
    const [name, setName] = useState("");
    const [newComment, setNewComment] = useState("");
    const [upvotedComments, setUpvotedComments] = useState<Record<number, boolean>>({});
    const [replyingTo, setReplyingTo] = useState<{ id: number; author: string } | null>(null);
    const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

    const getHearts = (id: number) => {
        const comment = comments.find((item) => item.id === id);
        return Math.max(0, Number(comment?.content ?? 0) || 0);
    };

    const handleUpvote = (id: number) => {
        if (upvotedComments[id]) return;
        setComments((current) =>
            current.map((comment) => {
                if (comment.id !== id) return comment;
                const currentHearts = Math.max(0, Number(comment?.content ?? 0) || 0);
                return { ...comment, content: String(currentHearts + 1) };
            })
        );
        setUpvotedComments((current) => ({ ...current, [id]: true }));
    };

    const handleReplyClick = (commentId: number, author: string) => {
        setReplyingTo({ id: commentId, author });
        setNewComment((current) => {
            const mention = `@${author} `;
            return current.startsWith(mention) ? current : mention;
        });
        commentInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        commentInputRef.current?.focus();
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name.trim() || !newComment.trim()) return;

        if (replyingTo) {
            const reply: ComicCommentInterface = {
                id: Date.now(),
                author: name.trim(),
                comment: newComment.trim(),
                content: "0",
                date: new Date().toISOString().slice(0, 10),
                likes: 0,
                thread: null,
            };
            setComments((current) =>
                current.map((c) =>
                    c.id !== replyingTo.id ? c : { ...c, thread: [...(c.thread ?? []), reply] }
                )
            );
            setNewComment("");
            setReplyingTo(null);
            return;
        }

        const created: ComicCommentInterface = {
            id: Date.now(),
            author: name.trim(),
            comment: newComment.trim(),
            content: "0",
            date: new Date().toISOString().slice(0, 10),
            likes: 0,
            thread: null,
        };
        setComments((current) => [created, ...current]);
        setNewComment("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mb-6 rounded-lg border bg-gray-50 p-4">
                <input
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="w-full p-2 border rounded mb-2 bg-gray-100 text-gray-500 text-sm">
                    Chapter: {chapterTitle}
                </div>
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
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Submit
                </button>
            </form>

            {comments.length === 0 ? (
                <p className="text-gray-500">No comments for this chapter yet. Be the first!</p>
            ) : (
                comments.map((comment) => (
                    <div key={comment.id} className="mb-4 p-4 border rounded">
                        <h3 className="mb-1 text-lg font-semibold">{comment.author}</h3>
                        <p className="text-sm text-gray-400 mb-2">{comment.date}</p>
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
                        <div className="mt-3 flex items-center justify-between">
                            <button
                                type="button"
                                className="rounded bg-gray-900 px-3 py-1 text-sm text-white"
                                onClick={() => handleReplyClick(comment.id, comment.author)}
                            >
                                Reply
                            </button>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <span className="inline-flex items-center gap-1">
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <path d="M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                                    </svg>
                                    {comment.thread?.length ?? 0}
                                </span>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1 px-2"
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
        </div>
    );
}

// ─── End Page ─────────────────────────────────────────────────────────────────

interface EndPageProps {
    comic: ComicApiDto;
    chapter: ComicApiDto["chapters"][0];
    chapterIndex: number;
    onPrevPage: () => void;
}

function EndPage({ comic, chapter, chapterIndex, onPrevPage }: EndPageProps) {
    const router = useRouter();
    const hasNextChapter = chapterIndex + 1 < comic.chapters.length;

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
                <button
                    onClick={onPrevPage}
                    className="flex items-center gap-2 text-sm hover:text-gray-300 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous Page
                </button>
                <span className="text-sm font-medium text-gray-300">End of Chapter</span>
                <div className="w-28" />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto px-6 py-10">
                    <h2 className="text-3xl font-bold text-white mb-2">{chapter.chapterTitle}</h2>
                    <p className="text-gray-400 mb-10">You&apos;ve reached the end of this chapter.</p>

                    {/* Navigation buttons */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        <button
                            onClick={() => router.push(`/comics/${comic.comicId}`)}
                            className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Comic
                        </button>
                        {hasNextChapter && (
                            <button
                                onClick={() => router.push(`/comics/${comic.comicId}/${chapterIndex + 1}`)}
                                className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 transition-colors text-sm font-medium"
                            >
                                Next Chapter
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Chapter comments */}
                    <div className="bg-white rounded-xl p-6">
                        <h3 className="text-2xl font-bold mb-6">Chapter Comments</h3>
                        <ChapterEndComments comic={comic} chapterTitle={chapter.chapterTitle} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Comic Reader ──────────────────────────────────────────────────────────────

export default function ComicReader({ comic, chapter, chapterIndex }: ComicReaderProps) {
    const router = useRouter();
    const images = chapter.images;
    const totalSpreads = Math.ceil(images.length / 2);

    const [currentSpread, setCurrentSpread] = useState(0);
    const [isEndPage, setIsEndPage] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const touchStartX = useRef<number | null>(null);
    const readerRef = useRef<HTMLDivElement | null>(null);

    // Sync fullscreen state with browser API
    useEffect(() => {
        const handler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handler);
        return () => document.removeEventListener("fullscreenchange", handler);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            readerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const goNext = () => {
        if (currentSpread < totalSpreads - 1) {
            setCurrentSpread((s) => s + 1);
        } else {
            setIsEndPage(true);
        }
    };

    const goPrev = () => {
        if (isEndPage) {
            setIsEndPage(false);
        } else if (currentSpread > 0) {
            setCurrentSpread((s) => s - 1);
        }
    };

    // Touch swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 50) {
            if (delta > 0) goNext();
            else goPrev();
        }
        touchStartX.current = null;
    };

    const leftImage = images[currentSpread * 2];
    const rightImage = images[currentSpread * 2 + 1];
    const isSinglePage = rightImage === undefined;

    if (isEndPage) {
        return (
            <EndPage
                comic={comic}
                chapter={chapter}
                chapterIndex={chapterIndex}
                onPrevPage={() => setIsEndPage(false)}
            />
        );
    }

    return (
        <div
            ref={readerRef}
            className="h-screen overflow-hidden bg-gray-900 flex flex-col select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white shrink-0">
                <button
                    onClick={() => router.push(`/comics/${comic.comicId}`)}
                    className="flex items-center gap-2 text-sm hover:text-gray-300 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <span className="text-sm font-medium text-center truncate mx-4 max-w-xs">
                    {chapter.chapterTitle}
                </span>

                <button
                    onClick={toggleFullscreen}
                    className="p-1.5 rounded hover:bg-gray-700 transition-colors"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                    {isFullscreen ? (
                        /* Minimize icon */
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M15 9h4.5M15 9V4.5M15 9l5.25-5.25M9 15H4.5M9 15v4.5M9 15l-5.25 5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                        </svg>
                    ) : (
                        /* Maximize icon */
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Page display */}
            <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden px-2 py-4">
                {isSinglePage ? (
                    /* Single centered image */
                    <img
                        src={leftImage}
                        alt={`Page ${currentSpread * 2 + 1}`}
                        className="max-h-full max-w-full object-contain"
                    />
                ) : (
                    /* Two-page spread */
                    <div className="flex gap-1 h-full w-full max-w-5xl items-center">
                        <div className="flex-1 flex items-center justify-end h-full">
                            <img
                                src={leftImage}
                                alt={`Page ${currentSpread * 2 + 1}`}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                        <div className="flex-1 flex items-center justify-start h-full">
                            <img
                                src={rightImage}
                                alt={`Page ${currentSpread * 2 + 2}`}
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom navigation */}
            <div className="shrink-0 flex items-center justify-between px-6 py-4 bg-gray-800 text-white gap-4">
                <button
                    onClick={goPrev}
                    disabled={currentSpread === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Prev
                </button>

                <span className="text-sm text-gray-400">
                    {currentSpread + 1} / {totalSpreads}
                </span>

                <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                    {currentSpread === totalSpreads - 1 ? "End" : "Next"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
