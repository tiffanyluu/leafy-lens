export interface PlantGrowth {
  light: number; // Scale from 1–10
  soil_texture?: string;
  precipitation_minimum: number;
  precipitation_maximum: number;
  temperature_minimum?: {
    deg_c: number;
  };
}
