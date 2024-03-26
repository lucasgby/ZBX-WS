import { Router } from "express";
import { getAllChat, addChat, updateChat, deleteChat } from "../controller/chatController";

const chatRoutes = Router();

chatRoutes.post('/chat/list', getAllChat);
chatRoutes.post('/chat/add', addChat);

chatRoutes.put('/chat/update', updateChat);

chatRoutes.delete('chat/delete/:id', deleteChat);

export { chatRoutes };
