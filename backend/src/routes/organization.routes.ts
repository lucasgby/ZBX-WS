import { Router } from "express";

import { organizationController } from "../controller/organization/";
import { can } from "../middlewares/permission";
import { RolesType } from "../model/roles";

const organizationRoutes = Router();

/* Functions to Create */
organizationRoutes.post('/organization/create', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), organizationController.CREATE.create_organization);

/* Functions to Get */
organizationRoutes.post('/organizations', can([RolesType.SUPER_ADMIN, RolesType.ADMIN, RolesType.USER_READ]), organizationController.GET.get_all_organization);
organizationRoutes.post('/organization/search', can([RolesType.SUPER_ADMIN, RolesType.ADMIN, RolesType.USER_READ]), organizationController.GET.search_organization);
organizationRoutes.get('/organization/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN, RolesType.USER_READ]), organizationController.GET.get_organization);

/* Functions to Update */
organizationRoutes.put('/organization/update/:id', can([RolesType.SUPER_ADMIN]), organizationController.UPDATE.update_organization);
organizationRoutes.put('/organizations/update-status', can([RolesType.SUPER_ADMIN]), organizationController.UPDATE.alter_status_organizations);

/* Functions to Delete */
organizationRoutes.delete('/organization/delete/:id',  can([RolesType.SUPER_ADMIN]), organizationController.DELETE.delete_organization);
organizationRoutes.delete('/organization/delete-more-than',  can([RolesType.SUPER_ADMIN]), organizationController.DELETE.delete_more_than_organization);

export { organizationRoutes };