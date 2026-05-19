"use client";
import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

export interface FilterState {
    search: string;
    artCategory: string;
    writingCategory: string;
    comicCategory: string;
    tags: string;
}

export type FilterAction =
    | { type: "SET_SEARCH"; payload: string }
    | { type: "SET_TAGS"; payload: string }
    | { type: "SET_WRITING_CATEGORY"; payload: string }
    | { type: "SET_COMIC_CATEGORY"; payload: string }
    | { type: "SET_ART_CATEGORY"; payload: string }
    | { type: "RESET" };

const initialState: FilterState = {
    artCategory: "",
    tags: "",
    writingCategory: "",
    comicCategory: "",
    search: "",
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
        case "SET_SEARCH":
            return { ...state, search: action.payload };
        case "SET_ART_CATEGORY":
            return { ...state, artCategory: action.payload };
        case "SET_WRITING_CATEGORY":
            return { ...state, writingCategory: action.payload };
        case "SET_COMIC_CATEGORY":
            return { ...state, comicCategory: action.payload };
        case "SET_TAGS":
            return { ...state, tags: action.payload };
        case "RESET":
            return initialState;
        default:
            return state;
    }
}

const FilterContext = createContext<{
    state: FilterState;
    dispatch: React.Dispatch<FilterAction>;
} | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(filterReducer, initialState);
    const pathname = usePathname();

    useEffect(() => {
        dispatch({ type: "RESET" });
    }, [pathname]);

    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const ctx = useContext(FilterContext);
    if (!ctx) throw new Error("useFilter must be used inside a FilterProvider");
    return ctx;
}
