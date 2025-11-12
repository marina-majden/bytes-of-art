export interface AnalysisPoint {
    x: string;
    y: string;
    description: string;
}

export interface PerceptionData {
    themeName: string;
    themeColor: string;
    text: string;
    textAuthor: string;
    imageSrc: string;
    imageArtist: string;
    analysisPoints: AnalysisPoint[];
}

export interface LocationData {
    id: string;
    name: string;
    impressionism: PerceptionData;
    expressionism: PerceptionData;
}
