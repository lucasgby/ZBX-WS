import { Router, Request, Response } from "express";

import { groupsRoutes } from "./groups.routes";
import { staticImagesRoutes } from "./images.routes";
import { messageRoutes } from "./message.routes";
import { graphRoutes } from "./graph.routes";
import { chatRoutes } from "./chat.routes";
import { commandRoutes } from "./command.routes";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    active: true,
    message: "Server is Running",
    version: "1.0.0"
  });
});

routes.use(staticImagesRoutes);
routes.use(groupsRoutes);
routes.use(messageRoutes);
routes.use(graphRoutes);
routes.use(chatRoutes);
routes.use(commandRoutes);

export { routes };