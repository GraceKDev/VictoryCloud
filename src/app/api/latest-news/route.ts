import { art } from "@/app/lib/art";
import { comics } from "@/app/lib/comics";
import { writing } from "@/app/lib/writing";
import { NextResponse } from "next/server";

type LatestNewsItem = {
    source: "art" | "comics" | "writing";
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    uploadedAt: string;
    updatedAt?: string;
    tags: string[];
    link?: string;
    newsLabel: string;
    newsSummary: string;
};

function toDate(value?: string) {
    if (!value) return new Date(0);
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

function buildLatestNews(): LatestNewsItem[] {
    const artItems: LatestNewsItem[] = art.map((item) => ({
        source: "art",
        id: item.artId,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        uploadedAt: item.uploadedAt,
        updatedAt: item.updatedAt,
        tags: item.tags,
        link: item.links[0],
        newsLabel: "Art",
        newsSummary: item.description,
    }));

    const comicItems: LatestNewsItem[] = comics.map((item) => ({
        source: "comics",
        id: item.comicId,
        title: item.title,
        description: item.description,
        imageUrl: item.coverImageUrl,
        uploadedAt: item.uploadedAt ?? `${item.details.year}-01-01`,
        updatedAt: item.updatedAt,
        tags: item.tags,
        newsLabel: item.updatedAt ? "Updated Comic" : "New Comic",
        newsSummary: item.updatedAt
            ? "A new update is available."
            : "A new comic is available.",
    }));

    const writingItems: LatestNewsItem[] = writing.map((item) => ({
        source: "writing",
        id: item.writingId,
        title: item.title,
        description: item.description,
        imageUrl: item.coverUrl,
        uploadedAt: item.uploadedAt,
        updatedAt: item.updatedAt,
        tags: item.tags,
        link: item.links[0],
        newsLabel: item.updatedAt ? "Updated Writing" : "New Writing",
        newsSummary: item.updatedAt
            ? "A new update is available."
            : "A new writing piece is available.",
    }));

    return [...artItems, ...comicItems, ...writingItems].sort(
        (left, right) => toDate(right.uploadedAt).getTime() - toDate(left.uploadedAt).getTime()
    ).slice(0, 6);
}

export async function GET() {
    return NextResponse.json({
        items: buildLatestNews(),
    });
}
