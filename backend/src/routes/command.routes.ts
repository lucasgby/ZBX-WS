import { Router } from "express";
import { listCommand } from "../controller/commandControllers";

const commandRoutes = Router();

commandRoutes.get('/command/list', listCommand);

export { commandRoutes };