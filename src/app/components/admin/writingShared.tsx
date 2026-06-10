"use client";

import { useRef } from "react";
import { uploadImage, Field, TagChips, inputCls } from "./comicShared";
import { WritingApiDto } from "@/app/lib/types/writing";

// Re-export shared utilities so consumers only need one import
export { uploadImage, Field, TagChips, inputCls };
export type { WritingApiDto };

// ── Types ─────────────────────────────────────────────────────────────────────

export type ContentBlockDraft = {
    id: string;
    contentType: "Text" | "Image";
    text: string;
    imageUrl: string | null;
    altText: string;
    uploading: boolean;
    error: string | null;
};

export type WritingChapterDraft = {
    id: string;
    chapterTitle: string;
    writingContentBlock: ContentBlockDraft[];
};

export type WritingDraft = {
    title: string;
    description: string;
    coverUrl: string;
    tags: string;
    links: string[];
    chapters: WritingChapterDraft[];
    coverUploading: boolean;
    coverUploadError: string | null;
};

export function writingDraftToEmpty(): WritingDraft {
    return {
        title: "",
        description: "",
        coverUrl: "",
        tags: "",
        links: [],
        chapters: [],
        coverUploading: false,
        coverUploadError: null,
    };
}

export function apiDtoToWritingDraft(dto: WritingApiDto): WritingDraft {
    console.log("Converting API DTO to draft:", dto);
    console.log(dto);
    var value = {
        title: dto.title ?? "",
        description: dto.description ?? "",
        coverUrl: dto.coverUrl ?? "",
        tags: (dto.tags ?? []).join(", "),
        links: dto.links ?? [],
        chapters: (dto.chapters ?? []).map((ch) => ({
            id: crypto.randomUUID(),
            chapterTitle: ch.writingChapterTitle ?? "",
            writingContentBlock: (ch.writingChapterContent ?? []).map((block) => {
                const b = block.writingContentBlock?.[0];
                if (block.writingContentType === "Text") {
                    return {
                        id: crypto.randomUUID(),
                        contentType: "Text" as const,
                        text: b?.writingContentBlockContent ?? "",
                        imageUrl: null,
                        altText: "",
                        uploading: false,
                        error: null,
                    };
                } else {
                    return {
                        id: crypto.randomUUID(),
                        contentType: "Image" as const,
                        text: "",
                        imageUrl: b?.writingContentBlockImageUrl ?? "",
                        altText: b?.writingContentBlockAltText ?? "",
                        uploading: false,
                        error: null,
                    };
                }
            }),
        })),
        coverUploading: false,
        coverUploadError: null,
    };
    console.log(value);
    return value;
}

// ── ContentBlockCard ──────────────────────────────────────────────────────────

export function ContentBlockCard({
    block,
    index,
    total,
    onMoveUp,
    onMoveDown,
    onRemove,
    onTextChange,
    onAltTextChange,
    onImageUpload,
}: {
    block: ContentBlockDraft;
    index: number;
    total: number;
    onMoveUp: () => void;
    onMoveDown: () => void;
    onRemove: () => void;
    onTextChange: (v: string) => void;
    onAltTextChange: (v: string) => void;
    onImageUpload: (file: File) => void;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="border border-gray-200 rounded-lg bg-white p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${block.contentType === "Text"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                >
                    {block.contentType}
                </span>
                <div className="flex items-center gap-1 ml-auto">
                    <button
                        type="button"
                        onClick={onMoveUp}
                        disabled={index === 0}
                        title="Move up"
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 text-gray-500 transition-colors text-xs"
                    >
                        ↑
                    </button>
                    <button
                        type="button"
                        onClick={onMoveDown}
                        disabled={index === total - 1}
                        title="Move down"
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 disabled:opacity-30 text-gray-500 transition-colors text-xs"
                    >
                        ↓
                    </button>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors px-1 ml-1"
                    >
                        Remove
                    </button>
                </div>
            </div>

            {block.contentType === "Text" && (
                <textarea
                    value={block.text}
                    onChange={(e) => onTextChange(e.target.value)}
                    placeholder="Write your text content here…"
                    rows={4}
                    className={`${inputCls} resize-y w-full`}
                />
            )}

            {block.contentType === "Image" && (
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={block.uploading}
                        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm font-medium rounded-md border border-gray-300 transition-colors"
                    >
                        {block.uploading ? "Uploading…" : block.imageUrl ? "Replace Image" : "Upload Image"}
                    </button>
                    {block.error && <p className="text-xs text-red-500">{block.error}</p>}
                    {block.imageUrl && !block.uploading && (
                        <img
                            src={block.imageUrl}
                            alt={block.altText || "block image"}
                            className="w-full max-h-40 object-contain rounded border border-gray-200"
                        />
                    )}
                    <input
                        type="text"
                        value={block.altText}
                        onChange={(e) => onAltTextChange(e.target.value)}
                        placeholder="Alt text (optional)"
                        className={inputCls}
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) { onImageUpload(f); e.target.value = ""; }
                        }}
                    />
                </div>
            )}
        </div>
    );
}

