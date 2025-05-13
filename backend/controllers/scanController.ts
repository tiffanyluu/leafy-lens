import { Request, Response } from "express";
import {
  submitScanLogic,
  getAllScansLogic,
  deleteScanLogic,
} from "../services/scanService";
import { body, checkSchema, param } from "express-validator";
import mongoose from "mongoose";

const validateUser = [
  body("user")
    .trim()
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid userId format.");
      }
      return true;
    })
    .withMessage("User ID must be a valid MongoDB ID."),
];

const validatePlantDataSchema = checkSchema({
  commonName: {
    in: ["body"],
    isString: true,
    errorMessage: "Common Name must be a string",
  },
  scientificName: {
    in: ["body"],
    isString: true,
    errorMessage: "Scientific Name must be a string",
  },
  description: {
    in: ["body"],
    isString: true,
    errorMessage: "Description must be a string",
  },
  careTips: {
    in: ["body"],
    isString: true,
    errorMessage: "Care Tips must be a string",
  },
  imageUrl: {
    in: ["body"],
    isString: true,
    isURL: true,
    errorMessage: "Image URL must be a string",
  },
});

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
  try {
    const { user, plantData } = req.body;
    const scan = await submitScanLogic(user, plantData);
    res.status(200).json({ scan });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
};

const getScanHistory = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const allScans = await getAllScansLogic(user);
    res.status(200).json({ allScans });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
};

const deleteScan = async (req: Request, res: Response) => {
  try {
    const { scanId } = req.params;
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

export {
  submitScan,
  getScanHistory,
  deleteScan,
  validateUser,
  validatePlantDataSchema,
  validateScanId,
};
