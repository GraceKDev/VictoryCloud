
export interface ComicInterface {
    id: number;
    title: string;
    description: string;
    tags: string[];
    chapters: ComicDataChapterInterface[] ;
    comments: ComicCommentInterface[] | null;
    details:ComicDataDetailsInterface
    coverImageUrl: string;
}

export interface ComicDataChapterInterface {
   chapterTitle:string;
   images: string[];
}

export interface ComicDataDetailsInterface {
    status: string;
    year: number;
    originalLanguage: string;
    contentRating: string;
}

export interface ComicCommentInterface {
    id: number;
    content: string;
    comment: string;
    author: string;
    date: string;
    likes: number;
    thread: ComicCommentInterface[] | null; 
}