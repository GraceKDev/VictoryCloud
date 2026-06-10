
export interface ComicCommentInterface {
    id: number;
    content: string;
    comment: string;
    author: string;
    date: string;
    likes?: number;
    thread: ComicCommentInterface[] | null;
}

export type ComicApiDto = {
    comicId: number;
    title: string;
    description: string;
    coverImageUrl: string;
    tags: string[];
    details: {
        status: string;
        year: number;
        originalLanguage: string;
        contentRating: string;
    };
    chapters: {
        chapterTitle: string;
        images: string[];
    }[];
    comments: ComicCommentInterface[] | null;
};