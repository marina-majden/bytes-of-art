export type ArchetypeId = "prodigal_son" | "naive_lover" | "arrogant_noble";
export type SetupId = "ambush" | "challenge" | "boredom";
export type BaitId = "wealth" | "love" | "flattery";

export interface NarrativeState {
    archetype: ArchetypeId | null;
    setup: SetupId | null;
    bait: BaitId | null;
    moralLesson: string;
}

export interface OptionItem<T> {
    id: T;
    label: string;
}

export interface StoryData {
    archetypes: OptionItem<ArchetypeId>[];
    setups: OptionItem<SetupId>[];
    baits: OptionItem<BaitId>[];
}
