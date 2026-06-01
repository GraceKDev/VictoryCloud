import { Action, ComicsConfig } from "../types";
import FieldGroup from "../FieldGroup";

type Props = {
    config: ComicsConfig;
    dispatch: (action: Action) => void;
    onNewComic: () => void;
};

export default function ComicsEditor({ config, dispatch, onNewComic }: Props) {
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
            </section>

            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Content</h3>
                <button
                    type="button"
                    onClick={onNewComic}
                    className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                    + New Comic
                </button>
            </section>
        </div>
    );
}
