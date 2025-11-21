export interface ArtPoint {
    id: number;
    x: number;
    y: number;
    title: string;
    desc: string;
}

export interface StreetArtPiece {
    id: number;
    artist: string;
    type: string;
    image: string;
    points: ArtPoint[];
}

export type ArtStyleType = "graffiti" | "insta";

export interface UserCreation {
    id: number;
    type: ArtStyleType;
    text: string;
    author: string;
    style: {
        font: string;
        color: string;
        align: "left" | "center" | "right";
    };
    timestamp: number;
}
