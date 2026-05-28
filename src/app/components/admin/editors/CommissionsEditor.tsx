import { Action, CommissionsConfig } from "../types";
import FieldGroup from "../FieldGroup";

type Props = {
    config: CommissionsConfig;
    dispatch: (action: Action) => void;
};

export default function CommissionsEditor({ config, dispatch }: Props) {
    return (
        <div className="flex flex-col gap-10">

            {/* Form */}
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Commission Form</h3>
                <div className="flex flex-col gap-4">
                    <FieldGroup
                        label="Form Heading"
                        value={config.formHeading}
                        onChange={(v) => dispatch({ type: "UPDATE_COMMISSIONS", field: "formHeading", value: v })}
                    />
                    <FieldGroup
                        label="Submit Button Color"
                        type="color"
                        value={config.buttonColor}
                        onChange={(v) => dispatch({ type: "UPDATE_COMMISSIONS", field: "buttonColor", value: v })}
                    />
                </div>
            </section>

            {/* Socials */}
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Social Links</h3>
                <div className="flex flex-col gap-6">
                    {config.socials.map((social, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 bg-gray-50">
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{social.label}</p>
                            <FieldGroup
                                label="Label"
                                value={social.label}
                                onChange={(v) => dispatch({ type: "UPDATE_COMMISSIONS_SOCIAL", index: i, field: "label", value: v })}
                            />
                            <FieldGroup
                                label="URL"
                                type="url"
                                value={social.url}
                                onChange={(v) => dispatch({ type: "UPDATE_COMMISSIONS_SOCIAL", index: i, field: "url", value: v })}
                            />
                            <FieldGroup
                                label="Bubble Color"
                                type="color"
                                value={social.color}
                                onChange={(v) => dispatch({ type: "UPDATE_COMMISSIONS_SOCIAL", index: i, field: "color", value: v })}
                            />
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
