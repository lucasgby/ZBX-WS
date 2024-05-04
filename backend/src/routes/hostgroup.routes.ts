import { Router } from "express";

import { groupsZbxController } from "../controller/groupsZbx";
import { can } from "../middlewares/permission";
import { RolesType } from "../model/roles";

const hostgroupRoutes = Router();

/* Functions Create */
hostgroupRoutes.post('/hostgroup/create-new', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), groupsZbxController.CREATE.create_hostgroup);

/* Functions Update */
hostgroupRoutes.put('/hostgroup/update/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), groupsZbxController.UPDATE.update_group);
hostgroupRoutes.put('/hostgroup/update-many', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), groupsZbxController.UPDATE.alter_status_groups);

/* Functions Get */
hostgroupRoutes.get('/hostgroup/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN, RolesType.USER_READ]), groupsZbxController.GET.get_group);

/* Functions Delete */
hostgroupRoutes.delete('/hostgroup/delete/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), groupsZbxController.DELETE.delete_group);
hostgroupRoutes.delete('/hostgroup/delete-many', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), groupsZbxController.DELETE.delete_more_than_groups);

export { hostgroupRoutes };