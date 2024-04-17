import { Router } from "express";

import { get_chats_ws } from "../controller/chat_ws/groupsController";

const groupsRoutes = Router();

groupsRoutes.post('/groups', get_chats_ws);

export {
  groupsRoutes
}