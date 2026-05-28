export type HomeConfig = {
    aboutHeading: string;
    aboutBody: string;
    cards: { title: string; description: string; imageUrl: string }[];
    newsHeading: string;
    newsBody: string;
    socialsHeading: string;
    socialsBody: string;
};

export type ArtConfig = {
    heading: string;
};

export type ComicsConfig = {
    heading: string;
};

export type WritingConfig = {
    heading: string;
    subheading: string;
};

export type CommissionsConfig = {
    formHeading: string;
    buttonColor: string;
    socials: { label: string; url: string; color: string }[];
};

export type Config = {
    home: HomeConfig;
    art: ArtConfig;
    comics: ComicsConfig;
    writing: WritingConfig;
    commissions: CommissionsConfig;
};

export type Action =
    | { type: "LOAD_CONFIG"; payload: Config }
    | { type: "UPDATE_HOME"; field: keyof Omit<HomeConfig, "cards">; value: string }
    | { type: "UPDATE_HOME_CARD"; index: number; field: keyof HomeConfig["cards"][0]; value: string }
    | { type: "UPDATE_ART"; field: keyof ArtConfig; value: string }
    | { type: "UPDATE_COMICS"; field: keyof ComicsConfig; value: string }
    | { type: "UPDATE_WRITING"; field: keyof WritingConfig; value: string }
    | { type: "UPDATE_COMMISSIONS"; field: keyof Omit<CommissionsConfig, "socials">; value: string }
    | { type: "UPDATE_COMMISSIONS_SOCIAL"; index: number; field: keyof CommissionsConfig["socials"][0]; value: string };
