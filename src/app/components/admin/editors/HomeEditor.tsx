import { Action, HomeConfig } from "../types";
import FieldGroup from "../FieldGroup";

type Props = {
    config: HomeConfig;
    dispatch: (action: Action) => void;
};

export default function HomeEditor({ config, dispatch }: Props) {
    return (
        <div className="flex flex-col gap-10">
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">About Section</h3>
                <div className="flex flex-col gap-4">
                    <FieldGroup
                        label="Background"
                        value={config.aboutHeading}
                        onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "aboutHeading", value: v })}
                    />
                    <FieldGroup
                        label="Body Text"
                        type="textarea"
                        value={config.aboutBody}
                        onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "aboutBody", value: v })}
                    />
                </div>
            </section>

            {/* About Cards */}
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">About Cards</h3>
                <div className="flex flex-col gap-6">
                    {config.cards.map((card, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 bg-gray-50">
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Card {i + 1}</p>
                            <FieldGroup
                                label="Title"
                                value={card.title}
                                onChange={(v) => dispatch({ type: "UPDATE_HOME_CARD", index: i, field: "title", value: v })}
                            />
                            <FieldGroup
                                label="Description"
                                type="textarea"
                                value={card.description}
                                onChange={(v) => dispatch({ type: "UPDATE_HOME_CARD", index: i, field: "description", value: v })}
                            />
                            <FieldGroup
                                label="Image URL"
                                type="url"
                                value={card.imageUrl}
                                onChange={(v) => dispatch({ type: "UPDATE_HOME_CARD", index: i, field: "imageUrl", value: v })}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* News */}
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">News Section</h3>
                <div className="flex flex-col gap-4">
                    <FieldGroup
                        label="Heading"
                        value={config.newsHeading}
                        onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "newsHeading", value: v })}
                    />
                    <FieldGroup
                        label="Body Text"
                        type="textarea"
                        value={config.newsBody}
                        onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "newsBody", value: v })}
                    />
                </div>
            </section>

            {/* Socials */}
            <section>
                <h3 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">Socials Section</h3>
                <div className="flex flex-col gap-4">
                    <FieldGroup
                        label="Heading"
                        value={config.socialsHeading}
                        onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "socialsHeading", value: v })}
                    />
                    <FieldGroup
                        label="Body Text"
                        type="textarea"
                        value={config.socialsBody}
                        onChange={(v) => dispatch({ type: "UPDATE_HOME", field: "socialsBody", value: v })}
                    />
                </div>
            </section>

        </div>
    );
}
