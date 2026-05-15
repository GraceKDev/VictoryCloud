import { ComicCommentInterface } from "./comic";

export interface WritingInterface {
    id: number;
    title: string;
    description: string;
    tags: string[];
    coverUrl: string;
    links: string[];
    uploadedAt: string;
    chapters: WritingChapterInterface[] ;
    comments: ComicCommentInterface[] | null;
}

export interface WritingChapterInterface {
    chapterTitle:string;
    content: WritingContentInterface[];
}
export interface WritingContentInterface {
    contentPosition: number;
    contentType: "Text" | "Image";
    content: WritingContentWritingBlockInterface | WritingContentImageBlockInterface;
}

export interface WritingContentWritingBlockInterface {
    content: string;
}
export interface WritingContentImageBlockInterface {
    imageUrl: string;
    altText: string;
}