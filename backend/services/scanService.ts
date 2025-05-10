import Scan from "../models/Scan";
import { PlantData } from "../types/PlantData";

const submitScan = async (userId: string, plantData: PlantData) => {
  const newScan = new Scan({
    user: userId,
    plantData: plantData,
  });

  await newScan.save();
  return newScan;
};

const getScanHistory = async (userId: string) => {
  return await Scan.find({ user: userId });
};

const deleteScan = async (scanId: string) => {
  await Scan.findByIdAndDelete(scanId);
};

export { submitScan, getScanHistory, deleteScan };
