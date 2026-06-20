const FALLBACK_IMAGE_SRC = "/images/HomeCarousel/placeholder1.jpg";

export function getSafeImageSrc(value?: string | null) {
    const imageSrc = value?.trim();

    if (!imageSrc) return FALLBACK_IMAGE_SRC;

    const wrappedMatch = imageSrc.match(/^\[(.+)\]\((.+)\)$/);
    const unwrappedSrc = wrappedMatch?.[2]?.trim() ?? imageSrc;

    if (unwrappedSrc.startsWith("/")) return unwrappedSrc;

    try {
        return new URL(unwrappedSrc).toString();
    } catch {
        return FALLBACK_IMAGE_SRC;
    }
}

export function hasUsableImageSrc(value?: string | null) {
    const imageSrc = value?.trim();
    return Boolean(imageSrc);
}
