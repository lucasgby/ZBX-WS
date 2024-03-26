import { Router } from "express";

import { getAllGroups } from "../controller/groupsController";

const groupsRoutes = Router();

groupsRoutes.post('/groups', getAllGroups);

export {
  groupsRoutes
}