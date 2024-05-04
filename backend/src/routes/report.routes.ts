import { Router } from "express";
import { reportController } from "../controller/report";
import { can } from "../middlewares/permission";
import { RolesType } from "../model/roles";

const reportRoutes = Router();

/* Function Create */
reportRoutes.post('/report', can([RolesType.ADMIN, RolesType.SUPER_ADMIN, RolesType.USER_READ]), reportController.CREATE.loadReport);

/* Function Get */
reportRoutes.post('/reports', can([RolesType.ADMIN, RolesType.SUPER_ADMIN, RolesType.USER_READ]), reportController.GET.get_all_reports);

/* Function Delete */
reportRoutes.post('/report/delete/:id', can([RolesType.ADMIN, RolesType.SUPER_ADMIN]), reportController.DELETE.delete_report);

export { reportRoutes };