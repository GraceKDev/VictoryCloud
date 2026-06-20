import { Action, ComicsConfig } from "../types";
import FieldGroup from "../FieldGroup";

type Props = {
    config: ComicsConfig;
    dispatch: (action: Action) => void;
    onNewComic: () => void;
    onEditComic: () => void;
};

export default function ComicsEditor({ config, dispatch, onNewComic, onEditComic }: Props) {
    return (
        <div className="flex flex-col gap-6">
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Page</h3>
                <FieldGroup
                    label="Heading Text Colour"
                    type="color"
                    value={config.headingTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "headingTextColour", value: v })}
                />
                <FieldGroup
                    label="Heading Background Colour"
                    type="color"
                    value={config.headingBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "headingBackgroundColour", value: v })}
                />
                <FieldGroup
                    label="Paragraph Text Colour"
                    type="color"
                    value={config.paragraphTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "paragraphTextColour", value: v })}
                />
                <FieldGroup
                    label="Card Background Colour"
                    type="color"
                    value={config.cardBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "cardBackgroundColour", value: v })}
                />
                <FieldGroup
                    label="Card Border Colour"
                    type="color"
                    value={config.cardBorderColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "cardBorderColour", value: v })}
                />
                <FieldGroup
                    label="Tag Background Colour"
                    type="color"
                    value={config.tagBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "tagBackgroundColour", value: v })}
                />
                <FieldGroup
                    label="Tag Text Colour"
                    type="color"
                    value={config.tagTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "tagTextColour", value: v })}
                />
                <FieldGroup
                    label="Panel Background Colour"
                    type="color"
                    value={config.panelBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "panelBackgroundColour", value: v })}
                />
                <FieldGroup
                    label="Panel Accent Colour"
                    type="color"
                    value={config.panelAccentColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "panelAccentColour", value: v })}
                />
                <FieldGroup
                    label="Panel Text Colour"
                    type="color"
                    value={config.panelTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_COMICS", field: "panelTextColour", value: v })}
                />
            </section>

            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Content</h3>
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={onNewComic}
                        className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                        + New Comic
                    </button>
                    <button
                        type="button"
                        onClick={onEditComic}
                        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md border border-gray-300 transition-colors"
                    >
                        Edit Comic
                    </button>
                </div>
            </section>
        </div>
    );
}
