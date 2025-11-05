export type Cultural =
    | "mesopotamian"
    | "creation_myths"
    | "christian"
    | "puritan"
    | "greco_roman"
    | "pre_christian"
    | "hinduism"
    | "buddhist"
    | "ancient"
    | "roman"
    | "caribbean"
    | "norse"
    | "celtic"
    | "medieval"
    | "native_american"
    | "platonic"
    | "zoroastrian"
    | "enlightenment"
    | "romanticism"
    | "renaissance"
    | "modern"
    | "postmodern"
    | "norse"
    | "celtic"
    | "medieval"
    | "native_american"
    | "platonic"
    | "feminism"
    | "cold_war"
    | "victorian"
    | "sailing_superstition"
    | "classical"
    | "psychological"
    | "field"
    | "mesoamerican"
    | "imperial"
    | "political"
    | "revolutionary";

export interface symbolPage {
    title: string;
    description: string;
}

export interface Symbol {
    name: string;
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
