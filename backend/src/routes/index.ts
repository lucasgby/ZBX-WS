import { Router, Request, Response } from "express";

import { groupsRoutes } from "./groups.routes";
import { staticImagesRoutes } from "./images.routes";
import { messageRoutes } from "./message.routes";
import { graphRoutes } from "./graph.routes";
import { chatRoutes } from "./chat.routes";
import { commandRoutes } from "./command.routes";
import { statusRoutes } from "./status.routes";
import { reportRoutes } from "./report.routes";
import { authMiddleware } from "../middlewares/auth";
import { loginRouter } from "./login.routes";
import { userRoutes } from "./user.routes";
import { scheduleRoutes } from "./schedule.routes";
import { scheduleIncidentZBXRoutes } from "./scheduleIncidents.routes";
import { organizationRoutes } from "./organization.routes";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    active: true,
    message: "Server is Running",
    version: "1.0.0"
  });
});

routes.use(loginRouter);
routes.use(staticImagesRoutes);

routes.use(authMiddleware);

routes.use(groupsRoutes);
routes.use(messageRoutes);
routes.use(graphRoutes);
routes.use(chatRoutes);
routes.use(commandRoutes);
routes.use(statusRoutes);
routes.use(reportRoutes);
routes.use(userRoutes);
routes.use(scheduleRoutes);
routes.use(scheduleIncidentZBXRoutes);
routes.use(organizationRoutes);

export { routes };