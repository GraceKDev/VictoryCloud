import { Action, ArtConfig } from "../types";
import FieldGroup from "../FieldGroup";

type Props = {
    config: ArtConfig;
    dispatch: (action: Action) => void;
};

export default function ArtEditor({ config, dispatch }: Props) {
    return (
        <div className="flex flex-col gap-6">
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Page</h3>
                <FieldGroup
                    label="Section Background Colour"
                    type="color"
                    value={config.headingBackgroundColour}
                    onChange={(v) => dispatch({ type: "UPDATE_ART", field: "headingBackgroundColour", value: v })}
                />
                <FieldGroup
                    label="Heading Text Colour"
                    type="color"
                    value={config.headingTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_ART", field: "headingTextColour", value: v })}
                />
                <FieldGroup
                    label="Paragraph Text Colour"
                    type="color"
                    value={config.paragraphTextColour}
                    onChange={(v) => dispatch({ type: "UPDATE_ART", field: "paragraphTextColour", value: v })}
                />
            </section>
        </div>
    );
}
