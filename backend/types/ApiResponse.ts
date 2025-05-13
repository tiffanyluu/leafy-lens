export interface ApiResponse {
  plantName: string;
  scientificName: string;
  description: string;
  confidence: number;
  careTips: {
    watering: string;
    sunlight: string;
    soil: string;
    temperature: string;
  };
  sourceUrl?: string;
}
