"use client";

import { useEffect, useState } from "react";
import {
    type WritingDraft,
    type WritingApiDto,
    type ContentBlockDraft,
    apiDtoToWritingDraft,
    WritingFormSidebar,
    WritingChapterPanel,
    uploadImage,
} from "./writingShared";

type WritingEditDraft = WritingDraft & { id: number };


function useWritingChapterHandlers(
    setDraft: React.Dispatch<React.SetStateAction<WritingEditDraft>>
) {
    function addChapter() {
        setDraft((d) => ({
            ...d,
            chapters: [...d.chapters, { id: crypto.randomUUID(), chapterTitle: "", writingContentBlock: [] }],
        }));
    }

    function removeChapter(ci: number) {
        setDraft((d) => ({ ...d, chapters: d.chapters.filter((_, i) => i !== ci) }));
    }

    function updateChapterTitle(ci: number, v: string) {
        setDraft((d) => ({
            ...d,
            chapters: d.chapters.map((c, i) => (i === ci ? { ...c, chapterTitle: v } : c)),
        }));
    }

    function addBlock(ci: number, type: "Text" | "Image") {
        const newBlock: ContentBlockDraft = {
            id: crypto.randomUUID(),
            contentType: type,
            text: "",
            imageUrl: null,
            altText: "",
            uploading: false,
            error: null,
        };
        setDraft((d) => ({
            ...d,
            chapters: d.chapters.map((c, i) =>
                i === ci ? { ...c, writingContentBlock: [...c.writingContentBlock, newBlock] } : c
            ),
        }));
    }

    function removeBlock(ci: number, bi: number) {
        setDraft((d) => ({
            ...d,
            chapters: d.chapters.map((c, i) =>
                i === ci ? { ...c, writingContentBlock: c.writingContentBlock.filter((_, j) => j !== bi) } : c
            ),
        }));
    }

    function moveBlock(ci: number, bi: number, dir: "up" | "down") {
        setDraft((d) => {
            const chapters = d.chapters.map((c, i) => {
                if (i !== ci) return c;
                const blocks = [...c.writingContentBlock];
                const target = dir === "up" ? bi - 1 : bi + 1;
                if (target < 0 || target >= blocks.length) return c;
                [blocks[bi], blocks[target]] = [blocks[target], blocks[bi]];
                return { ...c, writingContentBlock: blocks };
            });
            return { ...d, chapters };
        });
    }

    function updateBlockText(ci: number, bi: number, v: string) {
        setDraft((d) => ({
            ...d,
            chapters: d.chapters.map((c, i) =>
                i !== ci ? c : { ...c, writingContentBlock: c.writingContentBlock.map((b, j) => (j === bi ? { ...b, text: v } : b)) }
            ),
        }));
    }

    function updateBlockAltText(ci: number, bi: number, v: string) {
        setDraft((d) => ({
            ...d,
            chapters: d.chapters.map((c, i) =>
                i !== ci ? c : { ...c, writingContentBlock: c.writingContentBlock.map((b, j) => (j === bi ? { ...b, altText: v } : b)) }
            ),
        }));
    }

    function uploadBlockImage(ci: number, bi: number, file: File) {
        setDraft((d) => ({
            ...d,
            chapters: d.chapters.map((c, i) =>
                i !== ci ? c : { ...c, writingContentBlock: c.writingContentBlock.map((b, j) => (j === bi ? { ...b, uploading: true, error: null } : b)) }
            ),
        }));
        uploadImage(file)
            .then((url) => {
                setDraft((d) => ({
                    ...d,
                    chapters: d.chapters.map((c, i) =>
                        i !== ci ? c : { ...c, writingContentBlock: c.writingContentBlock.map((b, j) => (j === bi ? { ...b, imageUrl: url, uploading: false } : b)) }
                    ),
                }));
            })
            .catch((err: unknown) => {
                const msg = err instanceof Error ? err.message : "Upload failed";
                setDraft((d) => ({
                    ...d,
                    chapters: d.chapters.map((c, i) =>
                        i !== ci ? c : { ...c, writingContentBlock: c.writingContentBlock.map((b, j) => (j === bi ? { ...b, uploading: false, error: msg } : b)) }
                    ),
                }));
            });
    }

    return {
        addChapter, removeChapter, updateChapterTitle,
        addBlock, removeBlock, moveBlock,
        updateBlockText, updateBlockAltText, uploadBlockImage,
    };
}



