export type ArtApiDto = {
    artId: number;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    links: string[];
    uploadedAt: string;
    updatedAt?: string;
};
