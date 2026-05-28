import { Action, WritingConfig } from "../types";
import FieldGroup from "../FieldGroup";

type Props = {
    config: WritingConfig;
    dispatch: (action: Action) => void;
};

export default function WritingEditor({ config, dispatch }: Props) {
    return (
        <div className="flex flex-col gap-6">
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Page</h3>
                <div className="flex flex-col gap-4">
                    <FieldGroup
                        label="Heading"
                        value={config.heading}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "heading", value: v })}
                    />
                    <FieldGroup
                        label="Subheading"
                        type="textarea"
                        value={config.subheading}
                        onChange={(v) => dispatch({ type: "UPDATE_WRITING", field: "subheading", value: v })}
                    />
                </div>
            </section>
        </div>
    );
}
