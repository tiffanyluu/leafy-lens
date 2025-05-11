import { Request, Response } from "express";
import {
  submitScanLogic,
  getAllScansLogic,
  deleteScanLogic,
} from "../services/scanService";

const submitScan = async (req: Request, res: Response) => {
  try {
    const { userId, plantData } = req.body;
    const scan = await submitScanLogic(userId, plantData);
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
    const { userId } = req.body;
    const allScans = await getAllScansLogic(userId);
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
    const { scanId } = req.body;
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

export { submitScan, getScanHistory, deleteScan };
