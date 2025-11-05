// src/types.ts

export interface AnalysisPoint {
  x: string; // Postotak za Tailwind (npr. 'left-[30%]')
  y: string; // Postotak za Tailwind (npr. 'top-[50%]')
  description: string;
}

export interface PerceptionData {
  themeName: string;
  themeColor: string; // Tailwind klasa (npr. 'bg-blue-100')
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