import { afterEach, describe, expect, it, vi } from "vitest";
import { apiDtoToDraft, comicDraftToEmpty } from "@/app/components/admin/comicShared";
import type { ComicApiDto } from "@/app/lib/types/comic";

describe("comicShared helpers", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("creates an empty comic draft", () => {
        expect(comicDraftToEmpty()).toEqual({
            title: "",
            description: "",
            coverImageUrl: "",
            tags: "",
            details: {
                status: "Ongoing",
                year: String(new Date().getFullYear()),
                originalLanguage: "English",
                contentRating: "Everyone",
            },
            chapters: [],
        });
    });

    it("maps ComicApiDto to ComicEditDraft", () => {
        let idCounter = 1;
        vi.stubGlobal("crypto", {
            randomUUID: () => `uuid-${idCounter++}`,
        });

        const dto: ComicApiDto = {
            comicId: 101,
            title: "Awesome Comic",
            description: "A fun adventure",
            coverImageUrl: "https://example.com/cover.jpg",
            tags: ["action", "fantasy"],
            uploadedAt: "2026-06-10",
            updatedAt: "2026-06-11",
            details: {
                status: "Ongoing",
                year: 2025,
                originalLanguage: "Japanese",
                contentRating: "Teen",
            },
            chapters: [
                {
                    chapterTitle: "Chapter One",
                    images: ["https://example.com/img1.png", "https://example.com/img2.png"],
                },
            ],
            comments: null,
        };

        expect(apiDtoToDraft(dto)).toEqual({
            id: 101,
            title: "Awesome Comic",
            description: "A fun adventure",
            coverImageUrl: "https://example.com/cover.jpg",
            tags: "action, fantasy",
            details: {
                status: "Ongoing",
                year: "2025",
                originalLanguage: "Japanese",
                contentRating: "Teen",
            },
            chapters: [
                {
                    id: "uuid-1",
                    chapterTitle: "Chapter One",
                    images: [
                        {
                            id: "uuid-2",
                            file: null,
                            previewUrl: "https://example.com/img1.png",
                            s3Url: "https://example.com/img1.png",
                            uploading: false,
                            error: null,
                        },
                        {
                            id: "uuid-3",
                            file: null,
                            previewUrl: "https://example.com/img2.png",
                            s3Url: "https://example.com/img2.png",
                            uploading: false,
                            error: null,
                        },
                    ],
                },
            ],
        });
    });
});
