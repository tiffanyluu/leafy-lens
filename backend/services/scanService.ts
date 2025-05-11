import Scan from "../models/Scan";
import { PlantData } from "../types/PlantData";

const submitScanLogic = async (userId: string, plantData: PlantData) => {
  const newScan = await Scan.create({
    user: userId,
    plantData: plantData,
  });
  return newScan;
};

const getAllScansLogic = async (userId: string) => {
  return await Scan.find({ user: userId });
};

const deleteScanLogic = async (scanId: string) => {
  await Scan.findByIdAndDelete(scanId);
};

export { submitScanLogic, getAllScansLogic, deleteScanLogic };
