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
                    label="Heading"
                    value={config.heading}
                    onChange={(v) => dispatch({ type: "UPDATE_ART", field: "heading", value: v })}
                />
            </section>
        </div>
    );
}
