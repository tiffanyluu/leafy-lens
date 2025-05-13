import Scan from "../models/Scan";
import { ApiResponse } from "../types/ApiResponse";
import axios from "axios";

const PLANT_API_URL = "https://my-api.plantnet.org/v2/identify/";

const identifyPlantLogic = async (
  imageBase64: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(PLANT_API_URL, {
      api_key: process.env.PLANT_API_KEY,
      images: [imageBase64],
    });

    const plantData: ApiResponse = {
      plantName: response.data.suggestions[0].plant_name,
      scientificName: response.data.suggestions[0].scientific_name,
      description: response.data.suggestions[0].plant_description,
      confidence: response.data.suggestions[0].confidence,
      careTips: {
        watering: response.data.suggestions[0].watering || "Not available",
        sunlight: response.data.suggestions[0].sunlight || "Not available",
        soil: response.data.suggestions[0].soil || "Not available",
        temperature:
          response.data.suggestions[0].temperature || "Not available",
      },
      sourceUrl: response.data.suggestions[0].source_url || "",
    };

    return plantData;
  } catch (error) {
    console.error("Error identifying plant:", error);
    throw new Error("Failed to identify plant.");
  }
};

const submitScanLogic = async (
  userId: string,
  imageBase64: string,
  plantData: ApiResponse
) => {
  const newScan = await Scan.create({
    user: userId,
    imageUrl: imageBase64,
    plantName: plantData.plantName,
    scientificName: plantData.scientificName,
    description: plantData.description,
    confidence: plantData.confidence,
    careTips: {
      watering: plantData.careTips.watering,
      sunlight: plantData.careTips.sunlight,
      soil: plantData.careTips.soil,
      temperature: plantData.careTips.temperature,
    },
    sourceUrl: plantData.sourceUrl || "",
  });

  return newScan;
};

const getAllScansLogic = async (userId: string) => {
  return await Scan.find({ user: userId });
};

const deleteScanLogic = async (scanId: string) => {
  await Scan.findByIdAndDelete(scanId);
};

export {
  identifyPlantLogic,
  submitScanLogic,
  getAllScansLogic,
  deleteScanLogic,
};
