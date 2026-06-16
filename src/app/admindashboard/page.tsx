"use client";

export const dynamic = "force-dynamic";
import { useEffect, useReducer, useRef, useState } from "react";
import { Config, Action } from "../components/admin/types";
import HomeEditor from "../components/admin/editors/HomeEditor";
import ArtEditor from "../components/admin/editors/ArtEditor";
import ComicsEditor from "../components/admin/editors/ComicsEditor";
import WritingEditor from "../components/admin/editors/WritingEditor";
import CommissionsEditor from "../components/admin/editors/CommissionsEditor";
import ComicBuilder from "../components/admin/ComicBuilder";
import ComicEditBuilder from "../components/admin/ComicEditBuilder";
import ArtBuilder from "../components/admin/ArtBuilder";
import ArtEditBuilder from "../components/admin/ArtEditBuilder";
import WritingBuilder from "../components/admin/WritingBuilder";
import WritingEditBuilder from "../components/admin/WritingEditBuilder";
import ImageManager from "../components/image/ImageManager";

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

export interface CardConfig {
    title: string;
    description: string;
    imageUrl: string;
}

const defaultConfig: Config = {
    home: {
        aboutHeadingTextColour: "#121619",
        aboutBackgroundColour: "#b5cbb7",
        aboutParagraphTextColour: "#121619",
        latestNewsBackgroundColour: "#121619",
        latestNewsHeadingTextColour: "#f5f5f5",
        latestNewsParagraphTextColour: "#f5f5f5",
        connectWithUsTextColour: "#121619",
        connectWithUsBackgroundColour: "#b5cbb7",
        connectWithUsParagraphTextColour: "#121619",
        aboutCards: [
            { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg", imageLink: "" },
            { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg", imageLink: "" },
            { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg", imageLink: "" },
        ],
        latestNewsCards: [
            { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg",imageLink: "" },
            { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg",imageLink: "" },
            { title: "Card Title", description: "", imageUrl: "/images/HomeCarousel/placeholder1.jpg",imageLink:"" },
        ],
        aboutCardsBackgroundColour: "#121619",
        latestNewsCardsBackgroundColour: "#2d4739",
    },
    art: {
        headingTextColour: "#f5f5f5",
        headingBackgroundColour: "#121619",
        paragraphTextColour: "#f5f5f5",
        modalBackgroundColour: "#121619",
        modalTextColour: "#f5f5f5",
        modalBorderColour: "#b5cbb7",
        modalTagBackgroundColour: "#2d4739",
        modalTagTextColour: "#f5f5f5",
        modalLinkColour: "#b5cbb7",

    },
    comics: {
        headingTextColour: "#f5f5f5",
        headingBackgroundColour: "#121619",
        paragraphTextColour: "#f5f5f5",
        tabActiveBackgroundColour: "#121619",
        tabInactiveBackgroundColour: "#2d4739",
        tabTextColour: "#f5f5f5",
        tabPanelBackgroundColour: "#121619",
        tabPanelBorderColour: "#b5cbb7",
        tabPanelTextColour: "#f5f5f5",
        cardBackgroundColour: "#121619",
        cardBorderColour: "#b5cbb7",
        tagBackgroundColour: "#2d4739",
        tagTextColour: "#f5f5f5",
        panelBackgroundColour: "#121619",
        panelAccentColour: "#b5cbb7",
        panelTextColour: "#f5f5f5",
    },
    writing: {
        headingTextColour: "#f5f5f5",
        headingBackgroundColour: "#121619",
        paragraphTextColour: "#f5f5f5",
        tabActiveBackgroundColour: "#121619",
        tabInactiveBackgroundColour: "#2d4739",
        tabTextColour: "#f5f5f5",
        tabPanelBackgroundColour: "#121619",
        tabPanelBorderColour: "#b5cbb7",
        tabPanelTextColour: "#f5f5f5",
        cardBackgroundColour: "#121619",
        cardBorderColour: "#b5cbb7",
        tagBackgroundColour: "#2d4739",
        tagTextColour: "#f5f5f5",
        panelBackgroundColour: "#121619",
        panelAccentColour: "#b5cbb7",
        panelTextColour: "#f5f5f5",
    },
    commissions: {
        formHeading: "Commission Request Form",
        buttonColor: "#121619",
        backgroundColor: "#ffffff",
        socials: [
            { label: "X / Twitter", url: "https://twitter.com/yourhandle", color: "#493DAF" },
            { label: "Instagram", url: "https://instagram.com/yourhandle", color: "#E1306C" },
            { label: "LinkedIn", url: "https://linkedin.com/in/yourhandle", color: "#0077B5" },
        ],
    },
    filter: {
        filterCountTextColour: "#f5f5f5",
        filterTextColour: "#f5f5f5",
        filterInputBackgroundColour: "#2d4739",
        filterSelectBackgroundColour: "#2d4739",
    },
};

function reducer(state: Config, action: Action): Config {
    switch (action.type) {
        case "LOAD_CONFIG": {
            const loaded = action.payload;
            return {
                home: { ...defaultConfig.home, ...loaded.home },
                art: { ...defaultConfig.art, ...loaded.art },
                comics: { ...defaultConfig.comics, ...loaded.comics },
                writing: { ...defaultConfig.writing, ...loaded.writing },
                commissions: { ...defaultConfig.commissions, ...loaded.commissions },
                filter: { ...defaultConfig.filter, ...loaded.filter },
            };
        }
        case "UPDATE_HOME":
            return { ...state, home: { ...state.home, [action.field]: action.value } };
        case "UPDATE_HOME_ABOUT_CARD": {
            const aboutCards = state.home.aboutCards.map((c, i) =>
                i === action.index ? { ...c, [action.field]: action.value } : c
            );
            return { ...state, home: { ...state.home, aboutCards } };
        }
        case "UPDATE_HOME_LATEST_NEWS_CARD": {
            const latestNewsCards = state.home.latestNewsCards.map((c, i) =>
                i === action.index ? { ...c, [action.field]: action.value } : c
            );
            return { ...state, home: { ...state.home, latestNewsCards } };
        }
        case "UPDATE_ART_UPLOAD":
            return { ...state, art: { ...state.art, [action.field]: action.value } };
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
    const [comicBuilderMode, setComicBuilderMode] = useState(false);
    const [comicEditMode, setComicEditMode] = useState(false);
    const [artBuilderMode, setArtBuilderMode] = useState(false);
    const [artEditMode, setArtEditMode] = useState(false);
    const [writingBuilderMode, setWritingBuilderMode] = useState(false);
    const [writingEditMode, setWritingEditMode] = useState(false);
    const [config, dispatch] = useReducer(reducer, defaultConfig);
    const [saving, setSaving] = useState(false);
    const [manageImagesMode, setManageImagesMode] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const iframeRef = useRef<HTMLIFrameElement>(null);


    useEffect(() => {
        const vars: Record<string, string> = {
            "--cms-about-bg": config.home.aboutBackgroundColour,
            "--cms-about-heading": config.home.aboutHeadingTextColour,
            "--cms-about-body": config.home.aboutParagraphTextColour,
            "--cms-about-card-bg": config.home.aboutCardsBackgroundColour,
            "--cms-news-bg": config.home.latestNewsBackgroundColour,
            "--cms-news-heading": config.home.latestNewsHeadingTextColour,
            "--cms-news-body": config.home.latestNewsParagraphTextColour,
            "--cms-news-card-bg": config.home.latestNewsCardsBackgroundColour,
            "--cms-socials-bg": config.home.connectWithUsBackgroundColour,
            "--cms-socials-heading": config.home.connectWithUsTextColour,
            "--cms-socials-body": config.home.connectWithUsParagraphTextColour,
            "--cms-art-bg": config.art.headingBackgroundColour,
            "--cms-art-heading": config.art.headingTextColour,
            "--cms-art-body": config.art.paragraphTextColour,
            "--cms-art-modal-bg": config.art.modalBackgroundColour,
            "--cms-art-modal-text": config.art.modalTextColour,
            "--cms-art-modal-border": config.art.modalBorderColour,
            "--cms-art-modal-tag-bg": config.art.modalTagBackgroundColour,
            "--cms-art-modal-tag-text": config.art.modalTagTextColour,
            "--cms-art-modal-link": config.art.modalLinkColour,
            "--cms-comics-bg": config.comics.headingBackgroundColour,
            "--cms-comics-heading": config.comics.headingTextColour,
            "--cms-comics-body": config.comics.paragraphTextColour,
            "--cms-tab-active-bg": config.comics.tabActiveBackgroundColour,
            "--cms-tab-inactive-bg": config.comics.tabInactiveBackgroundColour,
            "--cms-tab-text": config.comics.tabTextColour,
            "--cms-tab-panel-bg": config.comics.tabPanelBackgroundColour,
            "--cms-tab-panel-border": config.comics.tabPanelBorderColour,
            "--cms-tab-panel-text": config.comics.tabPanelTextColour,
            "--cms-comics-card-bg": config.comics.cardBackgroundColour,
            "--cms-comics-card-border": config.comics.cardBorderColour,
            "--cms-comics-tag-bg": config.comics.tagBackgroundColour,
            "--cms-comics-tag-text": config.comics.tagTextColour,
            "--cms-comics-panel-bg": config.comics.panelBackgroundColour,
            "--cms-comics-panel-accent": config.comics.panelAccentColour,
            "--cms-comics-panel-text": config.comics.panelTextColour,
            "--cms-writing-bg": config.writing.headingBackgroundColour,
            "--cms-writing-heading": config.writing.headingTextColour,
            "--cms-writing-body": config.writing.paragraphTextColour,
            "--cms-tab-active-bg": config.writing.tabActiveBackgroundColour,
            "--cms-tab-inactive-bg": config.writing.tabInactiveBackgroundColour,
            "--cms-tab-text": config.writing.tabTextColour,
            "--cms-tab-panel-bg": config.writing.tabPanelBackgroundColour,
            "--cms-tab-panel-border": config.writing.tabPanelBorderColour,
            "--cms-tab-panel-text": config.writing.tabPanelTextColour,
            "--cms-writing-card-bg": config.writing.cardBackgroundColour,
            "--cms-writing-card-border": config.writing.cardBorderColour,
            "--cms-writing-tag-bg": config.writing.tagBackgroundColour,
            "--cms-writing-tag-text": config.writing.tagTextColour,
            "--cms-writing-panel-bg": config.writing.panelBackgroundColour,
            "--cms-writing-panel-accent": config.writing.panelAccentColour,
            "--cms-writing-panel-text": config.writing.panelTextColour,
            "--cms-commissions-button": config.commissions.buttonColor,
            "--cms-commissions-bg": config.commissions.backgroundColor,
            "--cms-filter-count-text": config.filter.filterCountTextColour,
            "--cms-filter-text": config.filter.filterTextColour,
            "--cms-filter-input-bg": config.filter.filterInputBackgroundColour,
            "--cms-filter-select-bg": config.filter.filterSelectBackgroundColour,
        };
        iframeRef.current?.contentWindow?.postMessage({ type: "CMS_VARS", vars }, window.location.origin);
    }, [config]);

    useEffect(() => {
        fetch("http://localhost:5266/Api/Config/GetConfig", { credentials: "include" })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (data) {
                    dispatch({ type: "LOAD_CONFIG", payload: data });
                }
            })
            .catch(() => { console.log("Failed to load config, using defaults."); });

    }, []);


    const manageImageButtonHandler = () => {
        setManageImagesMode(true);
    }
    const handleSave = async () => {
        setSaving(true);
        setSaveStatus("idle");
        try {
            const flatConfig: Record<string, string> = {
                home: JSON.stringify(config.home),
                art: JSON.stringify(config.art),
                comics: JSON.stringify(config.comics),
                writing: JSON.stringify(config.writing),
                commissions: JSON.stringify(config.commissions),
                filter: JSON.stringify(config.filter),
            };
            const res = await fetch("http://localhost:5266/Api/Config/UpdateConfig", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(flatConfig),
            });
            if (res.ok) {
                setSaveStatus("success");
                iframeRef.current?.contentWindow?.location.reload();
            } else {
                const errorData = await res.json().catch(() => null);
                console.error("Save failed:", errorData);
                setSaveStatus("error");
            }
        } catch (e) {
            console.error("Save error:", e);
            setSaveStatus("error");
        } finally {
            setSaving(false);
        }
    };
    const rightPanelContent = () => {
        if (manageImagesMode) {
            return <ImageManager onBack={() => setManageImagesMode(false)} />;
        }
        if (comicBuilderMode) {
            return <ComicBuilder onBack={() => setComicBuilderMode(false)} />;
        }
        if (comicEditMode) {
            return <ComicEditBuilder onBack={() => setComicEditMode(false)} />;
        }
        if (artBuilderMode) {
            return <ArtBuilder onBack={() => setArtBuilderMode(false)} />;
        }
        if (artEditMode) {
            return <ArtEditBuilder onBack={() => setArtEditMode(false)} />;
        }
        if (writingBuilderMode) {
            return <WritingBuilder onBack={() => setWritingBuilderMode(false)} />;
        }
        if (writingEditMode) {
            return <WritingEditBuilder onBack={() => setWritingEditMode(false)} />;
        }
        else {
            return (
                <>
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
            </>
            )
        }
    }
    return (
        <main className="flex flex-1 overflow-hidden bg-gray-50" style={{ height: "calc(100vh - 64px)" }}>
            <aside className="w-96 shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-gray-100 shrink-0">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Control Panel</h2>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Edit Page</label>
                    <select
                        value={selectedPage}
                        onChange={(e) => {
                            setSelectedPage(e.target.value as Page);
                            setComicBuilderMode(false);
                            setComicEditMode(false);
                            setArtBuilderMode(false);
                            setArtEditMode(false);
                            setWritingBuilderMode(false);
                            setWritingEditMode(false);
                        }}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {pages.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    {selectedPage === "home" && <HomeEditor config={config.home} dispatch={dispatch} />}
                    {selectedPage === "art" && <ArtEditor config={config.art} filterConfig={config.filter} dispatch={dispatch} onNewArt={() => setArtBuilderMode(true)} onEditArt={() => setArtEditMode(true)} />}
                    {selectedPage === "comics" && <ComicsEditor config={config.comics} dispatch={dispatch} onNewComic={() => setComicBuilderMode(true)} onEditComic={() => setComicEditMode(true)} />}
                    {selectedPage === "writing" && <WritingEditor config={config.writing} dispatch={dispatch} onNewWriting={() => setWritingBuilderMode(true)} onEditWriting={() => setWritingEditMode(true)} />}
                    {selectedPage === "commissions" && <CommissionsEditor config={config.commissions} dispatch={dispatch} />}

                </div>
                <div className="p-6 border-t border-gray-100 shrink-0 flex flex-col gap-2">
                    <button
                        onClick={manageImageButtonHandler}
                        className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                        Manage Images
                    </button>
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
                {rightPanelContent()}
            </section>

        </main>
    );
}
