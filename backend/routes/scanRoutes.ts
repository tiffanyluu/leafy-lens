import { Router } from "express";
import {
  submitScan,
  getScanHistory,
  deleteScan,
  validateUser,
  validatePlantDataSchema,
  validateScanId,
} from "../controllers/scanController";
import validateRequest from "../middleware/validateRequest";

const scanRouter = Router();

scanRouter.post(
  "/scan",
  validateUser,
  validatePlantDataSchema,
  validateRequest,
  submitScan
);
scanRouter.get("/scans", validateUser, validateRequest, getScanHistory);
scanRouter.delete("/scan/:scanId", validateScanId, validateRequest, deleteScan);

export default scanRouter;
