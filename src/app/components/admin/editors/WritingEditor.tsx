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
                    <FieldGroup
                        label="Tab Active Background Colour"
                        type="color"
                        value={config.tabActiveBackgroundColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "tabActiveBackgroundColour", value: v })}
                    />
                    <FieldGroup
                        label="Tab Inactive Background Colour"
                        type="color"
                        value={config.tabInactiveBackgroundColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "tabInactiveBackgroundColour", value: v })}
                    />
                    <FieldGroup
                        label="Tab Text Colour"
                        type="color"
                        value={config.tabTextColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "tabTextColour", value: v })}
                    />
                    <FieldGroup
                        label="Tab Panel Background Colour"
                        type="color"
                        value={config.tabPanelBackgroundColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "tabPanelBackgroundColour", value: v })}
                    />
                    <FieldGroup
                        label="Tab Panel Border Colour"
                        type="color"
                        value={config.tabPanelBorderColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "tabPanelBorderColour", value: v })}
                    />
                    <FieldGroup
                        label="Tab Panel Text Colour"
                        type="color"
                        value={config.tabPanelTextColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "tabPanelTextColour", value: v })}
                    />
                    <FieldGroup
                        label="Card Background Colour"
                        type="color"
                        value={config.cardBackgroundColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "cardBackgroundColour", value: v })}
                    />
                    <FieldGroup
                        label="Card Border Colour"
                        type="color"
                        value={config.cardBorderColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "cardBorderColour", value: v })}
                    />
                    <FieldGroup
                        label="Tag Background Colour"
                        type="color"
                        value={config.tagBackgroundColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "tagBackgroundColour", value: v })}
                    />
                    <FieldGroup
                        label="Tag Text Colour"
                        type="color"
                        value={config.tagTextColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "tagTextColour", value: v })}
                    />
                    <FieldGroup
                        label="Panel Background Colour"
                        type="color"
                        value={config.panelBackgroundColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "panelBackgroundColour", value: v })}
                    />
                    <FieldGroup
                        label="Panel Accent Colour"
                        type="color"
                        value={config.panelAccentColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "panelAccentColour", value: v })}
                    />
                    <FieldGroup
                        label="Panel Text Colour"
                        type="color"
                        value={config.panelTextColour}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "panelTextColour", value: v })}
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
