import { afterEach, describe, expect, it, vi } from "vitest";
import { apiDtoToWritingDraft, writingDraftToEmpty } from "@/app/components/admin/writingShared";
import type { WritingApiDto } from "@/app/lib/types/writing";

describe("writingShared helpers", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("creates an empty writing draft", () => {
        expect(writingDraftToEmpty()).toEqual({
            title: "",
            description: "",
            coverUrl: "",
            tags: "",
            links: [],
            chapters: [],
            coverUploading: false,
            coverUploadError: null,
        });
    });

    it("maps WritingApiDto content blocks into editor draft blocks", () => {
        let seq = 1;
        vi.stubGlobal("crypto", {
            randomUUID: () => `uuid-${seq++}`,
        });

        const dto: WritingApiDto = {
            writingId: 7,
            title: "Sample Writing",
            description: "Description",
            coverUrl: "https://example.com/cover.jpg",
            tags: ["tag1", "tag2"],
            links: ["https://example.com"],
            uploadedAt: "2026-06-10",
            comments: null,
            chapters: [
                {
                    writingChapterId: 11,
                    writingId: 7,
                    writingChapterTitle: "Chapter 1",
                    writingChapterContent: [
                        {
                            writingChapterContentId: 1,
                            writingChapterId: 11,
                            writingContentPosition: 1,
                            writingContentType: "Text",
                            writingContentBlock: [
                                {
                                    writingChapterContentBlockId: 1,
                                    writingChapterContentId: 1,
                                    writingContentBlockContent: "Hello world",
                                    writingContentBlockImageUrl: null,
                                    writingContentBlockAltText: null,
                                },
                            ],
                        },
                        {
                            writingChapterContentId: 2,
                            writingChapterId: 11,
                            writingContentPosition: 2,
                            writingContentType: "Image",
                            writingContentBlock: [
                                {
                                    writingChapterContentBlockId: 2,
                                    writingChapterContentId: 2,
                                    writingContentBlockContent: null,
                                    writingContentBlockImageUrl: "https://example.com/panel.png",
                                    writingContentBlockAltText: "Panel",
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        const draft = apiDtoToWritingDraft(dto);

        expect(draft.title).toBe("Sample Writing");
        expect(draft.tags).toBe("tag1, tag2");
        expect(draft.chapters).toHaveLength(1);
        expect(draft.chapters[0].chapterTitle).toBe("Chapter 1");
        expect(draft.chapters[0].writingContentBlock).toHaveLength(2);

        expect(draft.chapters[0].writingContentBlock[0]).toMatchObject({
            contentType: "Text",
            text: "Hello world",
            imageUrl: null,
        });

        expect(draft.chapters[0].writingContentBlock[1]).toMatchObject({
            contentType: "Image",
            text: "",
            imageUrl: "https://example.com/panel.png",
            altText: "Panel",
        });
    });

    it("handles empty writing content blocks safely", () => {
        vi.stubGlobal("crypto", {
            randomUUID: () => "uuid-empty",
        });

        const dto: WritingApiDto = {
            writingId: 1,
            title: "T",
            description: "D",
            coverUrl: "",
            tags: [],
            links: [],
            uploadedAt: "",
            comments: null,
            chapters: [
                {
                    writingChapterId: 2,
                    writingId: 1,
                    writingChapterTitle: "C",
                    writingChapterContent: [
                        {
                            writingChapterContentId: 3,
                            writingChapterId: 2,
                            writingContentPosition: 1,
                            writingContentType: "Text",
                            writingContentBlock: [],
                        },
                    ],
                },
            ],
        };

        const draft = apiDtoToWritingDraft(dto);
        expect(draft.chapters[0].writingContentBlock[0]).toMatchObject({
            contentType: "Text",
            text: "",
            imageUrl: null,
            altText: "",
        });
    });
});
