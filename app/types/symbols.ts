// Remove duplicates and organize
export type Cultural = 
    | "ancient" | "medieval" | "renaissance" | "modern" | "postmodern"
    | "classical" | "greco-roman" | "roman" | "mesopotamian"
    | "christian" | "puritan" | "prechristian" | "zoroastrian"
    | "hinduism" | "buddhist" | "mesoamerican"
    | "norse" | "celtic" | "native_american"
    | "enlightenment" | "romanticism" | "victorian"
    | "feminism" | "political" | "revolutionary" | "cold war"
    | "creation_myths" | "field" | "psychological"
    | "sailing_superstition" | "caribbean" | "imperial" | "platonic";

// Remove unused interfaces or export from separate file

export interface symbolPage {
    title: string;
    description: string;
}

export interface Symbol {
    name: string;
    icon: React.ElementType;
    description: string;
    artExamples: Array<{
        title: string;
        artist: string;
        period: string;
        image: string;
        analysis: string;
    }>;
    literatureExamples: Array<{
        text: string;
        author: string;
        work: string;
        analysis: string;
    }>;
    /**
     * Optional flexible map of known periods to descriptions.
     * Use Partial so each symbol can include only the periods that apply.
     */
    culturalContext?: Partial<Record<Cultural, string>>;
}

export interface SymbolsData {
    [key: string]: Symbol;
}
export interface SymbolsCollection {
    symbols: Symbol[];
}
