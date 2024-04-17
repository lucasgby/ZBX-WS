import { Router } from "express";
import { list_command } from "../controller/command/commandControllers";

const commandRoutes = Router();

commandRoutes.get('/command/list', list_command);

export { commandRoutes };