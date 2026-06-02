"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface S3Image {
    key: string;
    url: string;
    size: number;
    lastModified: string | null;
}

function formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImageManager({ onBack }: { onBack?: () => void }) {
    const [images, setImages] = useState<S3Image[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/images");
            if (!res.ok) throw new Error("Failed to fetch images");
            const data = await res.json();
            setImages(data.images ?? []);
        } catch {
            setError("Could not load images from S3.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setUploading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            for (const file of Array.from(files)) {
                // 1. Get presigned URL
                const presignRes = await fetch("/api/images/upload", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ filename: file.name, contentType: file.type }),
                });
                if (!presignRes.ok) {
                    const err = await presignRes.json().catch(() => ({}));
                    throw new Error(err.error ?? "Failed to get upload URL");
                }
                const { url } = await presignRes.json();

                // 2. PUT directly to S3
                const uploadRes = await fetch(url, {
                    method: "PUT",
                    headers: { "Content-Type": file.type },
                    body: file,
                });
                if (!uploadRes.ok) throw new Error("Upload to S3 failed");
            }
            setSuccessMsg(`${files.length} image(s) uploaded successfully.`);
            await fetchImages();
        } catch (e) {
            setError(e instanceof Error ? e.message : "Upload failed");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (key: string) => {
        if (!confirm(`Delete this image?\n${key}`)) return;
        setDeletingKey(key);
        setError(null);
        setSuccessMsg(null);
        try {
            const res = await fetch("/api/images", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error ?? "Delete failed");
            }
            setSuccessMsg("Image deleted.");
            setImages((prev) => prev.filter((img) => img.key !== key));
        } catch (e) {
            setError(e instanceof Error ? e.message : "Delete failed");
        } finally {
            setDeletingKey(null);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleUpload(e.dataTransfer.files);
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
      
            <div className="px-6 py-4 border-b border-gray-200 bg-white shrink-0 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">Image Manager</h2>
                <div className="flex items-center gap-3">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            ← Back
                        </button>
                    )}
                    <button
                        onClick={fetchImages}
                        disabled={loading}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-40"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {(error || successMsg) && (
                <div className={`px-6 py-2 text-sm shrink-0 ${error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                    {error ?? successMsg}
                </div>
            )}

     
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                className="mx-6 mt-4 mb-2 shrink-0 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm text-gray-500">
                    {uploading ? "Uploading…" : "Drop images here or click to browse"}
                </p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleUpload(e.target.files)}
                />
            </div>

        
            <div className="flex-1 overflow-y-auto px-6 pb-6">
                {loading ? (
                    <div className="flex items-center justify-center h-40 text-gray-400 text-sm">Loading…</div>
                ) : images.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-gray-400 text-sm">No images found in S3.</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                        {images.map((img) => (
                            <div key={img.key} className="group relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">
                                <div className="relative w-full aspect-square">
                                    <Image
                                        src={img.url}
                                        alt={img.key}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                    <p className="text-white text-xs text-center break-all leading-tight">
                                        {img.key.split("/").pop()}
                                    </p>
                                    <p className="text-gray-300 text-xs">{formatBytes(img.size)}</p>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(img.url)}
                                        className="px-3 py-1 bg-white text-gray-800 text-xs rounded hover:bg-gray-100 transition-colors"
                                    >
                                        Copy URL
                                    </button>
                                    <button
                                        onClick={() => handleDelete(img.key)}
                                        disabled={deletingKey === img.key}
                                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                                    >
                                        {deletingKey === img.key ? "Deleting…" : "Delete"}
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
