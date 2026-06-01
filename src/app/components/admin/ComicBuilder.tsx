"use client";

import { useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ImageDraft = {
    id: string;
    file: File;
    previewUrl: string;
    s3Url: string | null;
    uploading: boolean;
    error: string | null;
};

type ChapterDraft = {
    id: string;
    chapterTitle: string;
    images: ImageDraft[];
};

type ComicDraft = {
    title: string;
    description: string;
    coverImageUrl: string;
    tags: string; // comma-separated input value
    details: {
        status: string;
        year: string;
        originalLanguage: string;
        contentRating: string;
    };
    chapters: ChapterDraft[];
};

const emptyDraft = (): ComicDraft => ({
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

// ─── Upload helper ─────────────────────────────────────────────────────────────

async function uploadImage(file: File): Promise<string> {
    console.log(file.type);
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
    console.log(await putRes.text());
    if (!putRes.ok) throw new Error("S3 upload failed");

    return objectUrl as string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TagChips({ tags, onRemove }: { tags: string[]; onRemove: (i: number) => void }) {
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

function ImageThumb({
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
            title={img.file.name}
        >
            <img src={img.previewUrl} alt={img.file.name} className="w-full h-full object-cover" />

            {/* uploading spinner */}
            {img.uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                </div>
            )}

            {/* error state */}
            {img.error && !img.uploading && (
                <div className="absolute inset-0 bg-red-500/70 flex items-center justify-center" title={img.error}>
                    <span className="text-white text-lg font-bold">!</span>
                </div>
            )}

            {/* page number badge */}
            {!img.uploading && !img.error && (
                <span className="absolute bottom-0 left-0 bg-black/60 text-white text-[10px] px-1">{index + 1}</span>
            )}

            {/* remove button */}
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

function ChapterCard({
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

            {/* Image grid */}
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

                {/* Add image button */}
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

// ─── Field helpers ────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            {children}
        </div>
    );
}

const inputCls = "border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

// ─── Main Component ───────────────────────────────────────────────────────────

type Props = {
    onBack: () => void;
};

export default function ComicBuilder({ onBack }: Props) {
    const [draft, setDraft] = useState<ComicDraft>(emptyDraft);
    const [tagInput, setTagInput] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [saveError, setSaveError] = useState("");

    // ── Draft helpers ──────────────────────────────────────────────────────────

    function updateField(field: keyof Omit<ComicDraft, "details" | "chapters" | "tags">, value: string) {
        setDraft((d) => ({ ...d, [field]: value }));
    }

    function updateDetail(field: keyof ComicDraft["details"], value: string) {
        setDraft((d) => ({ ...d, details: { ...d.details, [field]: value } }));
    }

    // ── Tag helpers ────────────────────────────────────────────────────────────

    const parsedTags = draft.tags.split(",").map((t) => t.trim()).filter(Boolean);

    function commitTagInput() {
        const newTag = tagInput.trim();
        if (!newTag) return;
        const next = [...parsedTags, newTag].join(", ");
        setDraft((d) => ({ ...d, tags: next }));
        setTagInput("");
    }

    function removeTag(i: number) {
        const next = parsedTags.filter((_, idx) => idx !== i).join(", ");
        setDraft((d) => ({ ...d, tags: next }));
    }

    // ── Chapter helpers ────────────────────────────────────────────────────────

    function addChapter() {
        setDraft((d) => ({
            ...d,
            chapters: [...d.chapters, { id: crypto.randomUUID(), chapterTitle: "", images: [] }],
        }));
    }

    function removeChapter(ci: number) {
        setDraft((d) => ({ ...d, chapters: d.chapters.filter((_, i) => i !== ci) }));
    }

    function updateChapterTitle(ci: number, title: string) {
        setDraft((d) => {
            const chapters = d.chapters.map((c, i) => i === ci ? { ...c, chapterTitle: title } : c);
            return { ...d, chapters };
        });
    }

    // ── Image helpers ──────────────────────────────────────────────────────────

    function addImages(ci: number, files: FileList) {
        const newDrafts: ImageDraft[] = Array.from(files).map((file) => ({
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
            s3Url: null,
            uploading: true,
            error: null,
        }));

        setDraft((d) => {
            const chapters = d.chapters.map((c, i) =>
                i === ci ? { ...c, images: [...c.images, ...newDrafts] } : c
            );
            return { ...d, chapters };
        });

        // Upload each image immediately
        newDrafts.forEach((imgDraft) => {
            uploadImage(imgDraft.file)
                .then((s3Url) => {
                    setDraft((d) => ({
                        ...d,
                        chapters: d.chapters.map((c, i) =>
                            i !== ci ? c : {
                                ...c,
                                images: c.images.map((img) =>
                                    img.id === imgDraft.id
                                        ? { ...img, s3Url, uploading: false }
                                        : img
                                ),
                            }
                        ),
                    }));
                })
                .catch((err: unknown) => {
                    const msg = err instanceof Error ? err.message : "Upload failed";
                    setDraft((d) => ({
                        ...d,
                        chapters: d.chapters.map((c, i) =>
                            i !== ci ? c : {
                                ...c,
                                images: c.images.map((img) =>
                                    img.id === imgDraft.id
                                        ? { ...img, uploading: false, error: msg }
                                        : img
                                ),
                            }
                        ),
                    }));
                });
        });
    }

    function removeImage(ci: number, imgIndex: number) {
        setDraft((d) => ({
            ...d,
            chapters: d.chapters.map((c, i) =>
                i !== ci ? c : { ...c, images: c.images.filter((_, j) => j !== imgIndex) }
            ),
        }));
    }

    function reorderImages(ci: number, from: number, to: number) {
        setDraft((d) => {
            const chapters = d.chapters.map((c, i) => {
                if (i !== ci) return c;
                const images = [...c.images];
                const [moved] = images.splice(from, 1);
                images.splice(to, 0, moved);
                return { ...c, images };
            });
            return { ...d, chapters };
        });
    }

    // ── Validation & Save ──────────────────────────────────────────────────────

    const anyUploading = draft.chapters.some((c) => c.images.some((img) => img.uploading));
    const anyErrors = draft.chapters.some((c) => c.images.some((img) => img.error));

    async function handleSave() {
        if (!draft.title.trim()) { setSaveStatus("error"); setSaveError("Title is required."); return; }
        if (draft.chapters.length === 0) { setSaveStatus("error"); setSaveError("Add at least one chapter."); return; }
        if (anyUploading) { setSaveStatus("error"); setSaveError("Wait for all images to finish uploading."); return; }
        if (anyErrors) { setSaveStatus("error"); setSaveError("Some images failed to upload. Remove or retry them."); return; }

        const payload = {
            title: draft.title,
            description: draft.description,
            coverImageUrl: draft.coverImageUrl,
            tags: parsedTags,
            details: {
                status: draft.details.status,
                year: parseInt(draft.details.year, 10) || new Date().getFullYear(),
                originalLanguage: draft.details.originalLanguage,
                contentRating: draft.details.contentRating,
            },
            chapters: draft.chapters.map((c) => ({
                chapterTitle: c.chapterTitle,
                images: c.images.map((img) => img.s3Url!),
            })),
            comments: null,
        };

        setSaving(true);
        setSaveStatus("idle");
        try {
            const res = await fetch("http://localhost:5266/Api/Comics/Create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setSaveStatus("success");
                setDraft(emptyDraft());
                setTagInput("");
            } else {
                const err = await res.json().catch(() => null);
                setSaveError(err?.message ?? "Server returned an error.");
                setSaveStatus("error");
            }
        } catch {
            setSaveError("Network error — is the backend running?");
            setSaveStatus("error");
        } finally {
            setSaving(false);
        }
    }

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <div className="flex flex-col h-full bg-gray-50">

            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shrink-0 gap-4">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1"
                    >
                        ← Back
                    </button>
                    <span className="text-gray-300">|</span>
                    <h2 className="text-base font-semibold text-gray-800">New Comic</h2>
                </div>

                <div className="flex items-center gap-3">
                    {anyUploading && (
                        <span className="text-xs text-amber-600 animate-pulse">Uploading images…</span>
                    )}
                    {saveStatus === "success" && (
                        <span className="text-xs text-green-600">Comic saved!</span>
                    )}
                    {saveStatus === "error" && (
                        <span className="text-xs text-red-600">{saveError}</span>
                    )}
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving || anyUploading}
                        className="py-1.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
                    >
                        {saving ? "Saving…" : "Save Comic"}
                    </button>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left column — Basic Info + Details */}
                <div className="w-1/3 border-r border-gray-200 bg-white overflow-y-auto p-6 flex flex-col gap-8 shrink-0">

                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide">Basic Info</h3>
                        <div className="flex flex-col gap-4">
                            <Field label="Title *">
                                <input
                                    type="text"
                                    value={draft.title}
                                    onChange={(e) => updateField("title", e.target.value)}
                                    placeholder="Comic title"
                                    className={inputCls}
                                />
                            </Field>

                            <Field label="Description">
                                <textarea
                                    value={draft.description}
                                    onChange={(e) => updateField("description", e.target.value)}
                                    placeholder="Short description"
                                    rows={4}
                                    className={`${inputCls} resize-y`}
                                />
                            </Field>

                            <Field label="Cover Image URL">
                                <input
                                    type="url"
                                    value={draft.coverImageUrl}
                                    onChange={(e) => updateField("coverImageUrl", e.target.value)}
                                    placeholder="https://…"
                                    className={inputCls}
                                />
                                {draft.coverImageUrl && (
                                    <img
                                        src={draft.coverImageUrl}
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
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); commitTagInput(); } }}
                                        placeholder="Add tag, press Enter"
                                        className={`${inputCls} flex-1`}
                                    />
                                    <button
                                        type="button"
                                        onClick={commitTagInput}
                                        className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                                <TagChips tags={parsedTags} onRemove={removeTag} />
                            </Field>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide">Details</h3>
                        <div className="flex flex-col gap-4">
                            <Field label="Status">
                                <select
                                    value={draft.details.status}
                                    onChange={(e) => updateDetail("status", e.target.value)}
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
                                    value={draft.details.year}
                                    onChange={(e) => updateDetail("year", e.target.value)}
                                    min={1900}
                                    max={2100}
                                    className={inputCls}
                                />
                            </Field>

                            <Field label="Original Language">
                                <input
                                    type="text"
                                    value={draft.details.originalLanguage}
                                    onChange={(e) => updateDetail("originalLanguage", e.target.value)}
                                    className={inputCls}
                                />
                            </Field>

                            <Field label="Content Rating">
                                <select
                                    value={draft.details.contentRating}
                                    onChange={(e) => updateDetail("contentRating", e.target.value)}
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

                {/* Right column — Chapters */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between shrink-0">
                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                            Chapters ({draft.chapters.length})
                        </h3>
                        <button
                            type="button"
                            onClick={addChapter}
                            className="py-1.5 px-3 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
                        >
                            + Add Chapter
                        </button>
                    </div>

                    {draft.chapters.length === 0 && (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-sm text-gray-400">No chapters yet — click &ldquo;Add Chapter&rdquo; to start.</p>
                        </div>
                    )}

                    {draft.chapters.map((chapter, ci) => (
                        <ChapterCard
                            key={chapter.id}
                            chapter={chapter}
                            index={ci}
                            onTitleChange={(v) => updateChapterTitle(ci, v)}
                            onImagesAdd={(files) => addImages(ci, files)}
                            onImageRemove={(imgIndex) => removeImage(ci, imgIndex)}
                            onImageReorder={(from, to) => reorderImages(ci, from, to)}
                            onRemoveChapter={() => removeChapter(ci)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
