"use client";
import { useEffect } from "react";

function applyVars(vars: Record<string, string>) {
    const r = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
        if (value) r.style.setProperty(key, value);
    });
}

export default function ConfigVarSetter() {

    useEffect(() => {
        const handler = (event: MessageEvent) => {
            if (event.data?.type !== "CMS_VARS") return;
            applyVars(event.data.vars as Record<string, string>);
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, []);

    useEffect(() => {
        fetch("http://localhost:5266/Api/Config/GetConfig", { credentials: "include" })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                if (!data) return;
                const r = document.documentElement;
                const { home, art, comics, writing, commissions, filter } = data;
                applyVars({
                    "--cms-about-bg": home?.aboutBackgroundColour,
                    "--cms-about-heading": home?.aboutHeadingTextColour,
                    "--cms-about-body": home?.aboutParagraphTextColour,
                    "--cms-about-card-bg": home?.aboutCardsBackgroundColour,
                    "--cms-news-bg": home?.latestNewsBackgroundColour,
                    "--cms-news-heading": home?.latestNewsHeadingTextColour,
                    "--cms-news-body": home?.latestNewsParagraphTextColour,
                    "--cms-news-card-bg": home?.latestNewsCardsBackgroundColour,
                    "--cms-socials-bg": home?.connectWithUsBackgroundColour,
                    "--cms-socials-heading": home?.connectWithUsTextColour,
                    "--cms-socials-body": home?.connectWithUsParagraphTextColour,
                    "--cms-art-bg": art?.headingBackgroundColour,
                    "--cms-art-heading": art?.headingTextColour,
                    "--cms-art-body": art?.paragraphTextColour,
                    "--cms-art-modal-bg": art?.modalBackgroundColour,
                    "--cms-art-modal-text": art?.modalTextColour,
                    "--cms-art-modal-border": art?.modalBorderColour,
                    "--cms-art-modal-tag-bg": art?.modalTagBackgroundColour,
                    "--cms-art-modal-tag-text": art?.modalTagTextColour,
                    "--cms-art-modal-link": art?.modalLinkColour,
                    "--cms-comics-bg": comics?.headingBackgroundColour,
                    "--cms-comics-heading": comics?.headingTextColour,
                    "--cms-comics-body": comics?.paragraphTextColour,
                    "--cms-writing-bg": writing?.headingBackgroundColour,
                    "--cms-writing-heading": writing?.headingTextColour,
                    "--cms-writing-body": writing?.paragraphTextColour,
                    "--cms-commissions-button": commissions?.buttonColor,
                    "--cms-commissions-bg": commissions?.backgroundColor,
                    "--cms-filter-count-text": filter?.filterCountTextColour,
                    "--cms-filter-text": filter?.filterTextColour,
                    "--cms-filter-input-bg": filter?.filterInputBackgroundColour,
                    "--cms-filter-select-bg": filter?.filterSelectBackgroundColour,
                });
            })
            .catch(() => { /* silently fall back to CSS defaults */ });
    }, []);

    return null;
}
