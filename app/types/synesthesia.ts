export interface KandinskyTheory {
    meaning: string;
    sound: string;
    shape: "trokut" | "kvadrat" | "krug"; // Kandinskovo "sveto trojstvo" oblika
    movement: string;
}

export interface MarketingPsychology {
    marketing: string;
    effect: string;
}

export interface ColorData {
    id: string;
    name: string;
    hex: string;
    tailwindClass: string;
    kandinsky: KandinskyTheory;
    psychology: MarketingPsychology;
    poetryContext: string;
}

export interface VisualElement {
    id: number;
    colorId: string;
    shape: "trokut" | "kvadrat" | "krug";
    size: number;
    x: number;
    y: number;
    word: string;
}
