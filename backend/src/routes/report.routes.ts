import { Router } from "express";
import { loadReport } from "../controller/report/reportRouterController";

const reportRoutes = Router();

reportRoutes.post('/report', loadReport);

export { reportRoutes };