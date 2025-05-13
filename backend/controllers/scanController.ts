import { Request, Response } from "express";
import {
  identifyPlantLogic,
  submitScanLogic,
  getAllScansLogic,
  deleteScanLogic,
} from "../services/scanService";
import { param } from "express-validator";
import mongoose from "mongoose";

const validateScanId = [
  param("scanId")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid scanId format.");
      }
      return true;
    })
    .withMessage("scanId must be a valid MongoDB ID."),
];

const submitScan = async (req: Request, res: Response) => {
  const { imageBase64 } = req.body;
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const plantData = await identifyPlantLogic(imageBase64);
      const newScan = await submitScanLogic(userId, imageBase64, plantData);
      res.status(201).json({ newScan });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred." });
      }
    }
  }
};

const getScanHistory = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    try {
      const allScans = await getAllScansLogic(userId);
      res.status(200).json({ allScans });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred." });
      }
    }
  }
};

const deleteScan = async (req: Request, res: Response) => {
  const { scanId } = req.params;
  try {
    await deleteScanLogic(scanId);
    res.status(200).json({ message: "Scan deleted successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
};

export { submitScan, getScanHistory, deleteScan, validateScanId };
