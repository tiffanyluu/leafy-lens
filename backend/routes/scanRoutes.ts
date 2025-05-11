import { Router } from "express";
import {
  submitScan,
  getAllScans,
  deleteScan,
} from "../controllers/scanController";
const scanRouter = Router();

scanRouter.post("/scan", submitScan);
scanRouter.get("/scans", getAllScans);
scanRouter.delete("/scan/:id", deleteScan);

export default scanRouter;
