"use client";

import { useEffect, useState } from "react";
import {
    type ArtDraft,
    type ArtApiDto,
    apiDtoToArtDraft,
    ArtFormSidebar,
    ArtImagePanel,
} from "./artShared";

type ArtEditDraft = ArtDraft & { id: number };

// ── List view ─────────────────────────────────────────────────────────────────

function ArtListView({
    arts,
    setArts,
    loading,
    fetchError,
    selectingId,
    selectError,
    onSelect,
    onBack,
}: {
    arts: ArtApiDto[];
    setArts: React.Dispatch<React.SetStateAction<ArtApiDto[]>>;
    loading: boolean;
    fetchError: string;
    selectingId: number | null;
    selectError: string;
    onSelect: (art: ArtApiDto) => void;
    onBack: () => void;
}) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    async function deleteArt(art: ArtApiDto) {
        if (!confirm(`Are you sure you want to delete "${art.title}"? This cannot be undone.`)) return;
        setDeletingId(art.artId);
        try {
            const res = await fetch(`${process.env.BACKEND_URL_DEV}/Api/Art/Delete/${art.artId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                const err = await res.json().catch(() => null);
                alert(`Failed to delete: ${err?.message ?? "Server error"}`);
                return;
            }
            setArts((a) => a.filter((item) => item.artId !== art.artId));
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
                <h2 className="text-base font-semibold text-gray-800">Edit Art</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {loading && <p className="text-sm text-gray-400">Loading art…</p>}
                {fetchError && <p className="text-sm text-red-500">{fetchError}</p>}
                {selectError && <p className="text-sm text-red-500 mb-3">{selectError}</p>}
                {!loading && !fetchError && arts.length === 0 && (
                    <p className="text-sm text-gray-400">No art found.</p>
                )}
                {!loading && arts.length > 0 && (
                    <div className="flex flex-col gap-3">
                        {arts.map((art) => (
                            <div
                                key={art.artId}
                                className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-4"
                            >
                                {art.imageUrl ? (
                                    <img
                                        src={art.imageUrl}
                                        alt={art.title}
                                        className="w-14 h-14 object-cover rounded border border-gray-200 shrink-0"
                                    />
                                ) : (
                                    <div className="w-14 h-14 bg-gray-100 rounded border border-gray-200 shrink-0 flex items-center justify-center">
                                        <span className="text-gray-300 text-xs">No img</span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{art.title}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {(art.tags ?? []).join(", ") || "No tags"}
                                    </p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => onSelect(art)}
                                        disabled={selectingId !== null || deletingId !== null}
                                        className="py-1.5 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
                                    >
                                        {selectingId === art.artId ? "Loading…" : "Edit"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => deleteArt(art)}
                                        disabled={selectingId !== null || deletingId !== null}
                                        className="py-1.5 px-4 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
                                    >
                                        {deletingId === art.artId ? "Deleting…" : "Delete"}
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


function ArtEditForm({
    draft,
    setDraft,
    onBack,
}: {
    draft: ArtEditDraft;
    setDraft: React.Dispatch<React.SetStateAction<ArtEditDraft>>;
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
            id: draft.id,
            title: draft.title,
            description: draft.description,
            imageUrl: draft.imageUrl,
            tags: parsedTags,
            links: draft.links.filter((l) => l.trim()),
            uploadedAt: draft.uploadedAt,
            updatedAt: new Date().toISOString(),
        };

        setSaving(true);
        setSaveStatus("idle");
        try {
            const res = await fetch(`${process.env.BACKEND_URL_DEV}/Api/Art/Update/${payload.id}`, {
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
                        ← Art
                    </button>
                    <span className="text-gray-300">|</span>
                    <h2 className="text-base font-semibold text-gray-800 truncate max-w-xs">
                        {draft.title || "Edit Art"}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    {draft.uploading && (
                        <span className="text-xs text-amber-600 animate-pulse">Uploading image…</span>
                    )}
                    {saveStatus === "success" && (
                        <span className="text-xs text-green-600">Art updated!</span>
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
                        {saving ? "Saving…" : "Save Changes"}
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

// ── Top-level controller ──────────────────────────────────────────────────────

type Props = { onBack: () => void };

export default function ArtEditBuilder({ onBack }: Props) {
    const [arts, setArts] = useState<ArtApiDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState("");
    const [editDraft, setEditDraft] = useState<ArtEditDraft | null>(null);
    const [selectingId, setSelectingId] = useState<number | null>(null);
    const [selectError, setSelectError] = useState("");

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL_DEV}/Api/Art/GetAll`, { credentials: "include" })
            .then((res) => { if (!res.ok) throw new Error("Failed to load art."); return res.json(); })
            .then((data: ArtApiDto[]) => setArts(data))
            .catch((err: unknown) => setFetchError(err instanceof Error ? err.message : "Failed to load art."))
            .finally(() => setLoading(false));
            console.log("Fetched art:", arts);
    }, []);

    async function handleSelect(art: ArtApiDto) {
        setSelectingId(art.artId);
        setSelectError("");
        try {
            const res = await fetch(`${process.env.BACKEND_URL_DEV}/Api/Art/Get/${art.artId}`, { credentials: "include" });
            if (!res.ok) throw new Error(`Server returned ${res.status}`);
            const dto: ArtApiDto = await res.json();
            setEditDraft({ ...apiDtoToArtDraft(dto), id: dto.artId });
        } catch (err: unknown) {
            console.warn("GetById failed, falling back to list data:", err);
            setEditDraft({ ...apiDtoToArtDraft(art), id: art.artId });
        } finally {
            setSelectingId(null);
        }
    }

    if (editDraft) {
        return (
            <ArtEditForm
                draft={editDraft}
                setDraft={setEditDraft as React.Dispatch<React.SetStateAction<ArtEditDraft>>}
                onBack={() => setEditDraft(null)}
            />
        );
    }

    return (
        <ArtListView
            arts={arts}
            setArts={setArts}
            loading={loading}
            fetchError={fetchError}
            selectingId={selectingId}
            selectError={selectError}
            onSelect={handleSelect}
            onBack={onBack}
        />
    );
}
