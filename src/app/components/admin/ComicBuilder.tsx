"use client";

import { useState } from "react";
import {
    type ImageDraft,
    type ChapterDraft,
    type ComicDetails,
    uploadImage,
    ComicFormSidebar,
    ComicChapterPanel,
} from "./comicShared";

type ComicDraft = {
    title: string;
    description: string;
    coverImageUrl: string;
    tags: string;
    details: ComicDetails;
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

type Props = { onBack: () => void };

export default function ComicBuilder({ onBack }: Props) {
    const [draft, setDraft] = useState<ComicDraft>(emptyDraft);
    const [tagInput, setTagInput] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [saveError, setSaveError] = useState("");

    const parsedTags = draft.tags.split(",").map((t) => t.trim()).filter(Boolean);

    function commitTagInput() {
        const newTag = tagInput.trim();
        if (!newTag) return;
        setDraft((d) => ({ ...d, tags: [...parsedTags, newTag].join(", ") }));
        setTagInput("");
    }

    function removeTag(i: number) {
        setDraft((d) => ({ ...d, tags: parsedTags.filter((_, idx) => idx !== i).join(", ") }));
    }

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
        setDraft((d) => ({
            ...d,
            chapters: d.chapters.map((c, i) => (i === ci ? { ...c, chapterTitle: title } : c)),
        }));
    }

    function addImages(ci: number, files: FileList) {
        const newDrafts: ImageDraft[] = Array.from(files).map((file) => ({
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file),
            s3Url: null,
            uploading: true,
            error: null,
        }));

        setDraft((d) => ({
            ...d,
            chapters: d.chapters.map((c, i) => (i === ci ? { ...c, images: [...c.images, ...newDrafts] } : c)),
        }));

        newDrafts.forEach((imgDraft) => {
            uploadImage(imgDraft.file!)
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
            const res = await fetch("http://localhost:5266/Api/Comic/Create", {
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


            <div className="flex flex-1 overflow-hidden">
                <ComicFormSidebar
                    title={draft.title}
                    description={draft.description}
                    coverImageUrl={draft.coverImageUrl}
                    details={draft.details}
                    tagInput={tagInput}
                    parsedTags={parsedTags}
                    onTitleChange={(v) => setDraft((d) => ({ ...d, title: v }))}
                    onDescriptionChange={(v) => setDraft((d) => ({ ...d, description: v }))}
                    onCoverImageUrlChange={(v) => setDraft((d) => ({ ...d, coverImageUrl: v }))}
                    onDetailChange={(field, v) => setDraft((d) => ({ ...d, details: { ...d.details, [field]: v } }))}
                    onTagInputChange={setTagInput}
                    onCommitTag={commitTagInput}
                    onRemoveTag={removeTag}
                />
                <ComicChapterPanel
                    chapters={draft.chapters}
                    onAddChapter={addChapter}
                    onTitleChange={updateChapterTitle}
                    onImagesAdd={addImages}
                    onImageRemove={removeImage}
                    onImageReorder={reorderImages}
                    onRemoveChapter={removeChapter}
                />
            </div>
        </div>
    );
}
