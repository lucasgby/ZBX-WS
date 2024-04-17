import { Router } from "express";

import { graph } from "../controller/graph/graphController";

const graphRoutes = Router();

graphRoutes.post('/graph', graph);

export {
  graphRoutes
}