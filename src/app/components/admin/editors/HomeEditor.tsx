import { useState } from "react";
import { Action, HomeConfig } from "../types";
import FieldGroup from "../FieldGroup";

type Props = {
    config: HomeConfig;
    dispatch: (action: Action) => void;
};

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <section className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <span className="text-base font-semibold text-gray-800">{title}</span>
                <span className="text-gray-500 text-lg">{open ? "▲" : "▼"}</span>
            </button>
            {open && <div className="p-4 flex flex-col gap-4">{children}</div>}
        </section>
    );
}

export default function HomeEditor({ config, dispatch }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <Accordion title="About Section">
                <FieldGroup
                    label="Section Background Colour"
                    type="color"
                    value={config.aboutBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "aboutBackgroundColour", value: v })}
                />
                <FieldGroup
                    label="Heading Text Colour"
                    type="color"
                    value={config.aboutHeadingTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "aboutHeadingTextColour", value: v })}
                />
                <FieldGroup
                    label="Paragraph Text Colour"
                    type="color"
                    value={config.aboutParagraphTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "aboutParagraphTextColour", value: v })}
                />
                <hr className="border-gray-300" />
                <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Cards</h2>
                </div>
                {config.aboutCards.map((card, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 bg-gray-50">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Card {i + 1}</p>
                        <FieldGroup
                            label="Title"
                            value={card.title}
                            onChange={(v) => dispatch({ type: "UPDATE_HOME_ABOUT_CARD", index: i, field: "title", value: v })}
                        />
                        <FieldGroup
                            label="Description"
                            type="textarea"
                            value={card.description}
                            onChange={(v) => dispatch({ type: "UPDATE_HOME_ABOUT_CARD", index: i, field: "description", value: v })}
                        />
                        <FieldGroup
                            label="Image URL"
                            type="url"
                            value={card.imageUrl}
                            onChange={(v) => dispatch({ type: "UPDATE_HOME_ABOUT_CARD", index: i, field: "imageUrl", value: v })}
                        />
                    </div>
                ))}
                <FieldGroup
                    label="About Card Background Colour"
                    type="color"
                    value={config.aboutBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "aboutCardsBackgroundColour", value: v })}
                />
            </Accordion>

            <Accordion title="News Section">
                <FieldGroup
                    label="Section Background Colour"
                    type="color"
                    value={config.latestNewsBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "latestNewsBackgroundColour", value: v })}
                />
                <FieldGroup
                    label="Heading Text Colour"
                    type="color"
                    value={config.latestNewsHeadingTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "latestNewsHeadingTextColour", value: v })}
                />
                <FieldGroup
                    label="Paragraph Text Colour"
                    type="color"
                    value={config.latestNewsParagraphTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "latestNewsParagraphTextColour", value: v })}
                />
                <hr className="border-gray-300" />
                <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Cards</h2>
                </div>
                {config.latestNewsCards.map((card, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 bg-gray-50">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Card {i + 1}</p>
                        <FieldGroup
                            label="Title"
                            value={card.title}
                            onChange={(v) => dispatch({ type: "UPDATE_HOME_LATEST_NEWS_CARD", index: i, field: "title", value: v })}
                        />
                        <FieldGroup
                            label="Description"
                            type="textarea"
                            value={card.description}
                            onChange={(v) => dispatch({ type: "UPDATE_HOME_LATEST_NEWS_CARD", index: i, field: "description", value: v })}
                        />
                        <FieldGroup
                            label="Image URL"
                            type="url"
                            value={card.imageUrl}
                            onChange={(v) => dispatch({ type: "UPDATE_HOME_LATEST_NEWS_CARD", index: i, field: "imageUrl", value: v })}
                        />
                    </div>
                ))}
                <FieldGroup
                    label="News Card Background Colour"
                    type="color"
                    value={config.latestNewsCardsBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "latestNewsCardsBackgroundColour", value: v })}
                />
            </Accordion>

            <Accordion title="Socials Section">
                <FieldGroup
                    label="Section Background Colour"
                    type="color"
                    value={config.connectWithUsBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "connectWithUsBackgroundColour", value: v })}
                />
                <FieldGroup
                    label="Heading Text Colour"
                    type="color"
                    value={config.connectWithUsTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "connectWithUsTextColour", value: v })}
                />
                  <FieldGroup
                    label="Paragraph Text Colour"
                    type="color"
                    value={config.connectWithUsParagraphTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "connectWithUsParagraphTextColour", value: v })}
                />
                
            </Accordion>
        </div>
    );
}