function WritingListView({
    writings,
    setWritings,
    loading,
    fetchError,
    selectingId,
    selectError,
    onSelect,
    onBack,
}: {
    writings: WritingApiDto[];
    setWritings: React.Dispatch<React.SetStateAction<WritingApiDto[]>>;
    loading: boolean;
    fetchError: string;
    selectingId: number | null;
    selectError: string;
    onSelect: (w: WritingApiDto) => void;
    onBack: () => void;
}) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function deleteWriting(w: WritingApiDto) {
        if (!confirm(`Are you sure you want to delete "${w.title}"? This cannot be undone.`)) return;
        setDeletingId(w.writingId);
        try {
            const res = await fetch(`http://localhost:5266/Api/Writing/Delete/${w.writingId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                alert(`Failed to delete: ${err?.message ?? "Server error"}`);
                return;
            }
            setWritings((prev) => prev.filter((item) => item.writingId !== w.writingId));
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
                <h2 className="text-base font-semibold text-gray-800">Edit Writing</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {loading && <p className="text-sm text-gray-400">Loading writing…</p>}
                {fetchError && <p className="text-sm text-red-500">{fetchError}</p>}
                {selectError && <p className="text-sm text-red-500 mb-3">{selectError}</p>}
                {!loading && !fetchError && writings.length === 0 && (
                    <p className="text-sm text-gray-400">No writing found.</p>
                )}
                {!loading && writings.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {writings.map((w) => (
                            <div
                                key={w.writingId}
                                className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4"
                            >
                                {w.coverUrl ? (
                                    <img
                                        src={w.coverUrl}
                                        alt={w.title}
                                        className="w-14 h-14 object-cover rounded border border-gray-200 shrink-0"
                                    />
                                ) : (
                                    <div className="w-14 h-14 bg-gray-100 rounded border border-gray-200 shrink-0 flex items-center justify-center">
                                        <span className="text-gray-300 text-xs">No img</span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{w.title}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {w.chapters?.length ?? 0} chapter{(w.chapters?.length ?? 0) !== 1 ? "s" : ""}
                                    </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => onSelect(w)}
                                        disabled={selectingId !== null || deletingId !== null}
                                        className="py-1.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
                                    >
                                        {selectingId === w.writingId ? "Loading…" : "Edit"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteWriting(w)}
                                        disabled={selectingId !== null || deletingId !== null}
                                        className="py-1.5 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
                                    >
                                        {deletingId === w.writingId ? "Deleting…" : "Delete"}
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



function WritingEditForm({
    draft,
    setDraft,
    onBack,
}: {
    draft: WritingEditDraft;
    setDraft: React.Dispatch<React.SetStateAction<WritingEditDraft>>;
    onBack: () => void;
}) {
    const [tagInput, setTagInput] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [saveError, setSaveError] = useState("");

    const parsedTags = draft.tags.split(",").map((t) => t.trim()).filter(Boolean);

    const {
        addChapter, removeChapter, updateChapterTitle,
        addBlock, removeBlock, moveBlock,
        updateBlockText, updateBlockAltText, uploadBlockImage,
    } = useWritingChapterHandlers(setDraft);

    function commitTagInput() {
        const newTag = tagInput.trim();
        if (!newTag) return;
        setDraft((d) => ({ ...d, tags: [...parsedTags, newTag].join(", ") }));
        setTagInput("");
    }

    function removeTag(i: number) {
        setDraft((d) => ({ ...d, tags: parsedTags.filter((_, idx) => idx !== i).join(", ") }));
    }

    function addLink() {
        setDraft((d) => ({ ...d, links: [...d.links, ""] }));
    }

    function removeLink(i: number) {
        setDraft((d) => ({ ...d, links: d.links.filter((_, idx) => idx !== i) }));
    }

    function updateLink(i: number, v: string) {
        setDraft((d) => ({ ...d, links: d.links.map((l, idx) => (idx === i ? v : l)) }));
    }

    const anyUploading =
        draft.coverUploading ||
        draft.chapters.some((c) => c.writingContentBlock.some((b) => b.uploading));

    async function handleSave() {
        if (!draft.title.trim()) { setSaveStatus("error"); setSaveError("Title is required."); return; }
        if (anyUploading) { setSaveStatus("error"); setSaveError("Wait for all uploads to finish."); return; }

        const payload = {
            id: draft.id,
            title: draft.title,
            description: draft.description,
            coverUrl: draft.coverUrl,
            tags: parsedTags,
            links: draft.links.filter((l) => l.trim()),
            chapters: draft.chapters.map((ch) => ({
                chapterTitle: ch.chapterTitle,
                content: ch.writingContentBlock.map((b, idx) => ({
                    contentPosition: idx,
                    contentType: b.contentType,
                    content:
                        b.contentType === "Text"
                            ? { content: b.text }
                            : { imageUrl: b.imageUrl ?? "", altText: b.altText },
                })),
            })),
            comments: null,
        };

        setSaving(true);
        setSaveStatus("idle");
        try {
            const res = await fetch("http://localhost:5266/Api/Writing/Update", {
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
                        ← Writing
                    </button>
                    <span className="text-gray-300">|</span>
                    <h2 className="text-base font-semibold text-gray-800 truncate max-w-xs">
                        {draft.title || "Edit Writing"}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    {anyUploading && (
                        <span className="text-xs text-amber-600 animate-pulse">Uploading…</span>
                    )}
                    {saveStatus === "success" && (
                        <span className="text-xs text-green-600">Writing updated!</span>
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
                <WritingFormSidebar
                    draft={draft}
                    tagInput={tagInput}
                    parsedTags={parsedTags}
                    onDraftChange={(updates) => setDraft((d) => ({ ...d, ...updates }))}
                    onTagInputChange={setTagInput}
                    onCommitTag={commitTagInput}
                    onRemoveTag={removeTag}
                    onAddLink={addLink}
                    onRemoveLink={removeLink}
                    onLinkChange={updateLink}
                />
                <WritingChapterPanel
                    chapters={draft.chapters}
                    onAddChapter={addChapter}
                    onRemoveChapter={removeChapter}
                    onChapterTitleChange={updateChapterTitle}
                    onAddTextBlock={(ci) => addBlock(ci, "Text")}
                    onAddImageBlock={(ci) => addBlock(ci, "Image")}
                    onRemoveBlock={removeBlock}
                    onMoveBlock={moveBlock}
                    onBlockTextChange={updateBlockText}
                    onBlockAltTextChange={updateBlockAltText}
                    onBlockImageUpload={uploadBlockImage}
                />
            </div>
        </div>
    );
}

type Props = { onBack: () => void };

export default function WritingEditBuilder({ onBack }: Props) {
    const [writings, setWritings] = useState<WritingApiDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");
    const [editDraft, setEditDraft] = useState<WritingEditDraft | null>(null);
    const [selectingId, setSelectingId] = useState<number | null>(null);
    const [selectError, setSelectError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5266/Api/Writing/GetAll", { credentials: "include" })
            .then((res) => { if (!res.ok) throw new Error("Failed to load writing."); return res.json(); })
            .then((data: WritingApiDto[]) => {setWritings(data)
                console.log(writings);
            })
            .catch((err: unknown) => setFetchError(err instanceof Error ? err.message : "Failed to load writing."))
            .finally(() => setLoading(false));
            
    }, []);

    async function handleSelect(w: WritingApiDto) {
        setSelectingId(w.writingId);
        setSelectError("");
        try {
            const res = await fetch(`http://localhost:5266/Api/Writing/Get/${w.writingId}`, { credentials: "include" });
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const dto: WritingApiDto = await res.json();
            console.log(dto);
            setEditDraft({ ...apiDtoToWritingDraft(dto), id: dto.writingId });
            
            
        } catch (err: unknown) {
            console.warn("GetById failed, falling back to list data:", err);
            setEditDraft({ ...apiDtoToWritingDraft(w), id: w.writingId });
        } finally {
            setSelectingId(null);
        }
    }

    if (editDraft) {
        return (
            <WritingEditForm
                draft={editDraft}
                setDraft={setEditDraft as React.Dispatch<React.SetStateAction<WritingEditDraft>>}
                onBack={() => setEditDraft(null)}
            />
        );
    }

    return (
        <WritingListView
            writings={writings}
            setWritings={setWritings}
            loading={loading}
            fetchError={fetchError}
            selectingId={selectingId}
            selectError={selectError}
            onSelect={handleSelect}
            onBack={onBack}
        />
    );
}
