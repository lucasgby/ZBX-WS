import { Router } from "express";

import { graph } from "../controller/graphController";

const graphRoutes = Router();

graphRoutes.post('/graph', graph);

export {
  graphRoutes
}