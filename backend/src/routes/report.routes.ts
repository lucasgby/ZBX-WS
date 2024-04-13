import { Router } from "express";
import { loadReport } from "../controller/reportRouterController";

const reportRoutes = Router();

reportRoutes.post('/report', loadReport);

export { reportRoutes };