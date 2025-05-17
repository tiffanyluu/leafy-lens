import { Request, Response } from "express";
import {
  identifyPlantLogic,
  submitScanLogic,
  getAllScansLogic,
  deleteScanLogic,
} from "../services/scanService";
import { param } from "express-validator";
import mongoose from "mongoose";
import fs from "fs/promises";

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

const submitScan = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  const file = req.file;

  if (!userId || !file) {
    res.status(400).json({ message: "Missing user or image file" });
    return;
  }

  try {
    const plantData = await identifyPlantLogic(file.path);
    const newScan = await submitScanLogic(userId, file.path, plantData);

    res.status(201).json({ newScan });

    try {
      await fs.unlink(file.path);
    } catch (unlinkError) {
      console.error("Error deleting temporary file:", unlinkError);
    }
  } catch (error: unknown) {
    console.error("Error in submitScan:", error);

    if (file && file.path) {
      try {
        await fs.unlink(file.path);
      } catch (unlinkError) {
        console.error(
          "Error deleting temporary file after processing error:",
          unlinkError
        );
      }
    }

    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Plant identification failed." });
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
      console.error("Error in getScanHistory:", error);
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
    const deletedScan = await deleteScanLogic(scanId);
    res
      .status(200)
      .json({ message: "Scan deleted successfully", scan: deletedScan });
  } catch (error: unknown) {
    console.error("Error in deleteScan:", error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
};

export { submitScan, getScanHistory, deleteScan, validateScanId };