// ── WritingChapterCard ────────────────────────────────────────────────────────

export function WritingChapterCard({
    chapter,
    index,
    onTitleChange,
    onAddTextBlock,
    onAddImageBlock,
    onRemoveBlock,
    onMoveBlock,
    onBlockTextChange,
    onBlockAltTextChange,
    onBlockImageUpload,
    onRemoveChapter,
}: {
    chapter: WritingChapterDraft;
    index: number;
    onTitleChange: (v: string) => void;
    onAddTextBlock: () => void;
    onAddImageBlock: () => void;
    onRemoveBlock: (bi: number) => void;
    onMoveBlock: (bi: number, dir: "up" | "down") => void;
    onBlockTextChange: (bi: number, v: string) => void;
    onBlockAltTextChange: (bi: number, v: string) => void;
    onBlockImageUpload: (bi: number, file: File) => void;
    onRemoveChapter: () => void;
}) {
    return (
        <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">
                    Chapter {index + 1}
                </span>
                <button
                    type="button"
                    onClick={onRemoveChapter}
                    className="ml-auto text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                    Remove
                </button>
            </div>

            <input
                type="text"
                placeholder="Chapter title"
                value={chapter.chapterTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />

            <div className="flex flex-col gap-2">
                {chapter.writingContentBlock.map((block, bi) => (
                    <ContentBlockCard
                        key={block.id}
                        block={block}
                        index={bi}
                        total={chapter.writingContentBlock.length}
                        onMoveUp={() => onMoveBlock(bi, "up")}
                        onMoveDown={() => onMoveBlock(bi, "down")}
                        onRemove={() => onRemoveBlock(bi)}
                        onTextChange={(v) => onBlockTextChange(bi, v)}
                        onAltTextChange={(v) => onBlockAltTextChange(bi, v)}
                        onImageUpload={(file) => onBlockImageUpload(bi, file)}
                    />
                ))}
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onAddTextBlock}
                    className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-md border border-blue-200 transition-colors"
                >
                    + Text Block
                </button>
                <button
                    type="button"
                    onClick={onAddImageBlock}
                    className="flex-1 py-2 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-medium rounded-md border border-purple-200 transition-colors"
                >
                    + Image Block
                </button>
            </div>
        </div>
    );
}

// ── WritingChapterPanel ───────────────────────────────────────────────────────

export function WritingChapterPanel({
    chapters,
    onAddChapter,
    onRemoveChapter,
    onChapterTitleChange,
    onAddTextBlock,
    onAddImageBlock,
    onRemoveBlock,
    onMoveBlock,
    onBlockTextChange,
    onBlockAltTextChange,
    onBlockImageUpload,
}: {
    chapters: WritingChapterDraft[];
    onAddChapter: () => void;
    onRemoveChapter: (ci: number) => void;
    onChapterTitleChange: (ci: number, v: string) => void;
    onAddTextBlock: (ci: number) => void;
    onAddImageBlock: (ci: number) => void;
    onRemoveBlock: (ci: number, bi: number) => void;
    onMoveBlock: (ci: number, bi: number, dir: "up" | "down") => void;
    onBlockTextChange: (ci: number, bi: number, v: string) => void;
    onBlockAltTextChange: (ci: number, bi: number, v: string) => void;
    onBlockImageUpload: (ci: number, bi: number, file: File) => void;
}) {
    return (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Chapters</h3>
                <button
                    type="button"
                    onClick={onAddChapter}
                    className="py-1.5 px-3 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                    + Add Chapter
                </button>
            </div>

            {chapters.length === 0 && (
                <div className="rounded-lg border-2 border-dashed border-gray-200 h-32 flex items-center justify-center text-gray-300 text-sm">
                    No chapters yet — click &quot;Add Chapter&quot; to start
                </div>
            )}

            {chapters.map((chapter, ci) => (
                <WritingChapterCard
                    key={chapter.id}
                    chapter={chapter}
                    index={ci}
                    onTitleChange={(v) => onChapterTitleChange(ci, v)}
                    onAddTextBlock={() => onAddTextBlock(ci)}
                    onAddImageBlock={() => onAddImageBlock(ci)}
                    onRemoveBlock={(bi) => onRemoveBlock(ci, bi)}
                    onMoveBlock={(bi, dir) => onMoveBlock(ci, bi, dir)}
                    onBlockTextChange={(bi, v) => onBlockTextChange(ci, bi, v)}
                    onBlockAltTextChange={(bi, v) => onBlockAltTextChange(ci, bi, v)}
                    onBlockImageUpload={(bi, file) => onBlockImageUpload(ci, bi, file)}
                    onRemoveChapter={() => onRemoveChapter(ci)}
                />
            ))}
        </div>
    );
}

