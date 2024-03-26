import { Router } from "express";
import { commandGenerate, listCommand } from "../controller/commandControllers";

const commandRoutes = Router();

commandRoutes.get('/command/inicilize', commandGenerate);
commandRoutes.get('/command/list', listCommand);

export { commandRoutes };