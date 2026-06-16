"use client";

import { useRef } from "react";
import { uploadImage, Field, TagChips, inputCls } from "./comicShared";
import { ArtApiDto } from "@/app/lib/types/art";

// Re-export shared utilities so consumers only need one import
export { uploadImage, Field, TagChips, inputCls };
export type { ArtApiDto };

// ── Types ─────────────────────────────────────────────────────────────────────

export type ArtDraft = {
    title: string;
    description: string;
    imageUrl: string;
    tags: string;
    links: string[];
    uploadedAt: string;
    updatedAt: string;
    uploading: boolean;
    uploadError: string | null;
};

export function artDraftToEmpty(): ArtDraft {
    return {
        title: "",
        description: "",
        imageUrl: "",
        tags: "",
        links: [],
        uploadedAt: "",
        updatedAt: "",
        uploading: false,
        uploadError: null,
    };
}

export function apiDtoToArtDraft(dto: ArtApiDto): ArtDraft {
    return {
        title: dto.title ?? "",
        description: dto.description ?? "",
        imageUrl: dto.imageUrl ?? "",
        tags: (dto.tags ?? []).join(", "),
        links: dto.links ?? [],
        uploadedAt: dto.uploadedAt ?? "",
        updatedAt: dto.updatedAt ?? "",
        uploading: false,
        uploadError: null,
    };
}

// ── ArtFormSidebar ────────────────────────────────────────────────────────────

type ArtFormSidebarProps = {
    draft: ArtDraft;
    tagInput: string;
    parsedTags: string[];
    onDraftChange: (updates: Partial<ArtDraft>) => void;
    onTagInputChange: (v: string) => void;
    onCommitTag: () => void;
    onRemoveTag: (i: number) => void;
    onAddLink: () => void;
    onRemoveLink: (i: number) => void;
    onLinkChange: (i: number, v: string) => void;
};

export function ArtFormSidebar({
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
}: ArtFormSidebarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleFileUpload(file: File) {
        onDraftChange({ uploading: true, uploadError: null });
        try {
            const url = await uploadImage(file);
            onDraftChange({ imageUrl: url, uploading: false });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Upload failed";
            onDraftChange({ uploading: false, uploadError: msg });
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
                            placeholder="Art title"
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
                <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase tracking-wide">Image</h3>
                <div className="flex flex-col gap-3">
                    <Field label="Image URL">
                        <input
                            type="url"
                            value={draft.imageUrl}
                            onChange={(e) => onDraftChange({ imageUrl: e.target.value })}
                            placeholder="https://…"
                            className={inputCls}
                        />
                    </Field>
                    <div className="text-xs text-gray-400 text-center">— or —</div>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={draft.uploading}
                        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 text-sm font-medium rounded-md border border-gray-300 transition-colors"
                    >
                        {draft.uploading ? "Uploading…" : "Upload Image File"}
                    </button>
                    {draft.uploadError && (
                        <p className="text-xs text-red-500">{draft.uploadError}</p>
                    )}
                    {draft.imageUrl && !draft.uploading && (
                        <img
                            src={draft.imageUrl}
                            alt="Preview"
                            className="mt-1 w-full max-h-48 object-contain rounded border border-gray-200"
                        />
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) { handleFileUpload(f); e.target.value = ""; }
                        }}
                    />
                </div>
            </section>
        </div>
    );
}

// ── ArtImagePanel ─────────────────────────────────────────────────────────────

export function ArtImagePanel({ imageUrl, uploading }: { imageUrl: string; uploading: boolean }) {
    return (
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Preview</h3>
            {uploading && (
                <div className="flex items-center gap-2 text-sm text-amber-600 animate-pulse">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Uploading image…
                </div>
            )}
            {imageUrl && !uploading ? (
                <div className="rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                    <img src={imageUrl} alt="Art preview" className="max-w-full max-h-[70vh] object-contain" />
                </div>
            ) : !uploading ? (
                <div className="rounded-lg border-2 border-dashed border-gray-200 h-64 flex items-center justify-center text-gray-300 text-sm">
                    No image selected
                </div>
            ) : null}
        </div>
    );
}
