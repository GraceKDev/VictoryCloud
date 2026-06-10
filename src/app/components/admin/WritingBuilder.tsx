"use client";

import { useState } from "react";
import {
    type WritingDraft,
    type ContentBlockDraft,
    writingDraftToEmpty,
    WritingFormSidebar,
    WritingChapterPanel,
    uploadImage,
} from "./writingShared";

type Props = { onBack: () => void };

export default function WritingBuilder({ onBack }: Props) {
    const [draft, setDraft] = useState<WritingDraft>(writingDraftToEmpty);
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

    function addLink() {
        setDraft((d) => ({ ...d, links: [...d.links, ""] }));
    }

    function removeLink(i: number) {
        setDraft((d) => ({ ...d, links: d.links.filter((_, idx) => idx !== i) }));
    }

    function updateLink(i: number, v: string) {
        setDraft((d) => ({ ...d, links: d.links.map((l, idx) => (idx === i ? v : l)) }));
    }

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

    const anyUploading =
        draft.coverUploading ||
        draft.chapters.some((c) => c.writingContentBlock.some((b) => b.uploading));

    async function handleSave() {
        if (!draft.title.trim()) { setSaveStatus("error"); setSaveError("Title is required."); return; }
        if (draft.chapters.length === 0) { setSaveStatus("error"); setSaveError("Add at least one chapter."); return; }
        if (anyUploading) { setSaveStatus("error"); setSaveError("Wait for all uploads to finish."); return; }

        const payload = {
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
            console.log(payload);
            const res = await fetch("http://localhost:5266/Api/Writing/Create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setSaveStatus("success");
                setDraft(writingDraftToEmpty());
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
                    <h2 className="text-base font-semibold text-gray-800">New Writing</h2>
                </div>
                <div className="flex items-center gap-3">
                    {anyUploading && (
                        <span className="text-xs text-amber-600 animate-pulse">Uploading…</span>
                    )}
                    {saveStatus === "success" && (
                        <span className="text-xs text-green-600">Writing saved!</span>
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
                        {saving ? "Saving…" : "Save Writing"}
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
