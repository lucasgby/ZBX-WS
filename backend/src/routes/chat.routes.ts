import { Router } from "express";
//import { getAllChat, addChat, updateChat, deleteChat } from "../controller/chat/chatController";
import { chatController } from "../controller/chat";
import { can } from "../middlewares/permission";
import { RolesType } from "../model/roles";


const chatRoutes = Router();

/* Function Create */
chatRoutes.post('/chat/add', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), chatController.CREATE.create_chat);

/* Function GET */
chatRoutes.post('/chat/list-all', can([RolesType.SUPER_ADMIN, RolesType.ADMIN, RolesType.USER_READ]), chatController.GET.get_all_chats);
chatRoutes.get('/chat/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN, RolesType.USER_READ]), chatController.GET.get_chat);
chatRoutes.post('/chat/search', can([RolesType.SUPER_ADMIN, RolesType.ADMIN, RolesType.USER_READ]), chatController.GET.search_chats);

/* Function Update */
chatRoutes.put('/chat/update/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), chatController.UPDATE.update_chat);

/* Function Delete */
chatRoutes.delete('/chat/delete/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), chatController.DELETE.delete_chat);

export { chatRoutes };
