import { Router } from "express";
import { statusController } from "../controller/status/statusController";

const statusRoutes = Router();

statusRoutes.get('/check-status', statusController);

export { statusRoutes };