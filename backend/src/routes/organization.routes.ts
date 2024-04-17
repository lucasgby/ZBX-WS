import { Router } from "express";

import { organizationController } from "../controller/organization/";

const organizationRoutes = Router();

/* Functions to Create */
organizationRoutes.post('/organization/create', organizationController.CREATE.create_organization);

/* Functions to Get */
organizationRoutes.post('/organizations', organizationController.GET.get_all_organization);
organizationRoutes.post('/organization/search', organizationController.GET.search_organization);
organizationRoutes.get('/organization/:id', organizationController.GET.get_organization);

/* Functions to Update */
organizationRoutes.put('/organization/update/:id', organizationController.UPDATE.update_organization);
organizationRoutes.put('/organization/active', organizationController.UPDATE.active_organizations);
organizationRoutes.put('/organization/desable', organizationController.UPDATE.desable_organizations);

/* Functions to Delete */
organizationRoutes.delete('/organization/delete/:id', organizationController.DELETE.delete_organization);
organizationRoutes.delete('/organization/delete-more-than', organizationController.DELETE.delete_more_than_organization);

export { organizationRoutes };