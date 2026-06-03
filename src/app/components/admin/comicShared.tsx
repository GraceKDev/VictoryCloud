"use client";

import { useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ImageDraft = {
    id: string;
    file: File | null;   // null = existing S3 image (edit mode)
    previewUrl: string;
    s3Url: string | null;
    uploading: boolean;
    error: string | null;
};

export type ChapterDraft = {
    id: string;
    chapterTitle: string;
    images: ImageDraft[];
};

export type ComicDetails = {
    status: string;
    year: string;
    originalLanguage: string;
    contentRating: string;
};

// ── Upload helper ─────────────────────────────────────────────────────────────

export async function uploadImage(file: File): Promise<string> {
    const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });
    if (!res.ok) throw new Error("Failed to get upload URL");
    const { url, objectUrl } = await res.json();

    const putRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
    });
    if (!putRes.ok) throw new Error("S3 upload failed");

    return objectUrl as string;
}

// ── Primitives ────────────────────────────────────────────────────────────────

export const inputCls = "border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            {children}
        </div>
    );
}

export function TagChips({ tags, onRemove }: { tags: string[]; onRemove: (i: number) => void }) {
    return (
        <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                    {t}
                    <button type="button" onClick={() => onRemove(i)} className="hover:text-blue-900 leading-none">×</button>
                </span>
            ))}
        </div>
    );
}

export function ImageThumb({
    img,
    index,
    onRemove,
    onDragStart,
    onDragOver,
    onDrop,
}: {
    img: ImageDraft;
    index: number;
    onRemove: () => void;
    onDragStart: (i: number) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (i: number) => void;
}) {
    return (
        <div
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={(e) => { e.preventDefault(); onDragOver(e); }}
            onDrop={() => onDrop(index)}
            className="relative w-20 h-20 rounded overflow-hidden border border-gray-200 shrink-0 cursor-grab select-none group"
            title={img.file?.name ?? img.s3Url ?? ""}
        >
            <img src={img.previewUrl} alt={img.file?.name ?? `image-${index}`} className="w-full h-full object-cover" />

            {img.uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                </div>
            )}

            {img.error && !img.uploading && (
                <div className="absolute inset-0 bg-red-500/70 flex items-center justify-center" title={img.error}>
                    <span className="text-white text-lg font-bold">!</span>
                </div>
            )}

            {!img.uploading && !img.error && (
                <span className="absolute bottom-0 left-0 bg-black/60 text-white text-[10px] px-1">{index + 1}</span>
            )}

            <button
                type="button"
                onClick={onRemove}
                className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 hover:bg-red-600 text-white rounded-full text-xs leading-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
                ×
            </button>
        </div>
    );
}

export function ChapterCard({
    chapter,
    index,
    onTitleChange,
    onImagesAdd,
    onImageRemove,
    onImageReorder,
    onRemoveChapter,
}: {
    chapter: ChapterDraft;
    index: number;
    onTitleChange: (v: string) => void;
    onImagesAdd: (files: FileList) => void;
    onImageRemove: (imgIndex: number) => void;
    onImageReorder: (from: number, to: number) => void;
    onRemoveChapter: () => void;
}) {
    const dragFrom = useRef<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide shrink-0">Chapter {index + 1}</span>
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

            <div className="flex flex-wrap gap-2">
                {chapter.images.map((img, i) => (
                    <ImageThumb
                        key={img.id}
                        img={img}
                        index={i}
                        onRemove={() => onImageRemove(i)}
                        onDragStart={(from) => { dragFrom.current = from; }}
                        onDragOver={() => {}}
                        onDrop={(to) => {
                            if (dragFrom.current !== null && dragFrom.current !== to) {
                                onImageReorder(dragFrom.current, to);
                            }
                            dragFrom.current = null;
                        }}
                    />
                ))}

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-20 h-20 rounded border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-blue-500 shrink-0"
                >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                    <span className="text-[10px]">Add</span>
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => { if (e.target.files?.length) { onImagesAdd(e.target.files); e.target.value = ""; } }}
            />

            <p className="text-xs text-gray-400">
                {chapter.images.length} image{chapter.images.length !== 1 ? "s" : ""} · drag thumbnails to reorder
            </p>
        </div>
    );
}

// ── ComicFormSidebar ──────────────────────────────────────────────────────────

