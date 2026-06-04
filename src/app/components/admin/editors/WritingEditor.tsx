import { Action, WritingConfig } from "../types";
import FieldGroup from "../FieldGroup";

type Props = {
    config: WritingConfig;
    dispatch: (action: Action) => void;
    onNewWriting: () => void;
    onEditWriting: () => void;
};

export default function WritingEditor({ config, dispatch, onNewWriting, onEditWriting }: Props) {
    return (
        <div className="flex flex-col gap-6">
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Page</h3>
                <div className="flex flex-col gap-4">
                    <FieldGroup
                        label="Section Background Colour"
                        type="color"
                        value={config.headingBackgroundColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "headingBackgroundColour", value: v })}
                    />
                    <FieldGroup
                        label="Heading Text Colour"
                        type="color"
                        value={config.headingTextColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "headingTextColour", value: v })}
                    />
                    <FieldGroup
                        label="Paragraph Text Colour"
                        type="color"
                        value={config.paragraphTextColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "paragraphTextColour", value: v })}
                    />
                </div>
            </section>

            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Content</h3>
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={onNewWriting}
                        className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition-colors"
                    >
                        + New Writing
                    </button>
                    <button
                        type="button"
                        onClick={onEditWriting}
                        className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md border border-gray-300 transition-colors"
                    >
                        Edit / Delete Writing
                    </button>
                </div>
            </section>
        </div>
    );
}
