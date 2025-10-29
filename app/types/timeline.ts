export interface TimelineItem {
    id: string;
    year: string;
    title: string;
    artist: string;
    description: string;
    imageUrl: string;
    period: string;
    medium: string;
    location: string;
    analysis: string;
}

export interface TimelineData {
    title: string;
    description: string;
    items: TimelineItem[];
}
