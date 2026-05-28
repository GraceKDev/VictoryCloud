"use client";

export const dynamic = "force-dynamic";
import { useEffect, useReducer, useRef, useState } from "react";
import { Config, Action } from "../components/admin/types";
import HomeEditor from "../components/admin/editors/HomeEditor";
import ArtEditor from "../components/admin/editors/ArtEditor";
import ComicsEditor from "../components/admin/editors/ComicsEditor";
import WritingEditor from "../components/admin/editors/WritingEditor";
import CommissionsEditor from "../components/admin/editors/CommissionsEditor";

type Page = "home" | "art" | "comics" | "writing" | "commissions";

const PAGE_URLS: Record<Page, string> = {
    home: "/",
    art: "/art",
    comics: "/comics",
    writing: "/writing",
    commissions: "/commissions",
};

const pages: { value: Page; label: string }[] = [
    { value: "home", label: "Home" },
    { value: "art", label: "Art" },
    { value: "comics", label: "Comics" },
    { value: "writing", label: "Writing" },
    { value: "commissions", label: "Commissions" },
];

const defaultConfig: Config = {
    home: {
        aboutBackground: "",
        aboutBody: "",
        cards: [
            { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg" },
            { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg" },
            { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg" },
        ],
        newsHeading: "Latest News",
        newsBody: "",
        socialsHeading: "Connect with Us",
        socialsBody: "",
    },
    art: { heading: "Art" },
    comics: { heading: "Comics" },
    writing: { heading: "Writing", subheading: "" },
    commissions: {
        formHeading: "Commission Request Form",
        buttonColor: "#3b82f6",
        socials: [
            { label: "X / Twitter", url: "https://twitter.com/yourhandle", color: "#493DAF" },
            { label: "Instagram", url: "https://instagram.com/yourhandle", color: "#E1306C" },
            { label: "LinkedIn", url: "https://linkedin.com/in/yourhandle", color: "#0077B5" },
        ],
    },
};

function reducer(state: Config, action: Action): Config {
    switch (action.type) {
        case "LOAD_CONFIG":
            return action.payload;
        case "UPDATE_HOME":
            return { ...state, home: { ...state.home, [action.field]: action.value } };
        case "UPDATE_HOME_CARD": {
            const cards = state.home.cards.map((c, i) =>
                i === action.index ? { ...c, [action.field]: action.value } : c
            );
            return { ...state, home: { ...state.home, cards } };
        }
        case "UPDATE_ART":
            return { ...state, art: { ...state.art, [action.field]: action.value } };
        case "UPDATE_COMICS":
            return { ...state, comics: { ...state.comics, [action.field]: action.value } };
        case "UPDATE_WRITING":
            return { ...state, writing: { ...state.writing, [action.field]: action.value } };
        case "UPDATE_COMMISSIONS":
            return { ...state, commissions: { ...state.commissions, [action.field]: action.value } };
        case "UPDATE_COMMISSIONS_SOCIAL": {
            const socials = state.commissions.socials.map((s, i) =>
                i === action.index ? { ...s, [action.field]: action.value } : s
            );
            return { ...state, commissions: { ...state.commissions, socials } };
        }
        default:
            return state;
    }
}

export default function AdminDashboard() {
    const [selectedPage, setSelectedPage] = useState<Page>("home");
    const [config, dispatch] = useReducer(reducer, defaultConfig);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        fetch("http://localhost:5266/Api/Admin/Config", { credentials: "include" })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => { if (data) dispatch({ type: "LOAD_CONFIG", payload: data }); })
            .catch(() => {});
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSaveStatus("idle");
        try {
            const res = await fetch("http://localhost:5266/Api/Admin/Config", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(config),
            });
            if (res.ok) {
                setSaveStatus("success");
                iframeRef.current?.contentWindow?.location.reload();
            } else {
                setSaveStatus("error");
            }
        } catch {
            setSaveStatus("error");
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="flex flex-1 overflow-hidden bg-gray-50" style={{ height: "calc(100vh - 64px)" }}>

            <aside className="w-96 shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">

                <div className="p-6 border-b border-gray-100 shrink-0">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Control Panel</h2>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Edit Page</label>
                    <select
                        value={selectedPage}
                        onChange={(e) => setSelectedPage(e.target.value as Page)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {pages.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {selectedPage === "home" && <HomeEditor config={config.home} dispatch={dispatch} />}
                    {selectedPage === "art" && <ArtEditor config={config.art} dispatch={dispatch} />}
                    {selectedPage === "comics" && <ComicsEditor config={config.comics} dispatch={dispatch} />}
                    {selectedPage === "writing" && <WritingEditor config={config.writing} dispatch={dispatch} />}
                    {selectedPage === "commissions" && <CommissionsEditor config={config.commissions} dispatch={dispatch} />}
                </div>

                <div className="p-6 border-t border-gray-100 shrink-0 flex flex-col gap-2">
                    {saveStatus === "success" && <p className="text-sm text-green-600 text-center">Saved. Preview refreshed.</p>}
                    {saveStatus === "error" && <p className="text-sm text-red-600 text-center">Save failed. Try again.</p>}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md disabled:opacity-50 transition-colors"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </aside>

            <section className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shrink-0">
                    <p className="text-sm text-gray-500">
                        Previewing: <span className="font-semibold text-gray-800">{pages.find((p) => p.value === selectedPage)?.label}</span>
                    </p>
                    <button
                        onClick={() => iframeRef.current?.contentWindow?.location.reload()}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Refresh Preview
                    </button>
                </div>
                <iframe
                    ref={iframeRef}
                    src={PAGE_URLS[selectedPage]}
                    key={selectedPage}
                    title="Page Preview"
                    className="flex-1 w-full border-none bg-white"
                />
            </section>

        </main>
    );
}