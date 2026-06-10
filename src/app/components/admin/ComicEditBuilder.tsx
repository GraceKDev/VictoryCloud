"use client";

import { useEffect, useState } from "react";
import {
    type ImageDraft,
    type ChapterDraft,
    type ComicDetails,
    uploadImage,
    ComicFormSidebar,
    ComicChapterPanel,
} from "./comicShared";
import { type ComicApiDto } from "@/app/lib/types/comic";

type ComicEditDraft = {
    id: number;
    title: string;
    description: string;
    coverImageUrl: string;
    tags: string;
    details: ComicDetails;
    chapters: ChapterDraft[];
};



function apiDtoToDraft(dto: ComicApiDto): ComicEditDraft {
    return {
        id: dto.comicId,
        title: dto.title ?? "",
        description: dto.description ?? "",
        coverImageUrl: dto.coverImageUrl ?? "",
        tags: (dto.tags ?? []).join(", "),
        details: {
            status: dto.details?.status ?? "Ongoing",
            year: String(dto.details?.year ?? new Date().getFullYear()),
            originalLanguage: dto.details?.originalLanguage ?? "English",
            contentRating: dto.details?.contentRating ?? "Everyone",
        },
        chapters: (dto.chapters ?? []).map((ch) => ({
            id: crypto.randomUUID(),
            chapterTitle: ch.chapterTitle ?? "",
            images: (ch.images ?? []).map((url) => ({
                id: crypto.randomUUID(),
                file: null,
                previewUrl: url,
                s3Url: url,
                uploading: false,
                error: null,
            })),
        })),
    };
}



function ComicListView({
    comics,
    setComics,
    loading,
    fetchError,
    selectingId,
    selectError,
    onSelect,
    onBack,
}: {
    comics: ComicApiDto[];
    setComics: React.Dispatch<React.SetStateAction<ComicApiDto[]>>;
    loading: boolean;
    fetchError: string;
    selectingId: number | null;
    selectError: string;
    onSelect: (comic: ComicApiDto) => void;
    onBack: () => void;
}) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function deleteComic(comic: ComicApiDto) {
        if (!confirm(`Are you sure you want to delete "${comic.title}"? This action cannot be undone.`)) {
            return;
        }
        setDeletingId(comic.comicId);

        try {
            const res = await fetch(`http://localhost:5266/Api/Comic/Delete/${comic.comicId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                
                alert(`Failed to delete: ${err?.message ?? "Server error"}`);
                return;
            }
            setComics((c) => c.filter((com) => com.comicId !== comic.comicId));
        } catch {
            alert("Network error — is the backend running?");
        } finally {
            setDeletingId(null);
        }
    }
    return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="flex items-center gap-3 px-6 py-3 bg-white border-b border-gray-200 shrink-0">
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1"
                >
                    ← Back
                </button>
                <span className="text-gray-300">|</span>
                <h2 className="text-base font-semibold text-gray-800">Edit Comic</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {loading && <p className="text-sm text-gray-400">Loading comics…</p>}
                {fetchError && <p className="text-sm text-red-500">{fetchError}</p>}
                {selectError && <p className="text-sm text-red-500 mb-3">{selectError}</p>}
                {!loading && !fetchError && comics.length === 0 && (
                    <p className="text-sm text-gray-400">No comics found.</p>
                )}
                {!loading && comics.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {comics.map((comic) => (
                            <div
                                key={comic.comicId}
                                className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4"
                            >
                                {comic.coverImageUrl ? (
                                    <img
                                        src={comic.coverImageUrl}
                                        alt={comic.title}
                                        className="w-14 h-14 object-cover rounded border border-gray-200 shrink-0"
                                    />
                                ) : (
                                    <div className="w-14 h-14 bg-gray-100 rounded border border-gray-200 shrink-0 flex items-center justify-center">
                                        <span className="text-gray-300 text-xs">No img</span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{comic.title}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {comic.details?.status ?? "—"} · {comic.chapters?.length ?? 0} chapter{(comic.chapters?.length ?? 0) !== 1 ? "s" : ""}
                                    </p>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => onSelect(comic)}
                                        disabled={selectingId !== null}
                                        className="shrink-0 py-1.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
                                    >
                                        {selectingId === comic.comicId ? "Loading…" : "Edit"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteComic(comic)}
                                        disabled={selectingId !== null}
                                        className="shrink-0 py-1.5 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
                                    >
                                        {selectingId === comic.comicId ? "Loading…" : "Delete"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}


function ComicEditForm({
    draft,
    setDraft,
    onBack,
}: {
    draft: ComicEditDraft;
    setDraft: React.Dispatch<React.SetStateAction<ComicEditDraft>>;
    onBack: () => void;
}) {
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
                                    img.id === imgDraft.id ? { ...img, s3Url, uploading: false } : img
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
                                    img.id === imgDraft.id ? { ...img, uploading: false, error: msg } : img
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
        if (anyUploading) { setSaveStatus("error"); setSaveError("Wait for all images to finish uploading."); return; }
        if (anyErrors) { setSaveStatus("error"); setSaveError("Some images failed to upload. Remove or retry them."); return; }

        const payload = {
            id: draft.id,
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
            const res = await fetch("http://localhost:5266/Api/Comic/Update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setSaveStatus("success");
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
                        ← Comics
                    </button>
                    <span className="text-gray-300">|</span>
                    <h2 className="text-base font-semibold text-gray-800 truncate max-w-xs">{draft.title || "Edit Comic"}</h2>
                </div>

                <div className="flex items-center gap-3">
                    {anyUploading && (
                        <span className="text-xs text-amber-600 animate-pulse">Uploading images…</span>
                    )}
                    {saveStatus === "success" && (
                        <span className="text-xs text-green-600">Comic updated!</span>
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
                        {saving ? "Saving…" : "Save Changes"}
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


type Props = {
    onBack: () => void;
};

export default function ComicEditBuilder({ onBack }: Props) {
    const [comics, setComics] = useState<ComicApiDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");
    const [editDraft, setEditDraft] = useState<ComicEditDraft | null>(null);
    const [selectingId, setSelectingId] = useState<number | null>(null);
    const [selectError, setSelectError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5266/Api/Comic/GetAll", { credentials: "include" })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load comics.");
                return res.json();
            })
            .then((data: ComicApiDto[]) => setComics(data))
            .catch((err: unknown) => setFetchError(err instanceof Error ? err.message : "Failed to load comics."))
            .finally(() => setLoading(false));
        console.log(comics)
    }, []);

    async function handleSelect(comic: ComicApiDto) {
        setSelectingId(comic.comicId);
        setSelectError("");
        try {
            const res = await fetch(
                `http://localhost:5266/Api/Comic/Get/${comic.comicId}`,
                { credentials: "include" }
            );
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const dto: ComicApiDto = await res.json();
            setEditDraft(apiDtoToDraft(dto));
        } catch (err: unknown) {
            // Fall back to list data if GetById isn't available
            console.warn("GetById failed, falling back to list data:", err);
            setEditDraft(apiDtoToDraft(comic));
        } finally {
            setSelectingId(null);
        }
    }

    if (editDraft) {
        return (
            <ComicEditForm
                draft={editDraft}
                setDraft={setEditDraft as React.Dispatch<React.SetStateAction<ComicEditDraft>>}
                onBack={() => setEditDraft(null)}
            />
        );
    }

    return (
        <ComicListView
            comics={comics}
            loading={loading}
            fetchError={fetchError}
            selectingId={selectingId}
            selectError={selectError}
            onSelect={handleSelect}
            setComics={setComics}
            onBack={onBack}
        />
    );
}
