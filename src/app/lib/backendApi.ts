const BACKEND_BASE_URL = "http://localhost:5266";

export async function backendGet<T>(path: string, fallbackError?: string): Promise<T> {
    const res = await fetch(`${BACKEND_BASE_URL}${path}`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(fallbackError ?? `Request failed: ${res.status}`);
    }

    return res.json() as Promise<T>;
}
