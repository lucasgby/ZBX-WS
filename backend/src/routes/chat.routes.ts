import { Router } from "express";
import { getAllChat, addChat, updateChat, deleteChat } from "../controller/chat/chatController";

const chatRoutes = Router();

chatRoutes.post('/chat/list', getAllChat);
chatRoutes.post('/chat/add', addChat);

chatRoutes.put('/chat/update/:id', updateChat);

chatRoutes.delete('/chat/delete/:id', deleteChat);

export { chatRoutes };
