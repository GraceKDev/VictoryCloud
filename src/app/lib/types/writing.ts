import { ComicCommentInterface } from "./comic";

export type WritingApiDto = {
    writingId: number;
    title: string;
    description: string;
    coverUrl: string;
    tags: string[];
    links: string[];
    uploadedAt: string;
    chapters: {
        writingChapterId: number;
        writingId: number;
        writingChapterTitle: string;
        writingChapterContent: {
            writingChapterContentId: number;
            writingChapterId: number;
            writingContentPosition: number;
            writingContentType: "Text" | "Image";
            writingContentBlock: {
                writingChapterContentBlockId: number;
                writingChapterContentId: number;
                writingContentBlockContent: string | null;
                writingContentBlockImageUrl: string | null;
                writingContentBlockAltText: string | null;
            }[];
        }[];
    }[];
    comments: ComicCommentInterface[] | null;
};