import { ComicApiDto } from "@/app/lib/types/comic";

export default function ComicDetailsTab({ comic }: { comic: ComicApiDto }) {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--cms-comics-panel-text, var(--cms-tab-panel-text, #f5f5f5))" }}>
                Comic Details
            </h2>
            <div className="flex flex-col gap-2">
                <div>
                    <p style={{ color: "var(--cms-comics-panel-text, var(--cms-tab-panel-text, #f5f5f5))" }}>
                        Status: {comic.details.status}
                    </p>
                    <hr style={{ borderColor: "var(--cms-comics-panel-accent, var(--cms-tab-panel-border, #b5cbb7))" }} />
                </div>
                <div>
                    <p style={{ color: "var(--cms-comics-panel-text, var(--cms-tab-panel-text, #f5f5f5))" }}>
                        Year: {comic.details.year}
                    </p>
                    <hr style={{ borderColor: "var(--cms-comics-panel-accent, var(--cms-tab-panel-border, #b5cbb7))" }} />
                </div>
                <div>
                    <p style={{ color: "var(--cms-comics-panel-text, var(--cms-tab-panel-text, #f5f5f5))" }}>
                        Original Language: {comic.details.originalLanguage}
                    </p>
                    <hr style={{ borderColor: "var(--cms-comics-panel-accent, var(--cms-tab-panel-border, #b5cbb7))" }} />
                </div>
                <div>
                    <p style={{ color: "var(--cms-comics-panel-text, var(--cms-tab-panel-text, #f5f5f5))" }}>
                        Content Rating: {comic.details.contentRating}
                    </p>
                    <hr style={{ borderColor: "var(--cms-comics-panel-accent, var(--cms-tab-panel-border, #b5cbb7))" }} />
                </div>
            </div>
        </section>
    );
}