export function ComicFormSidebar({
    title,
    description,
    coverImageUrl,
    details,
    tagInput,
    parsedTags,
    onTitleChange,
    onDescriptionChange,
    onCoverImageUrlChange,
    onDetailChange,
    onTagInputChange,
    onCommitTag,
    onRemoveTag,
}: {
    title: string;
    description: string;
    coverImageUrl: string;
    details: ComicDetails;
    tagInput: string;
    parsedTags: string[];
    onTitleChange: (v: string) => void;
    onDescriptionChange: (v: string) => void;
    onCoverImageUrlChange: (v: string) => void;
    onDetailChange: (field: keyof ComicDetails, value: string) => void;
    onTagInputChange: (v: string) => void;
    onCommitTag: () => void;
    onRemoveTag: (i: number) => void;
}) {
    return (
        <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto p-6 flex flex-col gap-8 shrink-0">
            <section>
                <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide">Basic Info</h3>
                <div className="flex flex-col gap-4">
                    <Field label="Title *">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => onTitleChange(e.target.value)}
                            placeholder="Comic title"
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Description">
                        <textarea
                            value={description}
                            onChange={(e) => onDescriptionChange(e.target.value)}
                            placeholder="Short description"
                            rows={4}
                            className={`${inputCls} resize-y`}
                        />
                    </Field>

                    <Field label="Cover Image URL">
                        <input
                            type="url"
                            value={coverImageUrl}
                            onChange={(e) => onCoverImageUrlChange(e.target.value)}
                            placeholder="https://…"
                            className={inputCls}
                        />
                        {coverImageUrl && (
                            <img
                                src={coverImageUrl}
                                alt="Cover preview"
                                className="mt-2 w-full max-h-48 object-contain rounded border border-gray-200"
                            />
                        )}
                    </Field>

                    <Field label="Tags">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => onTagInputChange(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); onCommitTag(); } }}
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
                </div>
            </section>

            <section>
                <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide">Details</h3>
                <div className="flex flex-col gap-4">
                    <Field label="Status">
                        <select
                            value={details.status}
                            onChange={(e) => onDetailChange("status", e.target.value)}
                            className={inputCls}
                        >
                            {["Ongoing", "Completed", "Hiatus", "Cancelled"].map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Year">
                        <input
                            type="number"
                            value={details.year}
                            onChange={(e) => onDetailChange("year", e.target.value)}
                            min={1900}
                            max={2100}
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Original Language">
                        <input
                            type="text"
                            value={details.originalLanguage}
                            onChange={(e) => onDetailChange("originalLanguage", e.target.value)}
                            className={inputCls}
                        />
                    </Field>

                    <Field label="Content Rating">
                        <select
                            value={details.contentRating}
                            onChange={(e) => onDetailChange("contentRating", e.target.value)}
                            className={inputCls}
                        >
                            {["Everyone", "Teen", "Mature", "Adults Only"].map((r) => (
                                <option key={r}>{r}</option>
                            ))}
                        </select>
                    </Field>
                </div>
            </section>
        </div>
    );
}

// ── ComicChapterPanel ─────────────────────────────────────────────────────────

export function ComicChapterPanel({
    chapters,
    onAddChapter,
    onTitleChange,
    onImagesAdd,
    onImageRemove,
    onImageReorder,
    onRemoveChapter,
}: {
    chapters: ChapterDraft[];
    onAddChapter: () => void;
    onTitleChange: (ci: number, v: string) => void;
    onImagesAdd: (ci: number, files: FileList) => void;
    onImageRemove: (ci: number, imgIndex: number) => void;
    onImageReorder: (ci: number, from: number, to: number) => void;
    onRemoveChapter: (ci: number) => void;
}) {
    return (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between shrink-0">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                    Chapters ({chapters.length})
                </h3>
                <button
                    type="button"
                    onClick={onAddChapter}
                    className="py-1.5 px-3 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
                >
                    + Add Chapter
                </button>
            </div>

            {chapters.length === 0 && (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-sm text-gray-400">No chapters yet — click &ldquo;Add Chapter&rdquo; to start.</p>
                </div>
            )}

            {chapters.map((chapter, ci) => (
                <ChapterCard
                    key={chapter.id}
                    chapter={chapter}
                    index={ci}
                    onTitleChange={(v) => onTitleChange(ci, v)}
                    onImagesAdd={(files) => onImagesAdd(ci, files)}
                    onImageRemove={(imgIndex) => onImageRemove(ci, imgIndex)}
                    onImageReorder={(from, to) => onImageReorder(ci, from, to)}
                    onRemoveChapter={() => onRemoveChapter(ci)}
                />
            ))}
        </div>
    );
}
