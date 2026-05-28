export type HomeConfig = {
    aboutHeadingTextColour: string;
    aboutBackgroundColour: string;
    latestNewsBackgroundColour: string;
    latestNewsHeadingTextColour: string;
    connectWithUsTextColour: string;
    connectWithUsBackgroundColour: string;
    aboutCards: { title: string; description: string; imageUrl: string }[];
    latestNewsCards: { title: string; description: string; imageUrl: string }[];
};

export type ArtConfig = {
    headingTextColour: string;
    headingBackgroundColour: string;
};

export type ArtUploadConfig  = {
    artTitle: string;
    artDescription: string;
    tags:string[];
    
};

export type ComicsConfig = {
    headingTextColour: string;
    headingBackgroundColour: string;
};

export type WritingConfig = {
    headingTextColour: string;
    headingBackgroundColour: string;
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
