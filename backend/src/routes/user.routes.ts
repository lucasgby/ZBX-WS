import { Router } from "express";
import { userController } from "../controller/user";
import { can } from "../middlewares/permission";
import { RolesType } from "../model/roles";

const userRoutes = Router();

/* Functions CREATE */
userRoutes.post('/user/create', can([RolesType.ADMIN, RolesType.SUPER_ADMIN]), userController.CREATE.create_user);

/* Functions GET */
userRoutes.get('/user/:id', can([RolesType.ADMIN, RolesType.SUPER_ADMIN, RolesType.USER_READ]), userController.GET.get_user);
userRoutes.post('/users/:id', can([RolesType.ADMIN, RolesType.SUPER_ADMIN]), userController.GET.get_all_users);

/* Functions UPDATE */
userRoutes.put('/user/update/:id', can([RolesType.ADMIN, RolesType.SUPER_ADMIN, RolesType.USER_READ]), userController.UPDATE.update_data_user);
userRoutes.put('/users/update/status', can([RolesType.ADMIN, RolesType.SUPER_ADMIN]), userController.UPDATE.alter_status_many_users);

/* Functions DELETE */
userRoutes.delete('/user/delete/:id', can([RolesType.ADMIN, RolesType.SUPER_ADMIN]), userController.DELETE.delete_user);
userRoutes.delete('/user/delete-users', can([RolesType.ADMIN, RolesType.SUPER_ADMIN]), userController.DELETE.delete_more_than_users);

export { userRoutes };