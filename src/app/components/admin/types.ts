export type HomeConfig = {
    aboutHeadingTextColour: string;
    aboutParagraphTextColour: string;
    aboutBackgroundColour: string;
    aboutCardsBackgroundColour: string;
    latestNewsCardsBackgroundColour: string;
    latestNewsBackgroundColour: string;
    latestNewsParagraphTextColour: string;
    latestNewsHeadingTextColour: string;
    connectWithUsTextColour: string;
    connectWithUsParagraphTextColour: string;
    connectWithUsBackgroundColour: string;
    aboutCards: { title: string; description: string; imageUrl: string }[];
    latestNewsCards: { title: string; description: string; imageUrl: string }[];
};

export type ArtConfig = {
    headingTextColour: string;
    headingBackgroundColour: string;
    paragraphTextColour: string;
};

export type ArtUploadConfig  = {
    artTitle: string;
    artDescription: string;
    artTags:string[];
    artFiles: File[] | null;
};

export type ComicsConfig = {
    headingTextColour: string;
    headingBackgroundColour: string;
    paragraphTextColour: string;
};

export type WritingConfig = {
    headingTextColour: string;
    headingBackgroundColour: string;
    paragraphTextColour: string;
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
    | { type: "UPDATE_HOME"; field: keyof Omit<HomeConfig, "aboutCards" | "latestNewsCards">; value: string }
    | { type: "UPDATE_HOME_ABOUT_CARD"; index: number; field: keyof HomeConfig["aboutCards"][0]; value: string }
    | { type: "UPDATE_HOME_LATEST_NEWS_CARD"; index: number; field: keyof HomeConfig["latestNewsCards"][0]; value: string }
    | { type: "UPDATE_ART"; field: keyof ArtConfig; value: string }
    | { type: "UPDATE_ART_UPLOAD"; field: keyof ArtUploadConfig; value: string | File[] | null }
    | { type: "UPDATE_COMICS"; field: keyof ComicsConfig; value: string }
    | { type: "UPDATE_WRITING"; field: keyof WritingConfig; value: string }
    | { type: "UPDATE_COMMISSIONS"; field: keyof Omit<CommissionsConfig, "socials">; value: string }
    | { type: "UPDATE_COMMISSIONS_SOCIAL"; index: number; field: keyof CommissionsConfig["socials"][0]; value: string };