// ── WritingFormSidebar ────────────────────────────────────────────────────────

type WritingFormSidebarProps = {
    draft: WritingDraft;
    tagInput: string;
    parsedTags: string[];
    onDraftChange: (updates: Partial<WritingDraft>) => void;
    onTagInputChange: (v: string) => void;
    onCommitTag: () => void;
    onRemoveTag: (i: number) => void;
    onAddLink: () => void;
    onRemoveLink: (i: number) => void;
    onLinkChange: (i: number, v: string) => void;
};

export function WritingFormSidebar({
    draft,
    tagInput,
    parsedTags,
    onDraftChange,
    onTagInputChange,
    onCommitTag,
    onRemoveTag,
    onAddLink,
    onRemoveLink,
    onLinkChange,
}: WritingFormSidebarProps) {
    const coverFileInputRef = useRef<HTMLInputElement>(null);

    async function handleCoverUpload(file: File) {
        onDraftChange({ coverUploading: true, coverUploadError: null });
        try {
            const url = await uploadImage(file);
            onDraftChange({ coverUrl: url, coverUploading: false });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Upload failed";
            onDraftChange({ coverUploading: false, coverUploadError: msg });
        }
    }

    return (
        <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto p-6 flex flex-col gap-8 shrink-0">
            <section>
                <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide">Basic Info</h3>
                <div className="flex flex-col gap-4">
                    <Field label="Title *">
                        <input
                            type="text"
                            value={draft.title}
                            onChange={(e) => onDraftChange({ title: e.target.value })}
                            placeholder="Writing title"
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Description">
                        <textarea
                            value={draft.description}
                            onChange={(e) => onDraftChange({ description: e.target.value })}
                            placeholder="Short description"
                            rows={4}
                            className={`${inputCls} resize-y`}
                        />
                    </Field>

                    <Field label="Tags">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => onTagInputChange(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); onCommitTag(); }
                                }}
                                placeholder="Add tag, press Enter"
                                className={`${inputCls} flex-1`}
                            />
                            <button
                                type="button"
                                onClick={onCommitTag}
                                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors"
                            >
                                +
                            </button>
                        </div>
                        <TagChips tags={parsedTags} onRemove={onRemoveTag} />
                    </Field>

                    <Field label="Links">
                        <div className="flex flex-col gap-2">
                            {draft.links.map((link, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input
                                        type="url"
                                        value={link}
                                        onChange={(e) => onLinkChange(i, e.target.value)}
                                        placeholder="https://…"
                                        className={`${inputCls} flex-1`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => onRemoveLink(i)}
                                        className="text-red-400 hover:text-red-600 text-sm px-1 transition-colors"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={onAddLink}
                                className="text-sm text-blue-600 hover:text-blue-800 self-start transition-colors"
                            >
                                + Add Link
                            </button>
                        </div>
                    </Field>
                </div>
            </section>

            <section>
                <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide">Cover Image</h3>
                <div className="flex flex-col gap-3">
                    <Field label="Cover URL">
                        <input
                            type="url"
                            value={draft.coverUrl}
                            onChange={(e) => onDraftChange({ coverUrl: e.target.value })}
                            placeholder="https://…"
                            className={inputCls}
                        />
                    </Field>
                    <div className="text-xs text-gray-400 text-center">— or —</div>
                    <button
                        type="button"
                        onClick={() => coverFileInputRef.current?.click()}
                        disabled={draft.coverUploading}
                        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm font-medium rounded-md border border-gray-300 transition-colors"
                    >
                        {draft.coverUploading ? "Uploading…" : "Upload Cover File"}
                    </button>
                    {draft.coverUploadError && (
                        <p className="text-xs text-red-500">{draft.coverUploadError}</p>
                    )}
                    {draft.coverUrl && !draft.coverUploading && (
                        <img
                            src={draft.coverUrl}
                            alt="Cover preview"
                            className="mt-1 w-full max-h-48 object-contain rounded border border-gray-200"
                        />
                    )}
                    <input
                        ref={coverFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) { handleCoverUpload(f); e.target.value = ""; }
                        }}
                    />
                </div>
            </section>
        </div>
    );
}
