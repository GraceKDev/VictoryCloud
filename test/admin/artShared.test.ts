import { describe, expect, it } from "vitest";
import { apiDtoToArtDraft, artDraftToEmpty } from "@/app/components/admin/artShared";
import type { ArtApiDto } from "@/app/lib/types/art";

describe("artShared helpers", () => {
    it("creates an empty art draft", () => {
        expect(artDraftToEmpty()).toEqual({
            title: "",
            description: "",
            imageUrl: "",
            tags: "",
            links: [],
            uploading: false,
            uploadError: null,
        });
    });

    it("maps ArtApiDto to ArtDraft", () => {
        const dto: ArtApiDto = {
            artId: 42,
            title: "Skyline",
            description: "City at dusk",
            imageUrl: "https://example.com/skyline.png",
            tags: ["city", "dusk"],
            links: ["https://example.com"],
            uploadedAt: "2026-06-10",
        };

        expect(apiDtoToArtDraft(dto)).toEqual({
            title: "Skyline",
            description: "City at dusk",
            imageUrl: "https://example.com/skyline.png",
            tags: "city, dusk",
            links: ["https://example.com"],
            uploading: false,
            uploadError: null,
        });
    });

    it("handles missing optional arrays when mapping ArtApiDto", () => {
        const dto = {
            artId: 9,
            title: "Untitled",
            description: "",
            imageUrl: "",
            uploadedAt: "",
        } as ArtApiDto;

        expect(apiDtoToArtDraft(dto)).toEqual({
            title: "Untitled",
            description: "",
            imageUrl: "",
            tags: "",
            links: [],
            uploading: false,
            uploadError: null,
        });
    });
});
