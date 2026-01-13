import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";

export type ArtTheme = "impressionism" | "expressionism";

interface ArtThemeContextType {
    theme: ArtTheme;
    setTheme: (theme: ArtTheme) => void;
    toggleTheme: () => void;
}

const ArtThemeContext = createContext<ArtThemeContextType | undefined>(
    undefined
);

export function ArtThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ArtTheme>("impressionism");

    // Load saved theme from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("art-theme") as ArtTheme;
            if (
                savedTheme === "impressionism" ||
                savedTheme === "expressionism"
            ) {
                setThemeState(savedTheme);
                document.documentElement.setAttribute("data-theme", savedTheme);
            } else {
                document.documentElement.setAttribute(
                    "data-theme",
                    "impressionism"
                );
            }
        }
    }, []);

    const setTheme = (newTheme: ArtTheme) => {
        setThemeState(newTheme);
        localStorage.setItem("art-theme", newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    };

    const toggleTheme = () => {
        setTheme(theme === "impressionism" ? "expressionism" : "impressionism");
    };

    return (
        <ArtThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ArtThemeContext.Provider>
    );
}

export function useArtTheme() {
    const context = useContext(ArtThemeContext);
    if (context === undefined) {
        throw new Error("useArtTheme must be used within an ArtThemeProvider");
    }
    return context;
}
