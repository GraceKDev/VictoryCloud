import { createContext, useContext, useReducer, ReactNode, useState } from "react";

const NavigationContext = createContext({
    currentPage: "home",
    setCurrentPage: (page: string) => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [currentPage, setCurrentPage] = useState("home");
    return (
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const ctx = useContext(NavigationContext);
    if (!ctx) throw new Error("useNavigation must be used inside a NavigationProvider");
    return ctx;
}