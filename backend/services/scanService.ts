import Scan from "../models/Scan";
import { ApiResponse } from "../types/ApiResponse";
import FormData from "form-data";
import axios from "axios";
import fs from "fs";
import path from "path";
import mime from "mime-types";

const PLANT_API_URL = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANT_API_KEY}`;

const identifyPlantLogic = async (imagePath: string) => {
  try {
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found at path: ${imagePath}`);
    }

    const form = new FormData();

    const imageBuffer = fs.readFileSync(imagePath);
    const filename = path.basename(imagePath);

    const contentType = mime.lookup(imagePath) || "application/octet-stream";

    form.append("images", imageBuffer, {
      filename: filename,
      contentType: contentType,
    });

    form.append("organs", "leaf");

    const response = await axios.post(PLANT_API_URL, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    console.log("Plant identification successful");

    const apiResult = response.data;

    const formattedResponse: ApiResponse = {
      plantName:
        apiResult.results[0]?.species?.commonNames?.[0] || "Unknown Plant",
      scientificName:
        apiResult.results[0]?.species?.scientificNameWithoutAuthor ||
        "Unknown Scientific Name",
      family:
        apiResult.results[0]?.species?.family?.scientificNameWithoutAuthor ||
        "No description available",
      confidence: apiResult.results[0]?.score || 0,
    };

    return formattedResponse;
  } catch (error) {
    console.error("Request to identify plant failed:", error);
    throw new Error("Request to identify plant failed.");
  }
};

const submitScanLogic = async (
  userId: string,
  imagePath: string,
  plantData: ApiResponse
) => {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const contentType = mime.lookup(imagePath) || "application/octet-stream";
    const imageBase64 = `data:${contentType};base64,${imageBuffer.toString(
      "base64"
    )}`;

    const newScan = await Scan.create({
      user: userId,
      plantName: plantData.plantName,
      scientificName: plantData.scientificName,
      family: plantData.family,
      confidence: plantData.confidence,
      imageUrl: imageBase64,
    });

    return newScan;
  } catch (error) {
    console.error("Failed to submit scan:", error);
    throw new Error("Failed to submit scan to database");
  }
};

const getAllScansLogic = async (userId: string) => {
  return await Scan.find({ user: userId }).sort({ createdAt: -1 });
};

const deleteScanLogic = async (scanId: string) => {
  const deletedScan = await Scan.findByIdAndDelete(scanId);
  if (!deletedScan) {
    throw new Error("Scan not found");
  }
  return deletedScan;
};

export {
  identifyPlantLogic,
  submitScanLogic,
  getAllScansLogic,
  deleteScanLogic,
};
