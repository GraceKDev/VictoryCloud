import { ArtApiDto } from "@/app/lib/types/art";
import { getSafeImageSrc } from "@/app/lib/utils/image";

type ArtModalProps = ArtApiDto & { onClose: () => void };

export default function ArtModal(props: ArtModalProps) {
    const safeImageUrl = getSafeImageSrc(props.imageUrl);
    return (
        <div onClick={props.onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-7xl rounded-2xl shadow-2xl border overflow-hidden"
                style={{
                    backgroundColor: "var(--cms-art-modal-bg)",
                    borderColor: "var(--cms-art-modal-border)",
                }}
            >
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-4">
                    <div className="w-full lg:w-3/5">
                        <img
                            src={safeImageUrl}
                            alt={props.title}
                            className="w-full aspect-[4/3] lg:aspect-square object-cover"
                        />
                    </div>
                    <div className="flex min-h-full flex-col w-full lg:w-2/5 p-5 sm:p-6 lg:p-8">
                        <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: "var(--cms-art-modal-text)" }}>
                            {props.title}
                        </h1>
                        <hr className="my-4 border-current/20" style={{ color: "var(--cms-art-modal-border)" }} />
                        <p className="mb-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--cms-art-modal-text)" }}>
                            {props.description}
                        </p>
                        <div className="flex flex-col mt-auto">
                            <div className="flex mt-auto flex-wrap gap-2 mb-4">
                                {props.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 rounded-full text-xs sm:text-sm"
                                        style={{
                                            backgroundColor: "var(--cms-art-modal-tag-bg)",
                                            color: "var(--cms-art-modal-tag-text)",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {props.links.length > 0 && (
                                <>
                                    <hr className="border-current/20" style={{ color: "var(--cms-art-modal-border)" }} />
                                    <div className="mt-auto flex flex-col">
                                        <h2 className="text-lg sm:text-xl mt-4" style={{ color: "var(--cms-art-modal-text)" }}>
                                            Links
                                        </h2>
                                        {props.links.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link}
                                                className="hover:underline break-all"
                                                style={{ color: "var(--cms-art-modal-link)" }}
                                            >
                                                View on {link.includes('artstation') ? 'ArtStation' : 'Behance'}
                                            </a>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
