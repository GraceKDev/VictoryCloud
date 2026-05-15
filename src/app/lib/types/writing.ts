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

interface WritingChapterInterface {
    chapterTitle:string;
    content: WritingContentInterface[];
}
interface WritingContentInterface {
    contentPosition: number;
    contentType: "Text" | "Image";
    content: WritingContentWritingBlockInterface | WritingContentImageBlockInterface;
}

interface WritingContentWritingBlockInterface {
    content: string;
}
interface WritingContentImageBlockInterface {
    imageUrl: string;
    altText: string;
}