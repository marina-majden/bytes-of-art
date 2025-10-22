export interface TimelineItem {
    id: string;
    year: string;
    title: string;
    description: string;
    imageUrl: string;
    period: string;
    medium: string;
    location: string;
}

export interface TimelineData {
    title: string;
    description: string;
    items: TimelineItem[];
}
