"use client";

import { useState } from "react";
import {
    type ArtDraft,
    artDraftToEmpty,
    ArtFormSidebar,
    ArtImagePanel,
} from "./artShared";

type Props = { onBack: () => void };

export default function ArtBuilder({ onBack }: Props) {
    const [draft, setDraft] = useState<ArtDraft>(artDraftToEmpty);
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

    async function handleSave() {
        if (!draft.title.trim()) { setSaveStatus("error"); setSaveError("Title is required."); return; }
        if (!draft.imageUrl.trim()) { setSaveStatus("error"); setSaveError("An image is required."); return; }
        if (draft.uploading) { setSaveStatus("error"); setSaveError("Wait for the image to finish uploading."); return; }

        const payload = {
            title: draft.title,
            description: draft.description,
            imageUrl: draft.imageUrl,
            tags: parsedTags,
            links: draft.links.filter((l) => l.trim()),
            uploadedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setSaving(true);
        setSaveStatus("idle");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_DEV}/Api/Art/Create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setSaveStatus("success");
                setDraft(artDraftToEmpty());
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
                    <h2 className="text-base font-semibold text-gray-800">New Art</h2>
                </div>
                <div className="flex items-center gap-3">
                    {draft.uploading && (
                        <span className="text-xs text-amber-600 animate-pulse">Uploading image…</span>
                    )}
                    {saveStatus === "success" && (
                        <span className="text-xs text-green-600">Art saved!</span>
                    )}
                    {saveStatus === "error" && (
                        <span className="text-xs text-red-600">{saveError}</span>
                    )}
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving || draft.uploading}
                        className="py-1.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
                    >
                        {saving ? "Saving…" : "Save Art"}
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <ArtFormSidebar
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
                <ArtImagePanel imageUrl={draft.imageUrl} uploading={draft.uploading} />
            </div>
        </div>
    );
}
