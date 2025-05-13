import { Router } from "express";
import {
  submitScan,
  getScanHistory,
  deleteScan,
  validateScanId,
} from "../controllers/scanController";
import validateRequest from "../middleware/validateRequest";
import verifyToken from "../middleware/verifyToken";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const scanRouter = Router();

scanRouter.post("/", verifyToken, upload.single("image"), submitScan);

scanRouter.get("/", verifyToken, validateRequest, getScanHistory);

scanRouter.delete(
  "/scan/:scanId",
  verifyToken,
  validateScanId,
  validateRequest,
  deleteScan
);

export default scanRouter;
